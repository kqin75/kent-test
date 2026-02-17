import type { Question, Paper } from '../data/schema'

interface PaperConfig {
  easy: number
  medium: number
  hard: number
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function generatePaper(
  allQuestions: Question[],
  config: PaperConfig = { easy: 10, medium: 10, hard: 5 },
): Paper {
  const byDifficulty = {
    easy: shuffle(allQuestions.filter((q) => q.difficulty === 'easy')),
    medium: shuffle(allQuestions.filter((q) => q.difficulty === 'medium')),
    hard: shuffle(allQuestions.filter((q) => q.difficulty === 'hard')),
  }

  const selected: Question[] = []
  const totalNeeded = config.easy + config.medium + config.hard

  // Pick from each difficulty
  for (const diff of ['easy', 'medium', 'hard'] as const) {
    const pool = byDifficulty[diff]
    const needed = config[diff]
    selected.push(...pool.slice(0, needed))
  }

  // Fallback: if any pool was short, fill from others
  if (selected.length < totalNeeded) {
    const selectedIds = new Set(selected.map((q) => q.id))
    const remaining = shuffle(
      allQuestions.filter((q) => !selectedIds.has(q.id)),
    )
    const shortfall = totalNeeded - selected.length
    selected.push(...remaining.slice(0, shortfall))
  }

  return {
    id: crypto.randomUUID(),
    title: `Practice — ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`,
    questions: shuffle(selected),
  }
}
