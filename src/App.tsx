import { useState } from 'react'
import type { Habit } from './types'
import { useHabits } from './hooks/useHabits'
import Header from './components/Header'
import EmptyState from './components/EmptyState'
import ActiveHabitHero from './components/ActiveHabitHero'
import HabitForm from './components/HabitForm'
import CompletedPanel from './components/CompletedPanel'
import CompletedHabitDetail from './components/CompletedHabitDetail'
import SettingsPanel from './components/SettingsPanel'
import ConfirmDialog from './components/ConfirmDialog'
import InfoPanel from './components/InfoPanel'

type Overlay =
  | { kind: 'none' }
  | { kind: 'create' }
  | { kind: 'edit'; habit: Habit }
  | { kind: 'completed-list' }
  | { kind: 'completed-detail'; habit: Habit }
  | { kind: 'settings' }
  | { kind: 'info' }
  | { kind: 'confirm-delete'; habit: Habit }
  | { kind: 'reopen-blocked' }

export default function App() {
  const {
    activeHabit,
    completedHabits,
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    setCheckin,
    completeHabit,
    reopenHabit,
    importHabits,
  } = useHabits()

  const [overlay, setOverlay] = useState<Overlay>({ kind: 'none' })
  const close = () => setOverlay({ kind: 'none' })

  return (
    <div className="flex min-h-dvh flex-col">
      <Header
        completedCount={completedHabits.length}
        onOpenCompleted={() => setOverlay({ kind: 'completed-list' })}
        onOpenSettings={() => setOverlay({ kind: 'settings' })}
        onOpenInfo={() => setOverlay({ kind: 'info' })}
      />

      {activeHabit ? (
        <ActiveHabitHero
          habit={activeHabit}
          onEdit={() => setOverlay({ kind: 'edit', habit: activeHabit })}
          onDelete={() => setOverlay({ kind: 'confirm-delete', habit: activeHabit })}
          onSetCheckin={(date, status) => setCheckin(activeHabit.id, date, status)}
          onComplete={() => completeHabit(activeHabit.id)}
        />
      ) : (
        <EmptyState onCreate={() => setOverlay({ kind: 'create' })} hasCompleted={completedHabits.length > 0} />
      )}

      {overlay.kind === 'create' && (
        <HabitForm
          onClose={close}
          onSubmit={(input) => {
            addHabit(input)
            close()
          }}
        />
      )}

      {overlay.kind === 'edit' && (
        <HabitForm
          initial={overlay.habit}
          onClose={close}
          onSubmit={(input) => {
            updateHabit(overlay.habit.id, input)
            close()
          }}
        />
      )}

      {overlay.kind === 'completed-list' && (
        <CompletedPanel
          habits={completedHabits}
          onClose={close}
          onSelect={(habit) => setOverlay({ kind: 'completed-detail', habit })}
        />
      )}

      {overlay.kind === 'completed-detail' && (
        <CompletedHabitDetail
          habit={overlay.habit}
          onClose={close}
          onReopen={() => {
            if (activeHabit) {
              setOverlay({ kind: 'reopen-blocked' })
              return
            }
            reopenHabit(overlay.habit.id)
            close()
          }}
          onDelete={() => setOverlay({ kind: 'confirm-delete', habit: overlay.habit })}
        />
      )}

      {overlay.kind === 'settings' && (
        <SettingsPanel habits={habits} onClose={close} onImport={importHabits} />
      )}

      {overlay.kind === 'info' && <InfoPanel onClose={close} />}

      {overlay.kind === 'confirm-delete' && (
        <ConfirmDialog
          title="Eliminar hábito"
          description={`Se eliminará "${overlay.habit.name}" y todo su historial de forma permanente. Esta acción no se puede deshacer.`}
          confirmLabel="Eliminar"
          danger
          onCancel={close}
          onConfirm={() => {
            deleteHabit(overlay.habit.id)
            close()
          }}
        />
      )}

      {overlay.kind === 'reopen-blocked' && (
        <ConfirmDialog
          title="Ya tienes un hábito activo"
          description="Solo puedes trabajar un hábito a la vez. Completa o elimina el hábito activo antes de reabrir este."
          confirmLabel="Entendido"
          onCancel={close}
          onConfirm={close}
        />
      )}
    </div>
  )
}
