import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Paper, Question, ExamResult, OptionLabel } from '../data/schema'
import { generatePaper } from '../utils/generatePaper'

export interface PaperEntry {
  paper: Paper
  status: 'not_started' | 'completed'
  result?: ExamResult
}

interface PaperStoreState {
  entries: PaperEntry[]
  selectedIndex: number | null
  questionFingerprint: string

  generatePapers: (questions: Question[]) => void
  selectPaper: (index: number) => void
  completePaper: (paperId: string, result: ExamResult) => void
  regenerateAll: (questions: Question[]) => void
}

const NUM_PAPERS = 5

function buildFingerprint(questions: Question[]): string {
  const ids = questions.map((q) => q.id).sort()
  const sample = ids.slice(0, 5).join(',')
  return `${questions.length}:${sample}`
}

export const usePaperStore = create<PaperStoreState>()(
  persist(
    (set, get) => ({
      entries: [],
      selectedIndex: null,
      questionFingerprint: '',

      generatePapers: (questions) => {
        const fp = buildFingerprint(questions)
        const state = get()
        // Only generate if no papers exist or fingerprint changed
        if (state.entries.length === NUM_PAPERS && state.questionFingerprint === fp) {
          return
        }
        const entries: PaperEntry[] = []
        for (let i = 0; i < NUM_PAPERS; i++) {
          const paper = generatePaper(questions)
          paper.title = `Practice ${i + 1}`
          entries.push({ paper, status: 'not_started' })
        }
        set({ entries, questionFingerprint: fp, selectedIndex: null })
      },

      selectPaper: (index) => set({ selectedIndex: index }),

      completePaper: (paperId, result) =>
        set((state) => ({
          entries: state.entries.map((entry) =>
            entry.paper.id === paperId
              ? { ...entry, status: 'completed' as const, result }
              : entry,
          ),
        })),

      regenerateAll: (questions) => {
        const fp = buildFingerprint(questions)
        const entries: PaperEntry[] = []
        for (let i = 0; i < NUM_PAPERS; i++) {
          const paper = generatePaper(questions)
          paper.title = `Practice ${i + 1}`
          entries.push({ paper, status: 'not_started' })
        }
        set({ entries, questionFingerprint: fp, selectedIndex: null })
      },
    }),
    {
      name: 'kent-test-papers',
      version: 1,
      migrate: () => ({
        entries: [],
        selectedIndex: null,
        questionFingerprint: '',
      }),
      partialize: (state) => ({
        entries: state.entries,
        questionFingerprint: state.questionFingerprint,
        selectedIndex: state.selectedIndex,
      }),
    },
  ),
)
