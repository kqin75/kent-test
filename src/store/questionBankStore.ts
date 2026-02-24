import { create } from 'zustand'
import type { Question, ExternalQuestion } from '../data/schema'
import type { SubjectKey } from '../constants'
import { transformQuestion } from '../utils/transformQuestion'
import { buildTopics, setTopics } from '../data/topics'

const mathsModules = import.meta.glob('../../data/Maths/*.json', { eager: true }) as Record<
  string,
  { default: ExternalQuestion[] }
>
const englishModules = import.meta.glob('../../data/Engalish/*.json', { eager: true }) as Record<
  string,
  { default: ExternalQuestion[] }
>
const vrModules = import.meta.glob('../../data/VR/*.json', { eager: true }) as Record<
  string,
  { default: ExternalQuestion[] }
>
const nvrModules = import.meta.glob('../../data/NVR/*.json', { eager: true }) as Record<
  string,
  { default: ExternalQuestion[] }
>

const allModules: Record<SubjectKey, Record<string, { default: ExternalQuestion[] }>> = {
  maths: mathsModules,
  english: englishModules,
  vr: vrModules,
  nvr: nvrModules,
}

function loadSubject(modules: Record<string, { default: ExternalQuestion[] }>): {
  questions: Question[]
  externals: ExternalQuestion[]
} {
  const externals: ExternalQuestion[] = []
  const seenIds = new Set<string>()
  for (const mod of Object.values(modules)) {
    for (const ext of mod.default) {
      if (!seenIds.has(ext.id)) {
        seenIds.add(ext.id)
        externals.push(ext)
      }
    }
  }
  return { questions: externals.map(transformQuestion), externals }
}

type SubjectQuestions = Record<SubjectKey, Question[]>

interface QuestionBankState {
  questions: SubjectQuestions
  isSeeded: boolean

  seedFromJson: () => Promise<void>
  resetToDefault: () => Promise<void>
}

const emptyQuestions: SubjectQuestions = { maths: [], english: [], vr: [], nvr: [] }

export const useQuestionBankStore = create<QuestionBankState>()(
  (set, get) => ({
    questions: emptyQuestions,
    isSeeded: false,

    seedFromJson: async () => {
      if (get().isSeeded) return
      const questions: SubjectQuestions = { maths: [], english: [], vr: [], nvr: [] }
      for (const subject of Object.keys(allModules) as SubjectKey[]) {
        const { questions: qs, externals } = loadSubject(allModules[subject])
        questions[subject] = qs
        setTopics(subject, buildTopics(externals))
      }
      set({ questions, isSeeded: true })
    },

    resetToDefault: async () => {
      const questions: SubjectQuestions = { maths: [], english: [], vr: [], nvr: [] }
      for (const subject of Object.keys(allModules) as SubjectKey[]) {
        const { questions: qs, externals } = loadSubject(allModules[subject])
        questions[subject] = qs
        setTopics(subject, buildTopics(externals))
      }
      set({ questions, isSeeded: true })
    },
  }),
)
