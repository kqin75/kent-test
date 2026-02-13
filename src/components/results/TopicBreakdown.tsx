import type { TopicScore } from '../../utils/scoring'

interface TopicBreakdownProps {
  topicScores: TopicScore[]
}

export default function TopicBreakdown({ topicScores }: TopicBreakdownProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Topic Breakdown</h3>
      <div className="space-y-3">
        {topicScores.map((ts) => {
          const pct = ts.total > 0 ? Math.round((ts.correct / ts.total) * 100) : 0
          return (
            <div key={ts.topicId}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{ts.label}</span>
                <span className="text-gray-500">
                  {ts.correct}/{ts.total} ({pct}%)
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: ts.color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
