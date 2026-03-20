'use client'

import { getWeeklyProgress, getStreak } from '@/lib/progress'

interface ProgressTrackerProps {
  programId: '3day' | '5day'
  completedWorkouts: string[]
}

export default function ProgressTracker({ programId }: ProgressTrackerProps) {
  const { completed, total } = getWeeklyProgress(programId)
  const streak = getStreak()

  const weeklyLabel =
    completed === 0
      ? "Let's get started! ✨"
      : `${completed}/${total} this week ${total === 3 ? '🔥' : '💪'}`

  const streakLabel =
    streak === 0
      ? 'No streak yet'
      : `${streak} week streak 🏆`

  return (
    <div className="flex gap-3 px-4">
      <div className="flex-1 flex items-center justify-center rounded-xl bg-blush/50 px-4 py-3">
        <span className="font-sans text-sm font-medium text-mauve text-center">
          {weeklyLabel}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center rounded-xl bg-blush/50 px-4 py-3">
        <span className="font-sans text-sm font-medium text-mauve text-center">
          {streakLabel}
        </span>
      </div>
    </div>
  )
}
