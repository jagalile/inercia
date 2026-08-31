import { useState } from 'react'
import type { Difficulty, Habit, Permissiveness } from '../types'
import { DURATIONS, permissivenessFailDays } from '../lib/habitLogic'
import Modal from './Modal'
import { useLanguage } from '../i18n/LanguageContext'
import type { NewHabitInput } from '../hooks/useHabits'

interface HabitFormProps {
  initial?: Habit
  onSubmit: (input: NewHabitInput) => void
  onClose: () => void
}

const DIFFICULTIES: Difficulty[] = ['simple', 'moderado', 'complejo']
const PERMISSIVENESS: Permissiveness[] = ['estricto', 'moderado', 'laxo']

export default function HabitForm({ initial, onSubmit, onClose }: HabitFormProps) {
  const { t } = useLanguage()
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [difficulty, setDifficulty] = useState<Difficulty>(initial?.difficulty ?? 'simple')
  const [permissiveness, setPermissiveness] = useState<Permissiveness>(initial?.permissiveness ?? 'moderado')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(t.habitForm.nameRequired)
      return
    }
    onSubmit({ name, description, difficulty, permissiveness })
  }

  return (
    <Modal title={initial ? t.habitForm.titleEdit : t.habitForm.titleNew} onClose={onClose} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
            {t.habitForm.nameLabel}
          </label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.habitForm.namePlaceholder}
            maxLength={80}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-[15px] text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-100 dark:focus:border-neutral-500 dark:focus:bg-neutral-800"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
            {t.habitForm.descLabel} <span className="font-normal text-stone-400">{t.habitForm.descOptional}</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.habitForm.descPlaceholder}
            rows={2}
            maxLength={240}
            className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-[15px] text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-stone-100 dark:focus:border-neutral-500 dark:focus:bg-neutral-800"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
            {t.habitForm.difficultyLabel}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                type="button"
                key={d}
                onClick={() => setDifficulty(d)}
                className={`rounded-xl border px-3 py-3 text-left transition ${
                  difficulty === d
                    ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                    : 'border-stone-200 hover:border-stone-300 dark:border-neutral-700 dark:hover:border-neutral-600'
                }`}
              >
                <div className="text-sm font-semibold">{t.difficulty[d]}</div>
                <div
                  className={`mt-0.5 text-[11px] leading-tight ${
                    difficulty === d ? 'text-white/70 dark:text-stone-900/60' : 'text-stone-400'
                  }`}
                >
                  {t.habitForm.days(DURATIONS[d])}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
            {t.habitForm.permissivenessLabel}
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PERMISSIVENESS.map((p) => {
              const fails = permissivenessFailDays(difficulty, p)
              return (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPermissiveness(p)}
                  className={`rounded-xl border px-3 py-3 text-left transition ${
                    permissiveness === p
                      ? 'border-stone-900 bg-stone-900 text-white dark:border-stone-100 dark:bg-stone-100 dark:text-stone-900'
                      : 'border-stone-200 hover:border-stone-300 dark:border-neutral-700 dark:hover:border-neutral-600'
                  }`}
                >
                  <div className="text-sm font-semibold">{t.permissiveness[p]}</div>
                  <div
                    className={`mt-0.5 text-[11px] leading-tight ${
                      permissiveness === p ? 'text-white/70 dark:text-stone-900/60' : 'text-stone-400'
                    }`}
                  >
                    {fails === 0 ? t.habitForm.noMargin : t.habitForm.marginDays(fails)}
                  </div>
                </button>
              )
            })}
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-stone-400">{t.habitForm.marginNote}</p>
        </div>

        {!initial && <p className="text-[12px] leading-relaxed text-stone-400">{t.habitForm.startsToday}</p>}

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2.5 text-sm font-medium text-stone-500 transition hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-neutral-800"
          >
            {t.common.cancel}
          </button>
          <button
            type="submit"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            {initial ? t.habitForm.submitEdit : t.habitForm.submitNew}
          </button>
        </div>
      </form>
    </Modal>
  )
}
