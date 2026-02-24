export type SubjectKey = 'maths' | 'english' | 'vr' | 'nvr'

export const SUBJECTS: { key: SubjectKey; label: string; description: string; icon: string; color: string }[] = [
  { key: 'maths', label: 'Maths', description: 'Arithmetic, geometry, algebra and more', icon: '📐', color: 'blue' },
  { key: 'english', label: 'English', description: 'Reading comprehension, grammar and vocabulary', icon: '📖', color: 'green' },
  { key: 'vr', label: 'Verbal Reasoning', description: 'Word patterns, logic and language skills', icon: '🧩', color: 'purple' },
  { key: 'nvr', label: 'Non-Verbal Reasoning', description: 'Shapes, patterns and spatial reasoning', icon: '🔷', color: 'orange' },
]

export const TOTAL_QUESTIONS = 25
export const EXAM_DURATION_SECONDS = 25 * 60 // 25 minutes
export const OPTIONS_COUNT = 5
export const WARNING_THRESHOLD = 5 * 60 // 5 minutes
export const URGENT_THRESHOLD = 60 // 1 minute

export const DEFAULT_PAPER_CONFIG = { easy: 10, medium: 10, hard: 5 }
