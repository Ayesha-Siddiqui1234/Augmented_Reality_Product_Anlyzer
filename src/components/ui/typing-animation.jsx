// src/components/ui/typing-animation.jsx
// Typewriter cycling animation — no external deps

import { useState, useEffect, useRef } from 'react'

export function TypingAnimation({
  words = [],
  typeSpeed = 120,
  deleteSpeed = 60,
  pauseDelay = 1500,
  loop = true,
  className = '',
}) {
  const [displayed, setDisplayed]   = useState('')
  const [wordIndex, setWordIndex]   = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused]     = useState(false)
  const timeout = useRef(null)

  useEffect(() => {
    if (!words.length) return

    const currentWord = words[wordIndex % words.length]

    if (isPaused) {
      timeout.current = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDelay)
      return
    }

    if (!isDeleting) {
      if (displayed.length < currentWord.length) {
        timeout.current = setTimeout(
          () => setDisplayed(currentWord.slice(0, displayed.length + 1)),
          typeSpeed
        )
      } else {
        if (!loop && wordIndex === words.length - 1) return
        setIsPaused(true)
      }
    } else {
      if (displayed.length > 0) {
        timeout.current = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          deleteSpeed
        )
      } else {
        setIsDeleting(false)
        setWordIndex(i => (i + 1) % words.length)
      }
    }

    return () => clearTimeout(timeout.current)
  }, [displayed, isDeleting, isPaused, wordIndex, words, typeSpeed, deleteSpeed, pauseDelay, loop])

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}
