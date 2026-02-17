import { useNavigate } from 'react-router-dom'
import { usePaperStore } from '../store/paperStore'
import { calculateTopicScores } from '../utils/scoring'
import ResultsSummary from '../components/results/ResultsSummary'
import TopicBreakdown from '../components/results/TopicBreakdown'
import QuestionReview from '../components/results/QuestionReview'
import Button from '../components/ui/Button'

export default function ResultsPage() {
  const navigate = useNavigate()
  const entries = usePaperStore((s) => s.entries)
  const selectedIndex = usePaperStore((s) => s.selectedIndex)

  const entry = selectedIndex != null ? entries[selectedIndex] : null
  const result = entry?.result

  if (!result) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No results found.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    )
  }

  const topicScores = calculateTopicScores(result.questions, result.answers)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">{result.paperTitle} — Results</h1>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <ResultsSummary
          score={result.score}
          total={result.total}
          timeUsed={result.timeUsed}
        />
        <TopicBreakdown topicScores={topicScores} />
        <QuestionReview
          questions={result.questions}
          answers={result.answers}
        />
        <div className="text-center py-4">
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </main>
    </div>
  )
}
