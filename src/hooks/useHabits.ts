import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CheckinStatus, Difficulty, Habit, Permissiveness } from '../types'
import { loadHabits, saveHabits } from '../lib/storage'
import { createId } from '../lib/id'
import { todayISO } from '../lib/dates'

export interface NewHabitInput {
  name: string
  description: string
  difficulty: Difficulty
  permissiveness: Permissiveness
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>(() => loadHabits())

  useEffect(() => {
    saveHabits(habits)
  }, [habits])

  const activeHabit = useMemo(() => habits.find((h) => h.status === 'active') ?? null, [habits])
  const completedHabits = useMemo(
    () =>
      habits
        .filter((h) => h.status === 'completed')
        .sort((a, b) => (b.completedAt ?? '').localeCompare(a.completedAt ?? '')),
    [habits],
  )

  const addHabit = useCallback((input: NewHabitInput) => {
    const now = new Date().toISOString()
    const habit: Habit = {
      id: createId(),
      name: input.name.trim(),
      description: input.description.trim(),
      difficulty: input.difficulty,
      permissiveness: input.permissiveness,
      // A habit always starts the day it's created — starting today,
      // right away, is what actually gets a habit off the ground.
      startDate: todayISO(),
      checkins: {},
      status: 'active',
      createdAt: now,
      updatedAt: now,
    }
    setHabits((prev) => [...prev, habit])
    return habit.id
  }, [])

  const updateHabit = useCallback((id: string, patch: Partial<Habit>) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...patch, updatedAt: new Date().toISOString() } : h)),
    )
  }, [])

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id))
  }, [])

  const setCheckin = useCallback((id: string, date: string, status: CheckinStatus | null) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h
        const checkins = { ...h.checkins }
        if (status === null) {
          delete checkins[date]
        } else {
          checkins[date] = status
        }
        return { ...h, checkins, updatedAt: new Date().toISOString() }
      }),
    )
  }, [])

  const completeHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, status: 'completed', completedAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
          : h,
      ),
    )
  }, [])

  const reopenHabit = useCallback((id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, status: 'active', completedAt: undefined, updatedAt: new Date().toISOString() }
          : h,
      ),
    )
  }, [])

  const importHabits = useCallback((imported: Habit[], mode: 'merge' | 'replace') => {
    setHabits((prev) => {
      if (mode === 'replace') return imported
      const byId = new Map(prev.map((h) => [h.id, h]))
      for (const h of imported) byId.set(h.id, h)
      return Array.from(byId.values())
    })
  }, [])

  return {
    habits,
    activeHabit,
    completedHabits,
    addHabit,
    updateHabit,
    deleteHabit,
    setCheckin,
    completeHabit,
    reopenHabit,
    importHabits,
  }
}
