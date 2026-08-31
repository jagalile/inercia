import type {
  Difficulty,
  Habit,
  HabitPhase,
  HabitStats,
  Permissiveness,
} from '../types'
import { addDays, diffDays, todayISO } from './dates'

export const DURATIONS: Record<Difficulty, number> = {
  simple: 21,
  moderado: 66,
  complejo: 90,
}

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  simple: 'Simple',
  moderado: 'Moderado',
  complejo: 'Complejo',
}

export const DIFFICULTY_HINTS: Record<Difficulty, string> = {
  simple: '21 días',
  moderado: '66 días',
  complejo: '90 días',
}

/**
 * Allowed-fail budgets per difficulty × permissiveness. Chosen as a
 * proportion of the total duration (~0% estricto, ~8% moderado,
 * ~15% laxo) so longer habits get proportionally more room to slip
 * without ever punishing the user — this is informative, not a rule.
 */
export const ALLOWED_FAILS: Record<Difficulty, Record<Permissiveness, number>> = {
  simple: { estricto: 0, moderado: 2, laxo: 4 },
  moderado: { estricto: 0, moderado: 5, laxo: 10 },
  complejo: { estricto: 0, moderado: 7, laxo: 14 },
}

export const PERMISSIVENESS_LABELS: Record<Permissiveness, string> = {
  estricto: 'Estricto',
  moderado: 'Moderado',
  laxo: 'Laxo',
}

export function permissivenessHint(difficulty: Difficulty, level: Permissiveness): string {
  const fails = ALLOWED_FAILS[difficulty][level]
  if (fails === 0) return 'Sin días de margen.'
  return `${fails} ${fails === 1 ? 'día de margen' : 'días de margen'}.`
}

/**
 * Phase breakpoints, proportional to the classic 21/66/90 split used
 * for a "complejo" habit (inicio ≈23%, consolidación ≈50%, maestría
 * ≈27%) and scaled down for shorter durations.
 */
export function getPhases(difficulty: Difficulty): HabitPhase[] {
  const duration = DURATIONS[difficulty]
  if (difficulty === 'complejo') {
    return [
      { key: 'inicio', label: 'Inicio', from: 1, to: 21 },
      { key: 'consolidacion', label: 'Consolidación', from: 22, to: 66 },
      { key: 'maestria', label: 'Maestría', from: 67, to: 90 },
    ]
  }
  const inicioEnd = Math.max(1, Math.round(duration * 0.233))
  const consolidacionEnd = Math.max(inicioEnd + 1, Math.round(duration * 0.733))
  return [
    { key: 'inicio', label: 'Inicio', from: 1, to: inicioEnd },
    { key: 'consolidacion', label: 'Consolidación', from: inicioEnd + 1, to: consolidacionEnd },
    { key: 'maestria', label: difficulty === 'moderado' ? 'Maestría' : 'Cierre', from: consolidacionEnd + 1, to: duration },
  ]
}

export function phaseForDay(difficulty: Difficulty, day: number): HabitPhase {
  const phases = getPhases(difficulty)
  return phases.find((p) => day >= p.from && day <= p.to) ?? phases[phases.length - 1]
}

export function computeStats(habit: Habit, today: string = todayISO()): HabitStats {
  const duration = DURATIONS[habit.difficulty]
  const failBudgetTotal = ALLOWED_FAILS[habit.difficulty][habit.permissiveness]
  const endDate = addDays(habit.startDate, duration - 1)
  const lastRelevantDate = today < endDate ? today : endDate

  const rawElapsed = diffDays(habit.startDate, lastRelevantDate) + 1
  const elapsedDays = Math.max(0, Math.min(rawElapsed, duration))
  const currentDay = Math.max(1, Math.min(diffDays(habit.startDate, today) + 1, duration))

  let doneCount = 0
  let missedCount = 0
  let budget = failBudgetTotal
  let daysSinceHardFail = 0

  for (let i = 0; i < elapsedDays; i++) {
    const date = addDays(habit.startDate, i)
    const isToday = date === today
    const entry = habit.checkins[date]
    // A day with no entry only counts once it's in the past — today
    // stays "pending" until the user logs it.
    const status = entry ?? (isToday ? undefined : 'missed')

    if (status === 'done') {
      doneCount++
      daysSinceHardFail++
    } else if (status === 'missed') {
      missedCount++
      if (budget > 0) {
        budget--
        daysSinceHardFail++
      } else {
        daysSinceHardFail = 0
      }
    }
  }

  const trackedDays = doneCount + missedCount
  // Before there's any history, there's nothing to be "good" or "bad"
  // about yet — 0 reads as the neutral starting point rather than a
  // premature, unearned 100%.
  const adherence = trackedDays === 0 ? 0 : Math.round((doneCount / trackedDays) * 100)
  const isFinished = today >= endDate
  const todayEntry = habit.checkins[today]
  const todayStatus = todayEntry ?? 'pending'

  return {
    currentDay,
    duration,
    elapsedDays,
    doneCount,
    missedCount,
    failBudgetLeft: Math.max(0, budget),
    failBudgetTotal,
    adherence,
    streak: daysSinceHardFail,
    currentPhase: phaseForDay(habit.difficulty, currentDay),
    isFinished,
    todayStatus,
  }
}
