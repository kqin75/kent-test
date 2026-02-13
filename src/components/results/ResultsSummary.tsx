import { formatTime } from '../../utils/formatTime'

interface ResultsSummaryProps {
  score: number
  total: number
  timeUsed: number
}

export default function ResultsSummary({ score, total, timeUsed }: ResultsSummaryProps) {
  const percentage = Math.round((score / total) * 100)
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (percentage / 100) * circumference

  let ringColor = 'text-green-500'
  if (percentage < 50) ringColor = 'text-red-500'
  else if (percentage < 75) ringColor = 'text-orange-500'

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Results</h2>

      {/* Ring progress */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <svg className="w-36 h-36 -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="45"
            fill="none" stroke="#e5e7eb" strokeWidth="8"
          />
          <circle
            cx="50" cy="50" r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`${ringColor} transition-all duration-1000`}
          />
        </svg>
        <div className="absolute text-center">
          <div className="text-3xl font-bold text-gray-900">{score}/{total}</div>
          <div className="text-sm text-gray-500">{percentage}%</div>
        </div>
      </div>

      <div className="flex justify-center gap-8 text-sm text-gray-600">
        <div>
          <span className="block text-2xl font-bold text-gray-900">{score}</span>
          Correct
        </div>
        <div>
          <span className="block text-2xl font-bold text-gray-900">{total - score}</span>
          Incorrect
        </div>
        <div>
          <span className="block text-2xl font-bold text-gray-900">{formatTime(timeUsed)}</span>
          Time Used
        </div>
      </div>
    </div>
  )
}
