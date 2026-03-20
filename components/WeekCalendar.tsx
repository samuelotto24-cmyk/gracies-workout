'use client'

import { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import type { WorkoutProgram } from '@/lib/workouts/types'
import DayCard from './DayCard'

interface WeekCalendarProps {
  program: WorkoutProgram
  completedWorkouts: string[]
}

export default function WeekCalendar({ program, completedWorkouts }: WeekCalendarProps) {
  const router = useRouter()

  const handleNavigate = useCallback((dayId: string) => {
    router.push(`/workout/${dayId}`)
  }, [router])

  const completedSet = useMemo(() => new Set(completedWorkouts), [completedWorkouts])

  return (
    <section className="px-4">
      <h2 className="font-heading text-xl font-semibold text-gray-800 mb-3">
        This Week
      </h2>
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {program.days.map((day) => (
            <DayCard
              key={day.id}
              day={day}
              isCompleted={completedSet.has(day.id)}
              onNavigate={handleNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
