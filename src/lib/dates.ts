import type { ISODate, Lang } from '../types'

const LOCALES: Record<Lang, string> = { es: 'es-ES', en: 'en-US' }

/** Returns today's date as a local YYYY-MM-DD string (never UTC-shifted). */
export function todayISO(): ISODate {
  return toISO(new Date())
}

export function toISO(date: Date): ISODate {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function fromISO(iso: ISODate): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, (m ?? 1) - 1, d ?? 1)
}

export function addDays(iso: ISODate, days: number): ISODate {
  const date = fromISO(iso)
  date.setDate(date.getDate() + days)
  return toISO(date)
}

/** Whole calendar days between two ISO dates (b - a), ignoring time of day. */
export function diffDays(a: ISODate, b: ISODate): number {
  const msPerDay = 24 * 60 * 60 * 1000
  const da = fromISO(a)
  const db = fromISO(b)
  const utcA = Date.UTC(da.getFullYear(), da.getMonth(), da.getDate())
  const utcB = Date.UTC(db.getFullYear(), db.getMonth(), db.getDate())
  return Math.round((utcB - utcA) / msPerDay)
}

export function formatLongDate(iso: ISODate, lang: Lang = 'es'): string {
  return fromISO(iso).toLocaleDateString(LOCALES[lang], {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatShortDate(iso: ISODate, lang: Lang = 'es'): string {
  return fromISO(iso).toLocaleDateString(LOCALES[lang], {
    day: 'numeric',
    month: 'short',
  })
}
