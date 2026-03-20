'use client'

import { useRouter } from 'next/navigation'
import type { WorkoutProgram } from '@/lib/workouts/types'
import DayCard from './DayCard'

interface WeekCalendarProps {
  program: WorkoutProgram
  completedWorkouts: string[]
}

export default function WeekCalendar({ program, completedWorkouts }: WeekCalendarProps) {
  const router = useRouter()

  function handleNavigate(dayId: string) {
    router.push(`/workout/${dayId}`)
  }

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
              isCompleted={completedWorkouts.includes(day.id)}
              onNavigate={handleNavigate}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
