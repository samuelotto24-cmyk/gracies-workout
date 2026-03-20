export interface Exercise {
  id: string
  name: string
  sets: number
  reps: string        // e.g., "12" or "30 sec"
  restSeconds: number
  instructions: string[]
  tips: string[]
  youtubeUrl: string
  muscleGroup: string
}

export interface WorkoutDay {
  id: string          // e.g., "3day-monday"
  label: string       // e.g., "Monday"
  dayOfWeek: number   // 0=Sunday, 1=Monday, etc.
  type: string        // e.g., "Full Body A"
  isRest: boolean
  exercises: Exercise[]
  cardio: CardioBlock
}

export interface CardioBlock {
  name: string        // e.g., "Treadmill LISS"
  duration: number    // minutes
  instructions: string[]
  tips: string[]
}

export interface WorkoutProgram {
  id: string          // "3day" | "5day"
  name: string
  days: WorkoutDay[]  // 7 entries (Mon-Sun), isRest=true for rest days
}
