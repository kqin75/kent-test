import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ExamResult } from '../data/schema'

interface HistoryState {
  results: ExamResult[]
  addResult: (result: ExamResult) => void
  clearHistory: () => void
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      results: [],
      addResult: (result) =>
        set((state) => ({ results: [result, ...state.results] })),
      clearHistory: () => set({ results: [] }),
    }),
    { name: 'kent-test-history' },
  ),
)
