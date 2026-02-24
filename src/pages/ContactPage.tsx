import { Link } from 'react-router-dom'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Contact
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-700 text-lg mb-6">
            Have a question, found a bug, or want to suggest new content?
            <br />
            Feel free to get in touch!
          </p>
          <a
            href="mailto:kent11plus@gmail.com"
            className="text-blue-600 hover:text-blue-800 text-xl font-semibold underline"
          >
            kent11plus@gmail.com
          </a>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800 text-sm">
            &larr; Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
