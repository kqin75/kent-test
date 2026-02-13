import { useNavigate, useParams } from 'react-router-dom'
import { useHistoryStore } from '../store/historyStore'
import { getPaperById } from '../data/papers'
import { calculateTopicScores } from '../utils/scoring'
import ResultsSummary from '../components/results/ResultsSummary'
import TopicBreakdown from '../components/results/TopicBreakdown'
import QuestionReview from '../components/results/QuestionReview'
import Button from '../components/ui/Button'

export default function ResultsPage() {
  const { paperId } = useParams<{ paperId: string }>()
  const navigate = useNavigate()
  const results = useHistoryStore((s) => s.results)

  const latestResult = results.find((r) => r.paperId === paperId)
  const paper = paperId ? getPaperById(paperId) : undefined

  if (!latestResult || !paper) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No results found for this paper.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    )
  }

  const topicScores = calculateTopicScores(paper.questions, latestResult.answers)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">{paper.title} — Results</h1>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <ResultsSummary
          score={latestResult.score}
          total={latestResult.total}
          timeUsed={latestResult.timeUsed}
        />
        <TopicBreakdown topicScores={topicScores} />
        <QuestionReview
          questions={paper.questions}
          answers={latestResult.answers}
        />
        <div className="text-center py-4">
          <Button onClick={() => navigate('/')}>Try Another Paper</Button>
        </div>
      </main>
    </div>
  )
}
