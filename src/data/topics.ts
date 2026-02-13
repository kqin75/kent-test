import type { Topic } from './schema'

export const topics: Topic[] = [
  { id: 'arithmetic', label: 'Arithmetic', color: '#3b82f6' },
  { id: 'fractions-decimals-percentages', label: 'Fractions, Decimals & Percentages', color: '#8b5cf6' },
  { id: 'ratio-proportion', label: 'Ratio & Proportion', color: '#f59e0b' },
  { id: 'algebra-sequences', label: 'Algebra & Sequences', color: '#10b981' },
  { id: 'geometry', label: 'Geometry', color: '#ef4444' },
  { id: 'data-handling', label: 'Data Handling', color: '#06b6d4' },
  { id: 'units-measurement', label: 'Units & Measurement', color: '#f97316' },
]

export function getTopicById(id: string) {
  return topics.find((t) => t.id === id)
}
