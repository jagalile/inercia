import { useMemo } from 'react'
import type { Habit } from '../types'
import { computeStats } from '../lib/habitLogic'
import { adherencePalette } from '../lib/color'
import { formatShortDate } from '../lib/dates'
import { useLanguage } from '../i18n/LanguageContext'
import Modal from './Modal'

interface CompletedPanelProps {
  habits: Habit[]
  onClose: () => void
  onSelect: (habit: Habit) => void
}

function CompletedRow({ habit, onSelect }: { habit: Habit; onSelect: () => void }) {
  const { t, lang } = useLanguage()
  const stats = useMemo(() => computeStats(habit, habit.completedAt?.slice(0, 10) ?? habit.startDate), [habit])
  const palette = useMemo(() => adherencePalette(stats.adherence), [stats.adherence])

  return (
    <button
      onClick={onSelect}
      className="flex w-full items-center gap-3 rounded-2xl border border-stone-100 p-3.5 text-left transition hover:border-stone-200 hover:bg-stone-50 dark:border-neutral-800 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/60"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums text-white"
        style={{ backgroundColor: palette.accent }}
      >
        {stats.adherence}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-stone-800 dark:text-stone-100">{habit.name}</div>
        <div className="text-xs text-stone-400">
          {t.difficulty[habit.difficulty]} · {stats.duration} {t.completedPanel.days(stats.duration)}
          {habit.completedAt && <> · {formatShortDate(habit.completedAt.slice(0, 10), lang)}</>}
        </div>
      </div>
    </button>
  )
}

export default function CompletedPanel({ habits, onClose, onSelect }: CompletedPanelProps) {
  const { t } = useLanguage()
  return (
    <Modal title={t.completedPanel.title(habits.length)} onClose={onClose} maxWidth="max-w-lg">
      {habits.length === 0 ? (
        <p className="py-8 text-center text-sm text-stone-400">{t.completedPanel.empty}</p>
      ) : (
        <div className="space-y-2">
          {habits.map((h) => (
            <CompletedRow key={h.id} habit={h} onSelect={() => onSelect(h)} />
          ))}
        </div>
      )}
    </Modal>
  )
}
