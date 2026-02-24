import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Paper, Question, ExamResult } from '../data/schema'
import type { SubjectKey } from '../constants'
import { generatePaper } from '../utils/generatePaper'

export interface PaperEntry {
  paper: Paper
  status: 'not_started' | 'completed'
  result?: ExamResult
}

type SubjectEntries = Record<SubjectKey, PaperEntry[]>
type SubjectFingerprints = Record<SubjectKey, string>

interface PaperStoreState {
  entries: SubjectEntries
  selectedIndex: number | null
  questionFingerprint: SubjectFingerprints

  generatePapers: (subject: SubjectKey, questions: Question[]) => void
  selectPaper: (subject: SubjectKey, index: number) => void
  completePaper: (subject: SubjectKey, paperId: string, result: ExamResult) => void
  regenerateAll: (subject: SubjectKey, questions: Question[]) => void
}

const NUM_PAPERS = 5

const emptyEntries: SubjectEntries = { maths: [], english: [], vr: [], nvr: [] }
const emptyFingerprints: SubjectFingerprints = { maths: '', english: '', vr: '', nvr: '' }

function buildFingerprint(questions: Question[]): string {
  const ids = questions.map((q) => q.id).sort()
  const sample = ids.slice(0, 5).join(',')
  return `${questions.length}:${sample}`
}

export const usePaperStore = create<PaperStoreState>()(
  persist(
    (set, get) => ({
      entries: { ...emptyEntries },
      selectedIndex: null,
      questionFingerprint: { ...emptyFingerprints },

      generatePapers: (subject, questions) => {
        const fp = buildFingerprint(questions)
        const state = get()
        const subjectEntries = state.entries[subject] ?? []
        if (subjectEntries.length === NUM_PAPERS && state.questionFingerprint[subject] === fp) {
          return
        }
        const newEntries: PaperEntry[] = []
        for (let i = 0; i < NUM_PAPERS; i++) {
          const paper = generatePaper(questions)
          paper.title = `Practice ${i + 1}`
          newEntries.push({ paper, status: 'not_started' })
        }
        set({
          entries: { ...state.entries, [subject]: newEntries },
          questionFingerprint: { ...state.questionFingerprint, [subject]: fp },
          selectedIndex: null,
        })
      },

      selectPaper: (_subject, index) => set({ selectedIndex: index }),

      completePaper: (subject, paperId, result) =>
        set((state) => ({
          entries: {
            ...state.entries,
            [subject]: state.entries[subject].map((entry) =>
              entry.paper.id === paperId
                ? { ...entry, status: 'completed' as const, result }
                : entry,
            ),
          },
        })),

      regenerateAll: (subject, questions) => {
        const fp = buildFingerprint(questions)
        const state = get()
        const newEntries: PaperEntry[] = []
        for (let i = 0; i < NUM_PAPERS; i++) {
          const paper = generatePaper(questions)
          paper.title = `Practice ${i + 1}`
          newEntries.push({ paper, status: 'not_started' })
        }
        set({
          entries: { ...state.entries, [subject]: newEntries },
          questionFingerprint: { ...state.questionFingerprint, [subject]: fp },
          selectedIndex: null,
        })
      },
    }),
    {
      name: 'kent-test-papers',
      version: 2,
      migrate: () => ({
        entries: { ...emptyEntries },
        selectedIndex: null,
        questionFingerprint: { ...emptyFingerprints },
      }),
      partialize: (state) => ({
        entries: state.entries,
        questionFingerprint: state.questionFingerprint,
        selectedIndex: state.selectedIndex,
      }),
    },
  ),
)
