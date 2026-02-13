import type { Question, OptionLabel } from '../../data/schema'
import { getTopicById } from '../../data/topics'

interface QuestionReviewProps {
  questions: Question[]
  answers: Record<number, OptionLabel | null>
}

const optionLabels: OptionLabel[] = ['a', 'b', 'c', 'd', 'e']

export default function QuestionReview({ questions, answers }: QuestionReviewProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Question Review</h3>
      {questions.map((q, idx) => {
        const userAnswer = answers[q.id] ?? null
        const isCorrect = userAnswer === q.answer
        const topic = getTopicById(q.topic)

        return (
          <div
            key={q.id}
            className={`bg-white rounded-xl shadow-sm border-2 p-5 ${
              isCorrect ? 'border-green-200' : 'border-red-200'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-base font-semibold text-gray-900">
                <span className="text-blue-600">Q{idx + 1}.</span> {q.text}
              </h4>
              <span
                className={`flex-shrink-0 ml-3 px-2 py-1 rounded text-xs font-bold ${
                  isCorrect
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {isCorrect ? 'Correct' : 'Incorrect'}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3 text-xs">
              {topic && (
                <span
                  className="px-2 py-0.5 rounded-full text-white font-medium"
                  style={{ backgroundColor: topic.color }}
                >
                  {topic.label}
                </span>
              )}
              <span className={`px-2 py-0.5 rounded-full font-medium ${
                q.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {q.difficulty}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {optionLabels.map((label) => {
                const isUserChoice = userAnswer === label
                const isCorrectAnswer = q.answer === label

                let style = 'bg-gray-50 text-gray-600 border-gray-200'
                if (isCorrectAnswer) {
                  style = 'bg-green-50 text-green-800 border-green-300 font-medium'
                } else if (isUserChoice && !isCorrectAnswer) {
                  style = 'bg-red-50 text-red-800 border-red-300 line-through'
                }

                return (
                  <div
                    key={label}
                    className={`px-3 py-2 rounded-lg border text-sm ${style}`}
                  >
                    <span className="font-bold mr-2">{label.toUpperCase()}</span>
                    {q.options[label]}
                    {isCorrectAnswer && ' ✓'}
                    {isUserChoice && !isCorrectAnswer && ' ✗'}
                  </div>
                )
              })}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
              <span className="font-semibold">Explanation:</span> {q.explanation}
            </div>
          </div>
        )
      })}
    </div>
  )
}
