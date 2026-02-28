import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            What's New
          </h1>
          <p className="text-gray-500 text-lg">
            Weekly updates &amp; announcements
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {blogPosts.map((post, index) => (
          <article
            key={post.id}
            className="bg-white rounded-xl border border-gray-200 p-6 md:p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400 flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {post.date}
              </span>
              {index === 0 && (
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                  New
                </span>
              )}
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {post.title}
            </h2>

            <div className="space-y-3 text-gray-700 leading-relaxed">
              {post.paragraphs.map((p, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </div>
          </article>
        ))}

        <div className="text-center pt-2">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
