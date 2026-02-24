import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuestionBankStore } from '../store/questionBankStore'
import { usePaperStore } from '../store/paperStore'
import { useExamStore } from '../store/examStore'
import { SUBJECTS } from '../constants'
import type { SubjectKey } from '../constants'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'

const validSubjects = new Set<string>(SUBJECTS.map((s) => s.key))

export default function HomePage() {
  const navigate = useNavigate()
  const { subject } = useParams<{ subject: string }>()

  const subjectKey = subject as SubjectKey
  const isValid = subject != null && validSubjects.has(subject)
  const subjectConfig = SUBJECTS.find((s) => s.key === subject)

  const questions = useQuestionBankStore((s) => s.questions)
  const entries = usePaperStore((s) => s.entries)
  const generatePapers = usePaperStore((s) => s.generatePapers)
  const selectPaper = usePaperStore((s) => s.selectPaper)
  const regenerateAll = usePaperStore((s) => s.regenerateAll)
  const startExam = useExamStore((s) => s.startExam)

  useEffect(() => {
    if (!isValid) {
      navigate('/', { replace: true })
      return
    }
    const subjectQuestions = questions[subjectKey]
    if (subjectQuestions.length > 0) {
      generatePapers(subjectKey, subjectQuestions)
    }
  }, [isValid, subjectKey, questions, generatePapers, navigate])

  if (!isValid || !subjectConfig) return null

  const subjectEntries = entries[subjectKey] ?? []

  function handleStart(index: number) {
    selectPaper(subjectKey, index)
    startExam(subjectEntries[index].paper)
    navigate(`/${subject}/exam`)
  }

  function handleReview(index: number) {
    selectPaper(subjectKey, index)
    navigate(`/${subject}/results`)
  }

  function handleRegenerate() {
    regenerateAll(subjectKey, questions[subjectKey])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <div className="mb-4">
            <button
              onClick={() => navigate('/')}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              &larr; Back to subjects
            </button>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Kent Test 11+ {subjectConfig.label} Practice
          </h1>
          <p className="text-gray-500 text-lg">
            25 questions · 25 minutes · Multiple choice (A-E)
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjectEntries.map((entry, i) => {
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
