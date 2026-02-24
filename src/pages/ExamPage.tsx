import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useExamStore } from '../store/examStore'
import ExamShell from '../components/exam/ExamShell'

export default function ExamPage() {
  const navigate = useNavigate()
  const { subject } = useParams<{ subject: string }>()
  const paper = useExamStore((s) => s.paper)
  const status = useExamStore((s) => s.status)

  useEffect(() => {
    if (!paper) {
      navigate(subject ? `/${subject}` : '/')
    }
  }, [paper, navigate, subject])

  if (status === 'submitted') {
    navigate(`/${subject}/results`)
    return null
  }

  if (!paper) return null

  return <ExamShell subject={subject!} />
}
