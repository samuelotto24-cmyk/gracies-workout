'use client'

import { Activity } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import type { Exercise } from '@/lib/workouts/types'

interface ExerciseCardProps {
  exercise: Exercise
  index: number
}

export default function ExerciseCard({ exercise, index }: ExerciseCardProps) {
  return (
    <div className="rounded-2xl border border-blush bg-white shadow-sm overflow-hidden">
      <Accordion defaultValue={[]}>
        <AccordionItem value={exercise.id} className="border-none">
          <AccordionTrigger
            className={cn(
              'w-full px-4 py-3 hover:no-underline hover:bg-blush/20 transition-colors',
              'rounded-2xl data-open:rounded-b-none'
            )}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Index circle */}
              <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-blush text-mauve text-xs font-medium">
                {index}
              </span>

              {/* Name + muscle group */}
              <div className="flex flex-col items-start min-w-0 gap-0.5">
                <span className="font-sans font-semibold text-sm text-gray-800 leading-tight truncate min-w-0">
                  {exercise.name}
                </span>
                <span className="inline-block rounded-full bg-blush px-2 py-0.5 text-xs text-pink-dusty font-medium leading-none">
                  {exercise.muscleGroup}
                </span>
              </div>
            </div>

            {/* Sets × reps + rest */}
            <div className="flex flex-col items-end gap-0.5 mr-2 flex-shrink-0">
              <span className="rounded-full bg-blush px-2.5 py-0.5 text-xs font-semibold text-mauve leading-none whitespace-nowrap">
                {exercise.sets} × {exercise.reps}
              </span>
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {exercise.restSeconds}s rest
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="px-4 pb-4 bg-blush/30">
            <div className="pt-3 space-y-3">
              {/* Instructions */}
              {exercise.instructions.length > 0 && (
                <div>
                  <h4 className="font-sans font-semibold text-xs uppercase tracking-wide text-mauve mb-1.5">
                    Instructions
                  </h4>
                  <ul className="space-y-1">
                    {exercise.instructions.map((step, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-dusty" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tips */}
              {exercise.tips.length > 0 && (
                <div>
                  <h4 className="font-sans font-semibold text-xs uppercase tracking-wide text-mauve mb-1.5">
                    Tips
                  </h4>
                  <ul className="space-y-1">
                    {exercise.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-pink-dusty" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer row: rest reminder + YouTube link */}
              <div className="flex items-center justify-between pt-1 border-t border-blush">
                <span className="text-xs text-gray-500">
                  Rest {exercise.restSeconds}s between sets
                </span>
                {exercise.youtubeUrl && (
                  <a
                    href={exercise.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-mauve px-3 py-1 text-xs font-medium text-white hover:bg-pink-dusty transition-colors"
                  >
                    <Activity className="h-3 w-3" />
                    Watch Tutorial
                  </a>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
