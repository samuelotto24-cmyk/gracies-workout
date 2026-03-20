'use client'

import { useEffect, useState } from 'react'
import { getWeeklyProgress, getStreak } from '@/lib/progress'

interface ProgressTrackerProps {
  programId: '3day' | '5day'
}

export default function ProgressTracker({ programId }: ProgressTrackerProps) {
  const [progress, setProgress] = useState<{ completed: number; total: number } | null>(null)
  const [streak, setStreak] = useState<number | null>(null)

  useEffect(() => {
    setProgress(getWeeklyProgress(programId))
    setStreak(getStreak())
  }, [programId])

  const weeklyLabel =
    progress === null
      ? '…'
      : progress.completed === 0
        ? "Let's get started! ✨"
        : `${progress.completed}/${progress.total} this week ${programId === '3day' ? '🔥' : '💪'}`

  const streakLabel =
    streak === null
      ? '…'
      : streak === 0
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
