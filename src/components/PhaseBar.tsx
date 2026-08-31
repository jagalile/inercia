import type { HabitPhase } from '../types'

interface PhaseBarProps {
  phases: HabitPhase[]
  currentDay: number
  accent: string
}

export default function PhaseBar({ phases, currentDay, accent }: PhaseBarProps) {
  return (
    <div className="w-full">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-stone-100 dark:bg-neutral-800">
        {phases.map((phase) => {
          const span = phase.to - phase.from + 1
          const doneInPhase = Math.max(0, Math.min(currentDay, phase.to) - phase.from + 1)
          const fillPct = Math.max(0, Math.min(100, (doneInPhase / span) * 100))
          return (
            <div key={phase.key} className="relative h-full flex-1 border-r-2 border-white last:border-r-0 dark:border-neutral-950">
              <div
                className="h-full transition-all duration-700 ease-out"
                style={{ width: `${fillPct}%`, backgroundColor: accent }}
              />
            </div>
          )
        })}
      </div>
      <div className="mt-2 flex text-[11px] font-medium uppercase tracking-wide text-stone-400">
        {phases.map((phase) => {
          const isCurrent = currentDay >= phase.from && currentDay <= phase.to
          return (
            <div
              key={phase.key}
              className={`flex-1 text-center transition-colors ${isCurrent ? 'text-stone-700 dark:text-stone-200' : ''}`}
            >
              {phase.label}
            </div>
          )
        })}
      </div>
    </div>
  )
}
