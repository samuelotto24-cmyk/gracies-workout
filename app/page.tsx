'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import ProgramToggle from '@/components/ProgramToggle'
import ProgressTracker from '@/components/ProgressTracker'
import WeekCalendar from '@/components/WeekCalendar'
import { program3Day } from '@/lib/workouts/3day'
import { program5Day } from '@/lib/workouts/5day'
import { getCompletedWorkouts } from '@/lib/progress'

export default function Home() {
  const [program, setProgram] = useState<'3day' | '5day'>('3day')
  const [completedWorkouts, setCompletedWorkouts] = useState<string[]>([])

  useEffect(() => {
    setCompletedWorkouts(getCompletedWorkouts())
  }, [program])

  const currentProgram = program === '3day' ? program3Day : program5Day

  return (
    <main>
      <Header title="Gracie's Workout Plan" />

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <ProgramToggle value={program} onChange={setProgram} />
        <ProgressTracker programId={program} />
        <WeekCalendar program={currentProgram} completedWorkouts={completedWorkouts} />
      </div>
    </main>
  )
}
