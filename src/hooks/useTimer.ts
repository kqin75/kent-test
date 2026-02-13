import { useEffect, useRef, useCallback, useState } from 'react'

interface UseTimerOptions {
  initialSeconds: number
  onTimeUp: () => void
}

export function useTimer({ initialSeconds, onTimeUp }: UseTimerOptions) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const endTimeRef = useRef<number>(0)
  const rafRef = useRef<number>(0)
  const onTimeUpRef = useRef(onTimeUp)
  onTimeUpRef.current = onTimeUp

  const tick = useCallback(() => {
    const now = Date.now()
    const remaining = Math.max(0, Math.round((endTimeRef.current - now) / 1000))
    setSecondsLeft(remaining)

    if (remaining <= 0) {
      setIsRunning(false)
      onTimeUpRef.current()
      return
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const start = useCallback(() => {
    endTimeRef.current = Date.now() + secondsLeft * 1000
    setIsRunning(true)
  }, [secondsLeft])

  const pause = useCallback(() => {
    setIsRunning(false)
    cancelAnimationFrame(rafRef.current)
  }, [])

  const reset = useCallback(() => {
    setIsRunning(false)
    cancelAnimationFrame(rafRef.current)
    setSecondsLeft(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    if (isRunning) {
      rafRef.current = requestAnimationFrame(tick)
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [isRunning, tick])

  const timeUsed = initialSeconds - secondsLeft

  return { secondsLeft, isRunning, start, pause, reset, timeUsed }
}
