import type { OptionLabel } from '../../data/schema'

interface QuestionNavProps {
  totalQuestions: number
  currentIndex: number
  answers: Record<string, OptionLabel | null>
  questionIds: string[]
  onNavigate: (index: number) => void
}

export default function QuestionNav({
  totalQuestions,
  currentIndex,
  answers,
  questionIds,
  onNavigate,
}: QuestionNavProps) {
  // Highest index that has been answered
  const highestAnsweredIndex = questionIds.reduce(
    (max, qId, i) => (answers[qId] != null ? i : max),
    -1,
  )

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Questions
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: totalQuestions }, (_, i) => {
          const qId = questionIds[i]
          const isCurrent = i === currentIndex
          const isAnswered = answers[qId] != null
          const isAccessible = i <= highestAnsweredIndex + 1

          let bgClass: string
          if (isCurrent) {
            bgClass = 'bg-blue-600 text-white ring-2 ring-blue-300'
          } else if (isAnswered) {
            bgClass = 'bg-blue-100 text-blue-700 hover:bg-blue-200'
          } else if (isAccessible) {
            bgClass = 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          } else {
            bgClass = 'bg-gray-100 text-gray-400'
          }

          return (
            <button
              key={i}
              onClick={() => isAccessible && onNavigate(i)}
              disabled={!isAccessible}
              className={`relative w-full aspect-square flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                isAccessible ? 'cursor-pointer' : 'cursor-not-allowed'
              } ${bgClass}`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-gray-100 border border-gray-300" /> Locked
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-100 border border-blue-300" /> Answered
        </span>
        <span className="flex items-center gap-1">
          <span className="w-3 h-3 rounded bg-blue-600 border border-blue-300" /> Current
        </span>
      </div>
    </div>
  )
}
