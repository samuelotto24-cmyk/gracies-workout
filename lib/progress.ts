// Key: "gracie-progress"
// Schema: { [weekKey: string]: string[] }
// weekKey format: "YYYY-WW" (ISO week)

const STORAGE_KEY = "gracie-progress"

/**
 * Returns the ISO week number for a given date.
 * ISO weeks start on Monday; week 1 is the week containing the first Thursday.
 */
function getISOWeek(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  // Set to nearest Thursday: current date + 4 - current day number (Mon=1 ... Sun=7)
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

/**
 * Returns the ISO year for a given date (may differ from calendar year near year boundaries).
 */
function getISOYear(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const day = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - day)
  return d.getUTCFullYear()
}

/**
 * Returns the week key for a given date in "YYYY-WW" format.
 * Defaults to today.
 */
export function getWeekKey(date?: Date): string {
  const d = date ?? new Date()
  const week = getISOWeek(d)
  const year = getISOYear(d)
  return `${year}-${String(week).padStart(2, "0")}`
}

/**
 * Reads the entire progress store from localStorage.
 * Returns an empty object if nothing is stored or if we're in a non-browser environment.
 */
function readStore(): Record<string, string[]> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Record<string, string[]>
  } catch {
    return {}
  }
}

/**
 * Writes the entire progress store to localStorage.
 */
function writeStore(store: Record<string, string[]>): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // localStorage may be unavailable (e.g., private browsing quota exceeded)
  }
}

/**
 * Returns the array of completed workout IDs for the given week.
 * Defaults to the current week.
 */
export function getCompletedWorkouts(weekKey?: string): string[] {
  const key = weekKey ?? getWeekKey()
  const store = readStore()
  const entry = store[key]
  return Array.isArray(entry) ? entry : []
}

/**
 * Marks a workout as complete in the current week.
 * Does nothing if it is already marked complete.
 */
export function markWorkoutComplete(workoutId: string): void {
  const key = getWeekKey()
  const store = readStore()
  const entry = store[key]
  const list = Array.isArray(entry) ? entry : []
  if (!list.includes(workoutId)) {
    store[key] = [...list, workoutId]
    writeStore(store)
  }
}

/**
 * Toggles a workout's completion status for the current week.
 * Adds it if not present; removes it if present.
 */
export function toggleWorkoutComplete(workoutId: string): void {
  const key = getWeekKey()
  const store = readStore()
  const entry = store[key]
  const list = Array.isArray(entry) ? entry : []
  if (list.includes(workoutId)) {
    store[key] = list.filter((id) => id !== workoutId)
  } else {
    store[key] = [...list, workoutId]
  }
  writeStore(store)
}

/**
 * Returns true if the workout is marked complete for the given week.
 * Defaults to the current week.
 */
export function isWorkoutComplete(workoutId: string, weekKey?: string): boolean {
  return getCompletedWorkouts(weekKey).includes(workoutId)
}

/**
 * Returns the number of consecutive weeks (counting backward from the current week)
 * in which at least one workout was completed.
 */
export function getStreak(): number {
  const store = readStore()
  let streak = 0
  let date = new Date()

  // Walk backwards week by week
  while (true) {
    const key = getWeekKey(date)
    const entry = store[key]
    const completed = Array.isArray(entry) ? entry : []
    if (completed.length === 0) break
    streak++
    // Move back exactly 7 days
    date = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000)
  }

  return streak
}

/**
 * Returns the number of completed workout days and total workout days for a given week
 * based on the selected program.
 *
 * "Total" is the number of non-rest days in the program (3 or 5).
 * "Completed" is the count of those workout IDs found in the week's completed list.
 */
export function getWeeklyProgress(
  programId: "3day" | "5day",
  weekKey?: string
): { completed: number; total: number } {
  const total = programId === "3day" ? 3 : 5
  const key = weekKey ?? getWeekKey()
  const store = readStore()
  const entry = store[key]
  const completedList = Array.isArray(entry) ? entry : []

  // Workout IDs follow the pattern "<programId>-<day>", e.g. "3day-monday"
  const prefix = programId + "-"
  const completed = completedList.filter((id) => id.startsWith(prefix)).length

  return { completed: Math.min(completed, total), total }
}
