import { useState } from 'react'
import type { Difficulty, Habit, Permissiveness } from '../types'
import {
  DIFFICULTY_HINTS,
  DIFFICULTY_LABELS,
  PERMISSIVENESS_LABELS,
  permissivenessHint,
} from '../lib/habitLogic'
import { todayISO } from '../lib/dates'
import Modal from './Modal'
import type { NewHabitInput } from '../hooks/useHabits'

interface HabitFormProps {
  initial?: Habit
  onSubmit: (input: NewHabitInput) => void
  onClose: () => void
}

const DIFFICULTIES: Difficulty[] = ['simple', 'moderado', 'complejo']
const PERMISSIVENESS: Permissiveness[] = ['estricto', 'moderado', 'laxo']

export default function HabitForm({ initial, onSubmit, onClose }: HabitFormProps) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [difficulty, setDifficulty] = useState<Difficulty>(initial?.difficulty ?? 'simple')
  const [permissiveness, setPermissiveness] = useState<Permissiveness>(initial?.permissiveness ?? 'moderado')
  const [startDate, setStartDate] = useState(initial?.startDate ?? todayISO())
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Ponle un nombre al hábito.')
      return
    }
    onSubmit({ name, description, difficulty, permissiveness, startDate })
  }

  return (
    <Modal title={initial ? 'Editar hábito' : 'Nuevo hábito'} onClose={onClose} maxWidth="max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
            Nombre
          </label>
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Leer 10 páginas"
            maxLength={80}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-stone-400 focus:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-neutral-500 dark:focus:bg-neutral-800"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
            Descripción <span className="font-normal text-stone-400">(opcional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="¿Por qué te importa este hábito?"
            rows={2}
            maxLength={240}
            className="w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-stone-400 focus:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-neutral-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
            Dificultad
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
                <div className="text-sm font-semibold">{DIFFICULTY_LABELS[d]}</div>
                <div
                  className={`mt-0.5 text-[11px] leading-tight ${
                    difficulty === d ? 'text-white/70 dark:text-stone-900/60' : 'text-stone-400'
                  }`}
                >
                  {DIFFICULTY_HINTS[d]}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300">
            Permisividad ante fallos
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PERMISSIVENESS.map((p) => (
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
                <div className="text-sm font-semibold">{PERMISSIVENESS_LABELS[p]}</div>
                <div
                  className={`mt-0.5 text-[11px] leading-tight ${
                    permissiveness === p ? 'text-white/70 dark:text-stone-900/60' : 'text-stone-400'
                  }`}
                >
                  {permissivenessHint(difficulty, p)}
                </div>
              </button>
            ))}
          </div>
          <p className="mt-2 text-[12px] leading-relaxed text-stone-400">
            Los días de margen son solo informativos: no hay penalización si los superas, tu
            racha simplemente refleja el camino real que has recorrido.
          </p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-stone-300">
            Fecha de inicio
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-stone-400 focus:bg-white dark:border-neutral-700 dark:bg-neutral-800 dark:focus:border-neutral-500"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2.5 text-sm font-medium text-stone-500 transition hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-neutral-800"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white"
          >
            {initial ? 'Guardar cambios' : 'Empezar hábito'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
