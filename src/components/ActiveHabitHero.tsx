import { useMemo, useState } from 'react'
import { Check, Pencil, Trash2, X as XIcon } from 'lucide-react'
import type { Habit } from '../types'
import { computeStats, getPhases } from '../lib/habitLogic'
import { adherencePalette } from '../lib/color'
import { formatLongDate, todayISO } from '../lib/dates'
import PhaseBar from './PhaseBar'

interface ActiveHabitHeroProps {
  habit: Habit
  onEdit: () => void
  onDelete: () => void
  onSetCheckin: (date: string, status: 'done' | 'missed' | null) => void
  onComplete: () => void
}

export default function ActiveHabitHero({
  habit,
  onEdit,
  onDelete,
  onSetCheckin,
  onComplete,
}: ActiveHabitHeroProps) {
  const [hoverDelete, setHoverDelete] = useState(false)
  const today = todayISO()
  const stats = useMemo(() => computeStats(habit, today), [habit, today])
  const palette = useMemo(() => adherencePalette(stats.adherence), [stats.adherence])
  const phases = useMemo(() => getPhases(habit.difficulty), [habit.difficulty])

  return (
    <div
      className="flex flex-1 flex-col items-center justify-center px-6 py-5 transition-colors duration-700 animate-fade-in sm:py-10"
      style={{
        background: `radial-gradient(circle at 50% 0%, ${palette.accentSoft}, transparent 60%)`,
      }}
    >
      <div className="w-full max-w-md">
        <div className="mb-4 flex items-start justify-between gap-3 sm:mb-8">
          <div className="min-w-0">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: palette.accent }}
            >
              {palette.mood} · {stats.currentPhase.label}
            </p>
            <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight text-stone-800 dark:text-stone-100">
              {habit.name}
            </h1>
            {habit.description && (
              <p className="mt-1 text-sm text-stone-400 dark:text-stone-500">{habit.description}</p>
            )}
          </div>
          <div className="flex shrink-0 gap-1 pt-1">
            <button
              onClick={onEdit}
              aria-label="Editar hábito"
              className="rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-neutral-800 dark:hover:text-stone-200"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={onDelete}
              onMouseEnter={() => setHoverDelete(true)}
              onMouseLeave={() => setHoverDelete(false)}
              aria-label="Eliminar hábito"
              className={`rounded-full p-2 transition hover:bg-stone-100 dark:hover:bg-neutral-800 ${
                hoverDelete ? 'text-red-500' : 'text-stone-400'
              }`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <div className="flex items-end justify-center gap-3">
          <span
            className="text-[5.5rem] font-extrabold leading-none tabular-nums transition-colors duration-700 sm:text-[7.5rem]"
            style={{ color: palette.accent }}
          >
            {stats.currentDay}
          </span>
          <span className="mb-2 text-xl font-medium text-stone-300 dark:text-neutral-700 sm:mb-4 sm:text-2xl">
            / {stats.duration}
          </span>
        </div>
        <p className="mt-1 text-center text-sm text-stone-400">día del hábito</p>

        <div className="mt-5 sm:mt-8">
          <PhaseBar phases={phases} currentDay={stats.currentDay} accent={palette.accent} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4">
          <div className="rounded-2xl border border-stone-100 bg-white/60 p-3 text-center dark:border-neutral-800 dark:bg-neutral-900/40 sm:p-4">
            <div className="text-3xl font-bold tabular-nums text-stone-800 dark:text-stone-100 sm:text-4xl">
              {stats.streak}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-400">
              Racha flexible
            </div>
          </div>
          <div className="rounded-2xl border border-stone-100 bg-white/60 p-3 text-center dark:border-neutral-800 dark:bg-neutral-900/40 sm:p-4">
            <div className="text-3xl font-bold tabular-nums text-stone-800 dark:text-stone-100 sm:text-4xl">
              {stats.doneCount + stats.missedCount === 0 ? '—' : `${stats.adherence}%`}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wide text-stone-400">
              Adherencia
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-[12px] leading-relaxed text-stone-400 sm:mt-4">
          {stats.failBudgetTotal === 0
            ? 'Nivel estricto: cada día cuenta, sin margen.'
            : `Margen usado: ${stats.failBudgetTotal - stats.failBudgetLeft} de ${stats.failBudgetTotal} días.`}{' '}
          Son datos informativos — no hay penalización.
        </p>

        <div className="mt-5 sm:mt-8">
          {stats.isFinished ? (
            <div className="rounded-2xl border border-stone-200 bg-white p-5 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-sm font-medium text-stone-700 dark:text-stone-200">
                Has llegado al final de los {stats.duration} días.
              </p>
              <p className="mt-1 text-xs text-stone-400">
                Iniciado el {formatLongDate(habit.startDate)} · adherencia final {stats.adherence}%
              </p>
              <button
                onClick={onComplete}
                className="mt-4 rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
              >
                Completar y empezar otro
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs font-medium uppercase tracking-wide text-stone-400">Hoy</p>
              {stats.todayStatus === 'pending' ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => onSetCheckin(today, 'done')}
                    className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
                    style={{ backgroundColor: palette.accent, boxShadow: `0 10px 24px -8px ${palette.accent}` }}
                  >
                    <Check size={17} />
                    Lo he cumplido
                  </button>
                  <button
                    onClick={() => onSetCheckin(today, 'missed')}
                    className="flex items-center gap-2 rounded-full border border-stone-200 px-5 py-3 text-sm font-medium text-stone-500 transition hover:bg-stone-50 dark:border-neutral-700 dark:text-stone-400 dark:hover:bg-neutral-800"
                  >
                    <XIcon size={16} />
                    Hoy no
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 rounded-full border border-stone-200 py-2 pl-4 pr-2 dark:border-neutral-700">
                  <span className="text-sm text-stone-500 dark:text-stone-400">
                    {stats.todayStatus === 'done' ? 'Hoy: cumplido ✓' : 'Hoy: sin cumplir'}
                  </span>
                  <button
                    onClick={() => onSetCheckin(today, null)}
                    className="rounded-full px-3 py-1 text-xs font-medium text-stone-400 transition hover:bg-stone-100 dark:hover:bg-neutral-800"
                  >
                    Deshacer
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
