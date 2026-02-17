import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { useQuestionBankStore } from './store/questionBankStore'
import { usePaperStore } from './store/paperStore'
import HomePage from './pages/HomePage'
import ExamPage from './pages/ExamPage'
import ResultsPage from './pages/ResultsPage'

function AppLoader({ children }: { children: React.ReactNode }) {
  const seedFromJson = useQuestionBankStore((s) => s.seedFromJson)
  const isSeeded = useQuestionBankStore((s) => s.isSeeded)
  const questions = useQuestionBankStore((s) => s.questions)
  const generatePapers = usePaperStore((s) => s.generatePapers)
  const [loading, setLoading] = useState(!isSeeded)

  useEffect(() => {
    if (!isSeeded) {
      seedFromJson().then(() => setLoading(false))
    }
  }, [isSeeded, seedFromJson])

  useEffect(() => {
    if (isSeeded && questions.length > 0) {
      generatePapers(questions)
    }
  }, [isSeeded, questions, generatePapers])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading question bank...</p>
      </div>
    )
  }

  return <>{children}</>
}

export default function App() {
  return (
    <HashRouter>
      <AppLoader>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exam" element={<ExamPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </AppLoader>
    </HashRouter>
  )
}
