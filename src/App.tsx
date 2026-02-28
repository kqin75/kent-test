import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useQuestionBankStore } from './store/questionBankStore'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      })
    }
  }, [location])

  return null
}

import SubjectPage from './pages/SubjectPage'
import HomePage from './pages/HomePage'
import ExamPage from './pages/ExamPage'
import ResultsPage from './pages/ResultsPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'

function AppLoader({ children }: { children: React.ReactNode }) {
  const seedFromJson = useQuestionBankStore((s) => s.seedFromJson)
  const isSeeded = useQuestionBankStore((s) => s.isSeeded)
  const [loading, setLoading] = useState(!isSeeded)

  useEffect(() => {
    if (!isSeeded) {
      seedFromJson().then(() => setLoading(false))
    }
  }, [isSeeded, seedFromJson])

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
    <BrowserRouter>
      <AnalyticsTracker />
      <nav className="bg-white border-b border-gray-200 px-4 py-2 flex justify-end gap-4">
        <Link to="/blog" className="text-base font-semibold text-blue-600 hover:text-blue-800">
          Blog
        </Link>
        <Link to="/contact" className="text-base font-semibold text-blue-600 hover:text-blue-800">
          Contact
        </Link>
      </nav>
      <Routes>
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/*" element={
          <AppLoader>
            <Routes>
              <Route path="/" element={<SubjectPage />} />
              <Route path="/:subject" element={<HomePage />} />
              <Route path="/:subject/exam" element={<ExamPage />} />
              <Route path="/:subject/results" element={<ResultsPage />} />
            </Routes>
          </AppLoader>
        } />
      </Routes>
    </BrowserRouter>
  )
}
