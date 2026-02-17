import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExamStore } from '../store/examStore'
import ExamShell from '../components/exam/ExamShell'

export default function ExamPage() {
  const navigate = useNavigate()
  const paper = useExamStore((s) => s.paper)
  const status = useExamStore((s) => s.status)

  useEffect(() => {
    if (!paper) {
      navigate('/')
    }
  }, [paper, navigate])

  if (status === 'submitted') {
    navigate('/results')
    return null
  }

  if (!paper) return null

  return <ExamShell />
}
