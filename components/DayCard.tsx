'use client'

import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { WorkoutDay } from '@/lib/workouts/types'

interface DayCardProps {
  day: WorkoutDay
  isCompleted: boolean
  onNavigate: (dayId: string) => void
}

export default function DayCard({ day, isCompleted, onNavigate }: DayCardProps) {
  if (day.isRest) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-rest px-3 py-4 min-w-[80px] cursor-default select-none">
        <span className="text-xs font-sans font-semibold text-gray-400 uppercase tracking-wide">
          {day.label}
        </span>
        <span className="mt-1 text-xs font-sans text-gray-400">Rest</span>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => onNavigate(day.id)}
      className={cn(
        'relative flex flex-col items-center justify-center rounded-2xl border border-blush px-3 py-4 min-w-[80px]',
        'shadow-sm cursor-pointer transition-all duration-150',
        'hover:shadow-md hover:-translate-y-0.5',
        isCompleted ? 'bg-blush/40' : 'bg-white'
      )}
    >
      {isCompleted && (
        <span
          className="absolute top-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white"
          aria-label="Completed"
        >
          <Check className="h-3 w-3" />
        </span>
      )}
      <span className="text-xs font-sans font-semibold text-gray-700 uppercase tracking-wide">
        {day.label}
      </span>
      <span className="mt-1 text-xs font-sans text-pink-dusty text-center leading-tight">
        {day.type}
      </span>
    </button>
  )
}
