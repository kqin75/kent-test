import { create } from 'zustand'
import type { Question, ExternalQuestion } from '../data/schema'
import { transformQuestion } from '../utils/transformQuestion'
import { buildTopics, setTopics } from '../data/topics'

const jsonModules = import.meta.glob('../../data/Maths/*.json', { eager: true }) as Record<
  string,
  { default: ExternalQuestion[] }
>

function loadFromGlob(): { questions: Question[]; externals: ExternalQuestion[] } {
  const externals: ExternalQuestion[] = []
  const seenIds = new Set<string>()
  for (const mod of Object.values(jsonModules)) {
    for (const ext of mod.default) {
      if (!seenIds.has(ext.id)) {
        seenIds.add(ext.id)
        externals.push(ext)
      }
    }
  }
  return { questions: externals.map(transformQuestion), externals }
}

interface QuestionBankState {
  questions: Question[]
  isSeeded: boolean

  seedFromJson: () => Promise<void>
  resetToDefault: () => Promise<void>
}

export const useQuestionBankStore = create<QuestionBankState>()(
  (set, get) => ({
    questions: [],
    isSeeded: false,

    seedFromJson: async () => {
      if (get().isSeeded) return
      const { questions, externals } = loadFromGlob()
      setTopics(buildTopics(externals))
      set({ questions, isSeeded: true })
    },

    resetToDefault: async () => {
      const { questions, externals } = loadFromGlob()
      setTopics(buildTopics(externals))
      set({ questions, isSeeded: true })
    },
  }),
)
