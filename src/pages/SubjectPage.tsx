import { useNavigate } from 'react-router-dom'
import { SUBJECTS } from '../constants'

const colorMap: Record<string, { bg: string; border: string; hover: string }> = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', hover: 'hover:border-blue-400' },
  green: { bg: 'bg-green-50', border: 'border-green-200', hover: 'hover:border-green-400' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', hover: 'hover:border-purple-400' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', hover: 'hover:border-orange-400' },
}

export default function SubjectPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Kent Test 11+ Practice
          </h1>
          <p className="text-gray-500 text-lg">
            Choose a subject to start practising
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {SUBJECTS.map((subject) => {
            const colors = colorMap[subject.color]
            return (
              <button
                key={subject.key}
                onClick={() => navigate(`/${subject.key}`)}
                className={`${colors.bg} ${colors.border} ${colors.hover} border-2 rounded-xl p-6 text-left transition-all cursor-pointer hover:shadow-md`}
              >
                <div className="text-4xl mb-3">{subject.icon}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">{subject.label}</h2>
                <p className="text-sm text-gray-600">{subject.description}</p>
              </button>
            )
          })}
        </div>
      </main>

      <section className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
        <p>
          Free 11 Plus (11+) practice papers for the Kent Test. Practise Maths,
          English, Verbal Reasoning and Non-Verbal Reasoning with timed
          multiple-choice questions and instant results.
        </p>
      </section>
    </div>
  )
}
