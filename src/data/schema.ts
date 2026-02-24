export type TopicId = string

export type Difficulty = 'easy' | 'medium' | 'hard'

export type OptionLabel = 'a' | 'b' | 'c' | 'd' | 'e'

export interface Question {
  id: string
  text: string
  image?: string
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
  strand?: string
}

export type ExternalOptionLabel = 'A' | 'B' | 'C' | 'D' | 'E'

export interface ExternalQuestion {
  id: string
  hash: string
  added_at: string
  topic: string
  topic_name: string
  strand: string
  difficulty: Difficulty
  text: string
  svg: string | null
  question_svg?: string
  options: Record<ExternalOptionLabel, string>
  correct_answer: ExternalOptionLabel
  explanation: string
}

export interface ExamResult {
  id: string
  paperTitle: string
  score: number
  total: number
  questions: Question[]
  answers: Record<string, OptionLabel | null>
  flagged: string[]
  timeUsed: number
  completedAt: string
}
