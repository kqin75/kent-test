import Button from '../ui/Button'

interface ExamControlsProps {
  currentIndex: number
  totalQuestions: number
  onPrev: () => void
  onNext: () => void
  onSubmit: () => void
}

export default function ExamControls({
  currentIndex,
  totalQuestions,
  onPrev,
  onNext,
  onSubmit,
}: ExamControlsProps) {
  const isFirst = currentIndex === 0
  const isLast = currentIndex === totalQuestions - 1

  return (
    <div className="flex items-center justify-between gap-3">
      <Button
        variant="secondary"
        onClick={onPrev}
        disabled={isFirst}
      >
        ← Previous
      </Button>

      <span className="text-sm text-gray-500 font-medium">
        {currentIndex + 1} / {totalQuestions}
      </span>

      {isLast ? (
        <Button variant="primary" onClick={onSubmit}>
          Submit ✓
        </Button>
      ) : (
        <Button variant="primary" onClick={onNext}>
          Next →
        </Button>
      )}
    </div>
  )
}
