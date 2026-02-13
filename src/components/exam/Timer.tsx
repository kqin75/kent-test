import { formatTime } from '../../utils/formatTime'
import { WARNING_THRESHOLD, URGENT_THRESHOLD } from '../../constants'

interface TimerProps {
  secondsLeft: number
}

export default function Timer({ secondsLeft }: TimerProps) {
  let colorClass = 'text-green-600 bg-green-50 border-green-200'
  if (secondsLeft <= URGENT_THRESHOLD) {
    colorClass = 'text-red-600 bg-red-50 border-red-200 animate-pulse'
  } else if (secondsLeft <= WARNING_THRESHOLD) {
    colorClass = 'text-orange-600 bg-orange-50 border-orange-200'
  }

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-lg font-bold ${colorClass}`}>
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {formatTime(secondsLeft)}
    </div>
  )
}
