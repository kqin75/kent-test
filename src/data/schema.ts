export type TopicId =
  | 'arithmetic'
  | 'fractions-decimals-percentages'
  | 'ratio-proportion'
  | 'algebra-sequences'
  | 'geometry'
  | 'data-handling'
  | 'units-measurement'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type OptionLabel = 'a' | 'b' | 'c' | 'd' | 'e'

export interface Question {
  id: number
  text: string
  options: Record<OptionLabel, string>
  answer: OptionLabel
  explanation: string
  topic: TopicId
  difficulty: Difficulty
}

export interface Paper {
  id: string
  title: string
  questions: Question[]
}

export interface Topic {
  id: TopicId
  label: string
  color: string
}

export interface ExamResult {
  paperId: string
  paperTitle: string
  score: number
  total: number
  answers: Record<number, OptionLabel | null>
  flagged: number[]
  timeUsed: number
  completedAt: string
}
