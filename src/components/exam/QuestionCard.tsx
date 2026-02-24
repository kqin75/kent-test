import type { Question, OptionLabel } from '../../data/schema'
import QuestionImage from '../ui/QuestionImage'

interface QuestionCardProps {
  question: Question
  questionNumber: number
  selectedAnswer: OptionLabel | null
  onSelect: (option: OptionLabel) => void
}

const optionLabels: OptionLabel[] = ['a', 'b', 'c', 'd', 'e']

function isSvg(value: string) {
  return value.trimStart().startsWith('<svg')
}

export default function QuestionCard({
  question,
  questionNumber,
  selectedAnswer,
  onSelect,
}: QuestionCardProps) {
  const hasSvgOptions = isSvg(question.options.a)

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900">
          <span className="text-blue-600">Q{questionNumber}.</span>{' '}
          {question.text}
        </h2>
      </div>

      {question.image && (
        <div className="mb-6">
          <QuestionImage image={question.image} />
        </div>
      )}

      <div className={hasSvgOptions ? 'grid grid-cols-3 sm:grid-cols-5 gap-3' : 'flex flex-wrap gap-2'}>
        {optionLabels.map((label) => {
          const isSelected = selectedAnswer === label
          return (
            <button
              key={label}
              onClick={() => onSelect(label)}
              className={`${hasSvgOptions ? '' : 'flex-1 min-w-0'} text-center px-3 py-3 rounded-lg border-2 transition-all text-base md:text-lg cursor-pointer ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 text-blue-900 font-medium'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
            >
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${hasSvgOptions ? 'mb-1' : 'mr-1.5'} text-sm font-bold ${
                isSelected ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}>
                {label.toUpperCase()}
              </span>
              {hasSvgOptions ? (
                <div dangerouslySetInnerHTML={{ __html: question.options[label] }} />
              ) : (
                question.options[label]
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
