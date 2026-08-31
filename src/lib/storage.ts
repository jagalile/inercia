import type { ExportPayload, Habit, Lang } from '../types'

const STORAGE_KEY = 'inercia:habits:v1'

export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isHabitLike)
  } catch {
    return []
  }
}

export function saveHabits(habits: Habit[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  } catch {
    // Storage might be full or unavailable (private mode) — fail
    // silently rather than crash the app; data just won't persist.
  }
}

export function buildExportPayload(habits: Habit[]): ExportPayload {
  return {
    app: 'inercia',
    version: 1,
    exportedAt: new Date().toISOString(),
    habits,
  }
}

export function downloadExport(habits: Habit[], lang: Lang = 'es'): void {
  const payload = buildExportPayload(habits)
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  const date = new Date().toISOString().slice(0, 10)
  const slug = lang === 'en' ? 'habits' : 'habitos'
  a.href = url
  a.download = `inercia-${slug}-${date}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export type ImportErrorReason = 'invalid_json' | 'bad_format' | 'no_habits'

/** Thrown by parseImport with a machine reason — callers translate it. */
export class ImportError extends Error {
  reason: ImportErrorReason
  constructor(reason: ImportErrorReason) {
    super(reason)
    this.reason = reason
  }
}

/** Parses and validates an imported JSON file, returning the habit list. */
export function parseImport(text: string): Habit[] {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    throw new ImportError('invalid_json')
  }

  const habitsRaw = Array.isArray(data)
    ? data
    : isRecord(data) && Array.isArray((data as { habits?: unknown }).habits)
      ? (data as { habits: unknown[] }).habits
      : null

  if (!habitsRaw) {
    throw new ImportError('bad_format')
  }

  const habits = habitsRaw.filter(isHabitLike)
  if (habits.length === 0) {
    throw new ImportError('no_habits')
  }
  return habits
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null
}

function isHabitLike(v: unknown): v is Habit {
  if (!isRecord(v)) return false
  return (
    typeof v.id === 'string' &&
    typeof v.name === 'string' &&
    (v.difficulty === 'simple' || v.difficulty === 'moderado' || v.difficulty === 'complejo') &&
    (v.permissiveness === 'estricto' || v.permissiveness === 'moderado' || v.permissiveness === 'laxo') &&
    typeof v.startDate === 'string' &&
    isRecord(v.checkins) &&
    (v.status === 'active' || v.status === 'completed')
  )
}
