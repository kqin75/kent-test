import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useExamStore } from '../store/examStore'
import { getPaperById } from '../data/papers'
import ExamShell from '../components/exam/ExamShell'

export default function ExamPage() {
  const { paperId } = useParams<{ paperId: string }>()
  const navigate = useNavigate()
  const paper = useExamStore((s) => s.paper)
  const status = useExamStore((s) => s.status)
  const startExam = useExamStore((s) => s.startExam)

  useEffect(() => {
    if (!paper && paperId) {
      const found = getPaperById(paperId)
      if (found) {
        startExam(found)
      } else {
        navigate('/')
      }
    }
  }, [paper, paperId])

  if (status === 'submitted') {
    navigate(`/results/${paperId}`)
    return null
  }

  if (!paper) return null

  return <ExamShell />
}
