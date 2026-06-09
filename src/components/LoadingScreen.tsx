import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onComplete: () => void
}

const WORDS = ['Build', 'Create', 'Ship']
const DURATION_MS = 2700

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const startRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / DURATION_MS, 1)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      const current = Math.round(eased * 100)
      setCount(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setTimeout(() => onComplete(), 400)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(prev => (prev + 1) % WORDS.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-6 md:p-10"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Top-left label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.div>

      {/* Center cycling word */}
      <div className="flex items-center justify-center flex-1">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 select-none"
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-4">
        {/* Counter + right alignment */}
        <div className="flex justify-between items-end">
          <span className="text-xs text-muted uppercase tracking-[0.3em]">
            Harsh Verma
          </span>
          <span
            className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none select-none"
          >
            {String(count).padStart(3, '0')}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full accent-gradient origin-left rounded-full"
            style={{
              scaleX: count / 100,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
