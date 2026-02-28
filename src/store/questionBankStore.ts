import { create } from 'zustand'
import type { Question, ExternalQuestion, Difficulty, ExternalOptionLabel } from '../data/schema'
import type { SubjectKey } from '../constants'
import { transformQuestion } from '../utils/transformQuestion'
import { buildTopics, setTopics } from '../data/topics'

const mathsModules = import.meta.glob('../../data/Maths/*.json', { eager: true }) as Record<
  string,
  { default: unknown }
>
const englishModules = import.meta.glob('../../data/Engalish/*.json', { eager: true }) as Record<
  string,
  { default: unknown }
>
const vrModules = import.meta.glob('../../data/VR/*.json', { eager: true }) as Record<
  string,
  { default: unknown }
>
const nvrModules = import.meta.glob('../../data/NVR/*.json', { eager: true }) as Record<
  string,
  { default: unknown }
>

const allModules: Record<SubjectKey, Record<string, { default: unknown }>> = {
  maths: mathsModules,
  english: englishModules,
  vr: vrModules,
  nvr: nvrModules,
}

function mapDifficulty(level: string): Difficulty {
  if (level.startsWith('L1')) return 'easy'
  if (level.startsWith('L2') || level.startsWith('L3')) return 'medium'
  return 'hard'
}

function normalizeModule(raw: unknown): ExternalQuestion[] {
  if (Array.isArray(raw)) return raw as ExternalQuestion[]

  if (raw && typeof raw === 'object' && 'questions' in raw && Array.isArray((raw as { questions: unknown[] }).questions)) {
    const obj = raw as { questions: Record<string, unknown>[] }
    return obj.questions.map((q) => {
      const meta = (q.metadata ?? {}) as Record<string, string>
      const kp = meta.knowledge_point ?? ''
      const match = kp.match(/^(\S+)\s*—\s*(.+)$/)
      const topicCode = match ? match[1] : kp
      const topicName = match ? match[2].trim() : kp
      return {
        id: `maths_q${q.number}`,
        hash: '',
        added_at: '',
        topic: topicCode,
        topic_name: topicName,
        strand: 'Maths',
        difficulty: mapDifficulty(String(meta.difficulty ?? '')),
        text: String(q.question_text ?? ''),
        svg: (q.svg as string | null) ?? null,
        options: q.options as Record<ExternalOptionLabel, string>,
        correct_answer: String(q.answer ?? '') as ExternalOptionLabel,
        explanation: String(q.solution ?? ''),
      }
    })
  }

  return []
}

function loadSubject(modules: Record<string, { default: unknown }>): {
  questions: Question[]
  externals: ExternalQuestion[]
} {
  const externals: ExternalQuestion[] = []
  const seenIds = new Set<string>()
  for (const mod of Object.values(modules)) {
    for (const ext of normalizeModule(mod.default)) {
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
