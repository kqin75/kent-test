import type { Question, OptionLabel, TopicId } from '../data/schema'
import { topics } from '../data/topics'

export interface TopicScore {
  topicId: TopicId
  label: string
  color: string
  correct: number
  total: number
}

export function calculateScore(
  questions: Question[],
  answers: Record<number, OptionLabel | null>,
): number {
  return questions.filter((q) => answers[q.id] === q.answer).length
}

export function calculateTopicScores(
  questions: Question[],
  answers: Record<number, OptionLabel | null>,
): TopicScore[] {
  const map = new Map<TopicId, { correct: number; total: number }>()

  for (const q of questions) {
    const entry = map.get(q.topic) ?? { correct: 0, total: 0 }
    entry.total++
    if (answers[q.id] === q.answer) entry.correct++
    map.set(q.topic, entry)
  }

  return topics
    .filter((t) => map.has(t.id))
    .map((t) => {
      const stats = map.get(t.id)!
      return {
        topicId: t.id,
        label: t.label,
        color: t.color,
        correct: stats.correct,
        total: stats.total,
      }
    })
}
