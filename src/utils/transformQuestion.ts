import type { ExternalQuestion, Question, OptionLabel } from '../data/schema'

const optionMap: Record<string, OptionLabel> = {
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
}

export function transformQuestion(ext: ExternalQuestion): Question {
  return {
    id: ext.id,
    text: ext.text,
    ...(ext.svg ? { image: ext.svg } : {}),
    options: {
      a: ext.options.A,
      b: ext.options.B,
      c: ext.options.C,
      d: ext.options.D,
      e: ext.options.E,
    },
    answer: optionMap[ext.correct_answer],
    explanation: ext.explanation,
    topic: ext.topic,
    difficulty: ext.difficulty,
  }
}
