import { useNavigate } from 'react-router-dom'
import { papers } from '../data/papers'
import { useHistoryStore } from '../store/historyStore'
import { useExamStore } from '../store/examStore'
import { formatTime } from '../utils/formatTime'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function HomePage() {
  const navigate = useNavigate()
  const results = useHistoryStore((s) => s.results)
  const clearHistory = useHistoryStore((s) => s.clearHistory)
  const startExam = useExamStore((s) => s.startExam)

  function handleStart(paperId: string) {
    const paper = papers.find((p) => p.id === paperId)
    if (!paper) return
    startExam(paper)
    navigate(`/exam/${paperId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Kent Test Maths Practice
          </h1>
          <p className="text-gray-500 text-lg">
            25 questions · 25 minutes · Multiple choice (a–e)
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Paper cards */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Choose a Paper</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {papers.map((paper) => {
              const pastResults = results.filter((r) => r.paperId === paper.id)
              const bestScore = pastResults.length > 0
                ? Math.max(...pastResults.map((r) => r.score))
                : null

              return (
                <Card key={paper.id} className="flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{paper.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {paper.questions.length} questions
                  </p>
                  {bestScore !== null && (
                    <p className="text-sm text-green-600 font-medium mb-4">
                      Best score: {bestScore}/{paper.questions.length}
                    </p>
                  )}
                  <div className="mt-auto">
                    <Button
                      onClick={() => handleStart(paper.id)}
                      className="w-full"
                    >
                      Start Exam
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* History */}
        {results.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Past Results</h2>
              <Button variant="ghost" size="sm" onClick={clearHistory}>
                Clear History
              </Button>
            </div>
            <div className="space-y-3">
              {results.map((r, i) => {
                const pct = Math.round((r.score / r.total) * 100)
                const date = new Date(r.completedAt)
                return (
                  <Card key={i} className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">{r.paperTitle}</h4>
                      <p className="text-sm text-gray-500">
                        {date.toLocaleDateString()} · {formatTime(r.timeUsed)} used
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`text-2xl font-bold ${
                        pct >= 75 ? 'text-green-600' : pct >= 50 ? 'text-orange-600' : 'text-red-600'
                      }`}>
                        {r.score}/{r.total}
                      </span>
                      <span className="block text-sm text-gray-500">{pct}%</span>
                    </div>
                  </Card>
                )
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
