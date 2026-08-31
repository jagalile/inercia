/**
 * Maps adherence (0-100) to a calm hue gradient: cool slate-blue at the
 * low end, through amber, to emerald at the high end. Deliberately
 * avoids red — low adherence is "still finding footing", not a
 * failure state, so nothing here reads as a warning or punishment.
 */
import type { MoodKey } from '../types'

export interface AdherencePalette {
  /** Hue for the accent (big numbers, active elements). */
  accentHue: number
  accentSat: number
  accent: string
  accentSoft: string
  /** Very subtle background tint, safe for both light and dark surfaces. */
  bgTintLight: string
  bgTintDark: string
  /** Translation key for the mood label — components look this up. */
  moodKey: MoodKey
}

const STOPS: { at: number; hue: number; sat: number; moodKey: MoodKey }[] = [
  { at: 0, hue: 222, sat: 45, moodKey: 'starting' },
  { at: 35, hue: 210, sat: 50, moodKey: 'gaining' },
  { at: 60, hue: 40, sat: 65, moodKey: 'moving' },
  { at: 80, hue: 165, sat: 55, moodKey: 'steady' },
  { at: 100, hue: 152, sat: 60, moodKey: 'solid' },
]

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function adherencePalette(adherence: number): AdherencePalette {
  const pct = Math.max(0, Math.min(100, adherence))
  let lower = STOPS[0]
  let upper = STOPS[STOPS.length - 1]
  for (let i = 0; i < STOPS.length - 1; i++) {
    if (pct >= STOPS[i].at && pct <= STOPS[i + 1].at) {
      lower = STOPS[i]
      upper = STOPS[i + 1]
      break
    }
  }
  const span = upper.at - lower.at || 1
  const t = (pct - lower.at) / span
  const hue = lerp(lower.hue, upper.hue, t)
  const sat = lerp(lower.sat, upper.sat, t)
  const moodKey = t < 0.5 ? lower.moodKey : upper.moodKey

  return {
    accentHue: hue,
    accentSat: sat,
    accent: `hsl(${hue.toFixed(0)} ${sat.toFixed(0)}% 52%)`,
    accentSoft: `hsl(${hue.toFixed(0)} ${sat.toFixed(0)}% 52% / 0.14)`,
    bgTintLight: `hsl(${hue.toFixed(0)} ${Math.min(sat, 40).toFixed(0)}% 97%)`,
    bgTintDark: `hsl(${hue.toFixed(0)} ${Math.min(sat, 35).toFixed(0)}% 9%)`,
    moodKey,
  }
}
