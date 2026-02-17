import { useNavigate } from 'react-router-dom'
import { useQuestionBankStore } from '../store/questionBankStore'
import { usePaperStore } from '../store/paperStore'
import { useExamStore } from '../store/examStore'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

export default function HomePage() {
  const navigate = useNavigate()
  const questions = useQuestionBankStore((s) => s.questions)
  const entries = usePaperStore((s) => s.entries)
  const selectPaper = usePaperStore((s) => s.selectPaper)
  const regenerateAll = usePaperStore((s) => s.regenerateAll)
  const startExam = useExamStore((s) => s.startExam)

  function handleStart(index: number) {
    selectPaper(index)
    startExam(entries[index].paper)
    navigate('/exam')
  }

  function handleReview(index: number) {
    selectPaper(index)
    navigate('/results')
  }

  function handleRegenerate() {
    regenerateAll(questions)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Kent Test 11+ Maths Practice
          </h1>
          <p className="text-gray-500 text-lg">
            25 questions · 25 minutes · Multiple choice (a–e)
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry, i) => {
            const isCompleted = entry.status === 'completed'
            const result = entry.result
            const pct = result ? Math.round((result.score / result.total) * 100) : 0

            return (
              <Card key={entry.paper.id} className="flex flex-col justify-between">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Practice {i + 1}
                  </h2>
                  <p className="text-sm text-gray-500">
                    25 questions · 10 easy · 10 medium · 5 hard
                  </p>
                </div>

                {isCompleted && result ? (
                  <div>
                    <div className="mb-3">
                      <span
                        className={`text-2xl font-bold ${
                          pct >= 75
                            ? 'text-green-600'
                            : pct >= 50
                              ? 'text-orange-600'
                              : 'text-red-600'
                        }`}
                      >
                        {result.score}/{result.total}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">{pct}%</span>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleReview(i)}
                      className="w-full"
                    >
                      Review
                    </Button>
                  </div>
                ) : (
                  <Button onClick={() => handleStart(i)} className="w-full">
                    Start
                  </Button>
                )}
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleRegenerate}
            className="text-sm text-gray-400 hover:text-gray-600 underline transition-colors cursor-pointer"
          >
            Regenerate All Papers
          </button>
        </div>
      </main>
    </div>
  )
}
