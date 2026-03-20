'use client'

import { Activity } from 'lucide-react'
import type { CardioBlock } from '@/lib/workouts/types'

interface CardioCardProps {
  cardio: CardioBlock
}

export default function CardioCard({ cardio }: CardioCardProps) {
  return (
    <div className="rounded-2xl border border-blush bg-white shadow-sm overflow-hidden">
      {/* Accent header strip */}
      <div className="bg-gradient-to-r from-blush to-pink-dusty/30 px-5 py-4 flex items-center gap-3">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/70 text-xl shadow-sm">
          🏃‍♀️
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-base font-semibold text-gray-800 leading-tight">
            {cardio.name}
          </h3>
          <span className="mt-0.5 inline-block rounded-full bg-mauve px-2.5 py-0.5 text-xs font-semibold text-white leading-none">
            {cardio.duration} min
          </span>
        </div>
        <Activity className="h-5 w-5 text-mauve flex-shrink-0 opacity-60" />
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3 bg-blush/20">
        {/* Instructions */}
        {cardio.instructions.length > 0 && (
          <div>
            <h4 className="font-sans font-semibold text-xs uppercase tracking-wide text-mauve mb-1.5">
              Instructions
            </h4>
            <ul className="space-y-1">
              {cardio.instructions.map((step, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-dusty" />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tips */}
        {cardio.tips.length > 0 && (
          <div>
            <h4 className="font-sans font-semibold text-xs uppercase tracking-wide text-mauve mb-1.5">
              Tips
            </h4>
            <ul className="space-y-1">
              {cardio.tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-gray-700">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-dusty" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
