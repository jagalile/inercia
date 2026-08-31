import { useMemo } from 'react'
import { RotateCcw, Trash2 } from 'lucide-react'
import type { Habit } from '../types'
import { computeStats } from '../lib/habitLogic'
import { adherencePalette } from '../lib/color'
import { formatLongDate } from '../lib/dates'
import { useLanguage } from '../i18n/LanguageContext'
import Modal from './Modal'

interface CompletedHabitDetailProps {
  habit: Habit
  onClose: () => void
  onReopen: () => void
  onDelete: () => void
}

export default function CompletedHabitDetail({ habit, onClose, onReopen, onDelete }: CompletedHabitDetailProps) {
  const { t, lang } = useLanguage()
  const referenceDate = habit.completedAt?.slice(0, 10) ?? habit.startDate
  const stats = useMemo(() => computeStats(habit, referenceDate), [habit, referenceDate])
  const palette = useMemo(() => adherencePalette(stats.adherence), [stats.adherence])

  return (
    <Modal title={t.completedHabitDetail.title} onClose={onClose} maxWidth="max-w-sm">
      <div className="text-center">
        <h3 className="text-xl font-semibold tracking-tight text-stone-800 dark:text-stone-100">{habit.name}</h3>
        {habit.description && <p className="mt-1 text-sm text-stone-400">{habit.description}</p>}

        <div
          className="mx-auto mt-6 flex h-24 w-24 items-center justify-center rounded-full text-3xl font-extrabold tabular-nums text-white"
          style={{ backgroundColor: palette.accent }}
        >
          {stats.adherence}%
        </div>
        <p className="mt-2 text-xs uppercase tracking-wide text-stone-400">{t.completedHabitDetail.adherenceFinal}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 text-left">
          <div className="rounded-xl border border-stone-100 p-3 dark:border-neutral-800">
            <div className="text-lg font-bold tabular-nums text-stone-800 dark:text-stone-100">{stats.duration}</div>
            <div className="text-[11px] uppercase tracking-wide text-stone-400">
              {t.completedHabitDetail.daysCaption(t.difficulty[habit.difficulty])}
            </div>
          </div>
          <div className="rounded-xl border border-stone-100 p-3 dark:border-neutral-800">
            <div className="text-lg font-bold tabular-nums text-stone-800 dark:text-stone-100">{stats.doneCount}</div>
            <div className="text-[11px] uppercase tracking-wide text-stone-400">
              {t.completedHabitDetail.daysCompletedLabel}
            </div>
          </div>
          <div className="rounded-xl border border-stone-100 p-3 dark:border-neutral-800">
            <div className="text-lg font-bold tabular-nums text-stone-800 dark:text-stone-100">{stats.streak}</div>
            <div className="text-[11px] uppercase tracking-wide text-stone-400">
              {t.completedHabitDetail.finalStreakLabel}
            </div>
          </div>
          <div className="rounded-xl border border-stone-100 p-3 dark:border-neutral-800">
            <div className="text-lg font-bold text-stone-800 dark:text-stone-100">
              {t.permissiveness[habit.permissiveness]}
            </div>
            <div className="text-[11px] uppercase tracking-wide text-stone-400">
              {t.completedHabitDetail.permissivenessLabel}
            </div>
          </div>
        </div>

        <p className="mt-5 text-xs text-stone-400">
          {formatLongDate(habit.startDate, lang)}
          {habit.completedAt && <> → {formatLongDate(habit.completedAt.slice(0, 10), lang)}</>}
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={onReopen}
            className="flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-50 dark:border-neutral-700 dark:text-stone-300 dark:hover:bg-neutral-800"
          >
            <RotateCcw size={14} />
            {t.completedHabitDetail.reopen}
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-500 dark:border-neutral-700 dark:text-stone-400 dark:hover:border-red-900 dark:hover:bg-red-950/40"
          >
            <Trash2 size={14} />
            {t.completedHabitDetail.delete}
          </button>
        </div>
      </div>
    </Modal>
  )
}
