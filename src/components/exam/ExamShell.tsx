import { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExamStore } from '../../store/examStore'
import { useHistoryStore } from '../../store/historyStore'
import { useTimer } from '../../hooks/useTimer'
import { calculateScore } from '../../utils/scoring'
import { EXAM_DURATION_SECONDS } from '../../constants'
import Timer from './Timer'
import QuestionCard from './QuestionCard'
import QuestionNav from './QuestionNav'
import ExamControls from './ExamControls'
import Modal from '../ui/Modal'

export default function ExamShell() {
  const navigate = useNavigate()
  const {
    paper,
    currentIndex,
    answers,
    flagged,
    selectAnswer,
    toggleFlag,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitExam,
  } = useExamStore()

  const addResult = useHistoryStore((s) => s.addResult)
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const submittedRef = useRef(false)

  const getTimeUsed = useRef<() => number>(() => 0)

  const handleSubmit = useCallback(() => {
    if (!paper || submittedRef.current) return
    submittedRef.current = true
    const timeUsed = getTimeUsed.current()
    const score = calculateScore(paper.questions, answers)
    submitExam(timeUsed)
    addResult({
      paperId: paper.id,
      paperTitle: paper.title,
      score,
      total: paper.questions.length,
      answers,
      flagged: Array.from(flagged),
      timeUsed,
      completedAt: new Date().toISOString(),
    })
    navigate(`/results/${paper.id}`)
  }, [paper, answers, flagged, submitExam, addResult, navigate])

  const timer = useTimer({
    initialSeconds: EXAM_DURATION_SECONDS,
    onTimeUp: handleSubmit,
  })

  getTimeUsed.current = () => timer.timeUsed

  useEffect(() => {
    timer.start()
    return () => timer.pause()
  }, [])

  if (!paper) return null

  const question = paper.questions[currentIndex]
  const unansweredCount = paper.questions.filter((q) => answers[q.id] == null).length
  const flaggedCount = flagged.size

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">{paper.title}</h1>
          <Timer secondsLeft={timer.secondsLeft} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 lg:w-[70%] space-y-4">
            <QuestionCard
              question={question}
              questionNumber={currentIndex + 1}
              selectedAnswer={answers[question.id] ?? null}
              onSelect={(opt) => selectAnswer(question.id, opt)}
              isFlagged={flagged.has(question.id)}
              onToggleFlag={() => toggleFlag(question.id)}
            />
            <ExamControls
              currentIndex={currentIndex}
              totalQuestions={paper.questions.length}
              onPrev={prevQuestion}
              onNext={nextQuestion}
              onSubmit={() => setShowSubmitModal(true)}
            />
          </div>

          <div className="lg:w-[30%]">
            <div className="lg:sticky lg:top-20">
              <QuestionNav
                totalQuestions={paper.questions.length}
                currentIndex={currentIndex}
                answers={answers}
                flagged={flagged}
                questionIds={paper.questions.map((q) => q.id)}
                onNavigate={goToQuestion}
              />
              <div className="mt-4">
                <button
                  onClick={() => setShowSubmitModal(true)}
                  className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                >
                  Submit Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        open={showSubmitModal}
        title="Submit your exam?"
        onConfirm={handleSubmit}
        onCancel={() => setShowSubmitModal(false)}
        confirmText="Submit"
        cancelText="Go back"
      >
        <div className="space-y-2">
          {unansweredCount > 0 && (
            <p className="text-orange-600 font-medium">
              You have {unansweredCount} unanswered question{unansweredCount > 1 ? 's' : ''}.
            </p>
          )}
          {flaggedCount > 0 && (
            <p className="text-yellow-600 font-medium">
              You have {flaggedCount} flagged question{flaggedCount > 1 ? 's' : ''}.
            </p>
          )}
          {unansweredCount === 0 && flaggedCount === 0 && (
            <p>You have answered all questions. Ready to submit?</p>
          )}
          <p className="text-sm text-gray-500">
            Once submitted, you cannot change your answers.
          </p>
        </div>
      </Modal>
    </div>
  )
}
