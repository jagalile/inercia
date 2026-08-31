export type Lang = 'es' | 'en'

export type MoodKey = 'starting' | 'gaining' | 'moving' | 'steady' | 'solid'

export type Difficulty = 'simple' | 'moderado' | 'complejo'

export type Permissiveness = 'estricto' | 'moderado' | 'laxo'

export type CheckinStatus = 'done' | 'missed'

/** ISO date string, format YYYY-MM-DD, always local calendar day. */
export type ISODate = string

export interface Habit {
  id: string
  name: string
  description: string
  difficulty: Difficulty
  permissiveness: Permissiveness
  startDate: ISODate
  /** Explicit day-by-day log. Days without an entry are treated as
   * "missed" once they're in the past — the user only needs to tap
   * in when a day went well; the app doesn't demand a daily check-in. */
  checkins: Record<ISODate, CheckinStatus>
  status: 'active' | 'completed'
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export type PhaseLabelKey = 'inicio' | 'consolidacion' | 'maestria' | 'cierre'

export interface HabitPhase {
  key: 'inicio' | 'consolidacion' | 'maestria'
  /** Which translated phase name to show — usually matches `key`,
   * except the short "simple" habit's last phase reads as "cierre"
   * rather than "maestría" (there isn't really room to earn mastery
   * in 21 days). */
  labelKey: PhaseLabelKey
  from: number
  to: number
}

export interface HabitStats {
  /** 1-indexed current day within the habit's duration, clamped to duration. */
  currentDay: number
  duration: number
  elapsedDays: number
  doneCount: number
  missedCount: number
  /** Remaining allowed-fail budget for the whole run. */
  failBudgetLeft: number
  failBudgetTotal: number
  /** Adherence as a 0-100 percentage over days that have already happened. */
  adherence: number
  /** Consecutive days (done or within-budget miss) since the last hard fail. */
  streak: number
  currentPhase: HabitPhase
  isFinished: boolean
  todayStatus: CheckinStatus | 'pending'
}

export interface ExportPayload {
  app: 'inercia'
  version: 1
  exportedAt: string
  habits: Habit[]
}
