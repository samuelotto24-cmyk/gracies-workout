'use client'

import { use, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ExerciseCard from '@/components/ExerciseCard'
import CardioCard from '@/components/CardioCard'
import { program3Day } from '@/lib/workouts/3day'
import { program5Day } from '@/lib/workouts/5day'
import { isWorkoutComplete, toggleWorkoutComplete } from '@/lib/progress'
import { cn } from '@/lib/utils'

const allDays = [...program3Day.days, ...program5Day.days]

export default function WorkoutPage({
  params,
}: {
  params: Promise<{ day: string }>
}) {
  const { day } = use(params)
  const router = useRouter()
  const workoutDay = allDays.find((d) => d.id === day)
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    if (workoutDay) {
      setIsCompleted(isWorkoutComplete(workoutDay.id))
    }
  }, [workoutDay?.id])

  // Not found
  if (!workoutDay) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="font-heading text-3xl text-pink-dusty mb-2">Workout not found</h1>
        <p className="text-gray-500 mb-8">We couldn't find a workout for that day.</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blush text-mauve rounded-2xl px-6 py-3 font-medium hover:bg-pink-dusty hover:text-white transition-colors"
        >
          ← This Week
        </button>
      </main>
    )
  }

  // Rest day
  if (workoutDay.isRest) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="text-6xl mb-4">😴</div>
        <h1 className="font-heading text-3xl text-pink-dusty mb-2">Rest Day</h1>
        <p className="text-gray-500 mb-8">Recovery is part of the process! Take it easy today.</p>
        <button
          onClick={() => router.push('/')}
          className="bg-blush text-mauve rounded-2xl px-6 py-3 font-medium hover:bg-pink-dusty hover:text-white transition-colors"
        >
          ← Back to schedule
        </button>
      </main>
    )
  }

  const handleToggleComplete = () => {
    if (!workoutDay) return
    toggleWorkoutComplete(workoutDay.id)
    setIsCompleted(prev => !prev)
  }

  return (
    <main>
      {/* Back button row */}
      <div className="max-w-2xl mx-auto px-4 py-4">
        <button
          onClick={() => router.push('/')}
          className="text-mauve font-medium text-sm hover:text-pink-dusty transition-colors flex items-center gap-1"
        >
          ← This Week
        </button>
      </div>

      {/* Page header */}
      <div className="bg-gradient-to-br from-pink-dusty to-mauve px-6 py-8 text-white max-w-2xl mx-4 sm:mx-auto rounded-2xl">
        <h1 className="font-heading text-2xl mb-1">
          {workoutDay.label} — {workoutDay.type}
        </h1>
        <p className="text-sm opacity-80">
          {workoutDay.exercises.length} exercises + cardio
        </p>
      </div>

      {/* Exercise list */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-3">
        {workoutDay.exercises.map((exercise, i) => (
          <ExerciseCard key={exercise.id} exercise={exercise} index={i + 1} />
        ))}

        {/* Cardio section */}
        {workoutDay.cardio.duration > 0 && (
          <CardioCard cardio={workoutDay.cardio} />
        )}

        {/* Mark Complete button */}
        <div className="pt-4 pb-8">
          <button
            onClick={handleToggleComplete}
            className={cn(
              'w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200',
              isCompleted
                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                : 'bg-mauve text-white hover:bg-pink-dusty'
            )}
          >
            {isCompleted ? '✓ Completed! Tap to undo' : '❤️ Mark Complete'}
          </button>
        </div>
      </div>
    </main>
  )
}
