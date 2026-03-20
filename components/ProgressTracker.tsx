'use client'

import { useMemo } from 'react'
import { getWeeklyProgress, getStreak } from '@/lib/progress'

interface ProgressTrackerProps {
  programId: '3day' | '5day'
}

export default function ProgressTracker({ programId }: ProgressTrackerProps) {
  // Derive progress synchronously from localStorage — no effect needed
  const progress = useMemo(() => getWeeklyProgress(programId), [programId])
  // Re-derive streak whenever programId changes so the UI refreshes together
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const streak = useMemo(() => getStreak(), [programId])

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
