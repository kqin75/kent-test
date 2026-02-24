import type { Topic, ExternalQuestion } from './schema'
import type { SubjectKey } from '../constants'

const PALETTE = [
  '#3b82f6', '#8b5cf6', '#10b981', '#ef4444', '#06b6d4',
  '#f59e0b', '#ec4899', '#14b8a6', '#6366f1', '#84cc16',
  '#f97316', '#0ea5e9', '#a855f7', '#22c55e', '#e11d48',
]

export const topicsBySubject: Record<SubjectKey, Topic[]> = {
  maths: [],
  english: [],
  vr: [],
  nvr: [],
}

export function buildTopics(externals: ExternalQuestion[]): Topic[] {
  const seen = new Map<string, { name: string; strand: string }>()
  for (const q of externals) {
    if (!seen.has(q.topic)) {
      seen.set(q.topic, { name: q.topic_name, strand: q.strand })
    }
  }
  let i = 0
  const result: Topic[] = []
  for (const [id, { name, strand }] of seen) {
    result.push({
      id,
      label: name,
      color: PALETTE[i % PALETTE.length],
      strand,
    })
    i++
  }
  return result
}

export function setTopics(subject: SubjectKey, t: Topic[]) {
  topicsBySubject[subject] = t
}

export function getTopicById(subject: SubjectKey, id: string) {
  return topicsBySubject[subject].find((t) => t.id === id)
}

export function getTopics(subject: SubjectKey): Topic[] {
  return topicsBySubject[subject]
}
