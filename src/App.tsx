import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ExamPage from './pages/ExamPage'
import ResultsPage from './pages/ResultsPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exam/:paperId" element={<ExamPage />} />
        <Route path="/results/:paperId" element={<ResultsPage />} />
      </Routes>
    </HashRouter>
  )
}
