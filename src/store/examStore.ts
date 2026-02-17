import { create } from 'zustand'
import type { OptionLabel, Paper } from '../data/schema'

type ExamStatus = 'idle' | 'in-progress' | 'submitted'

interface ExamState {
  paper: Paper | null
  currentIndex: number
  answers: Record<string, OptionLabel | null>
  status: ExamStatus
  timeUsed: number

  startExam: (paper: Paper) => void
  selectAnswer: (questionId: string, option: OptionLabel) => void
  goToQuestion: (index: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
  submitExam: (timeUsed: number) => void
  resetExam: () => void
}

export const useExamStore = create<ExamState>((set) => ({
  paper: null,
  currentIndex: 0,
  answers: {},
  status: 'idle',
  timeUsed: 0,

  startExam: (paper) =>
    set({
      paper,
      currentIndex: 0,
      answers: {},
      status: 'in-progress',
      timeUsed: 0,
    }),

  selectAnswer: (questionId, option) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: option },
    })),

  goToQuestion: (index) => set({ currentIndex: index }),

  nextQuestion: () =>
    set((state) => {
      const total = state.paper?.questions.length ?? 0
      return { currentIndex: Math.min(state.currentIndex + 1, total - 1) }
    }),

  prevQuestion: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0),
    })),

  submitExam: (timeUsed) =>
    set({ status: 'submitted', timeUsed }),

  resetExam: () =>
    set({
      paper: null,
      currentIndex: 0,
      answers: {},
      status: 'idle',
      timeUsed: 0,
    }),
}))
