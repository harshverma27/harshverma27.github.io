import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Hls from 'hls.js'
import gsap from 'gsap'

const HLS_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const ROLES = ['Developer', 'Builder', 'Contributor', 'Engineer']

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)

  // HLS video setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(HLS_URL)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_URL
    }
  }, [])

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex(prev => (prev + 1) % ROLES.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: 'power3.out' })
      tl.fromTo('.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      )
      tl.fromTo('.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        '-=0.8'
      )
      tl.fromTo('.cta-reveal',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        '-=0.5'
      )
      tl.fromTo('.scroll-reveal',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/*
        Keep only the animated background fixed. The hero copy scrolls away
        normally, so later sections can reveal the same motion behind them.
      */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,10,10,0.18)_42%,rgba(10,10,10,0.78)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg/85 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg/50 to-transparent" />
      </div>

      <section
        id="home"
        className="relative z-10 w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
          <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8">
            B.TECH '28 · NIT HAMIRPUR
          </p>

          <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
            Harsh Verma
          </h1>

          <p className="blur-in text-base md:text-lg text-muted mb-3">
            A{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="font-display italic text-text-primary inline-block"
              >
                {ROLES[roleIndex]}
              </motion.span>
            </AnimatePresence>
            {' '}based in India.
          </p>

          <p className="blur-in text-sm md:text-base text-muted max-w-md mb-12">
            Open-source contributor and backend developer building real-world systems
            — from GNOME contributions to embedded Raspberry Pi projects.
          </p>

          <div className="inline-flex gap-4 flex-wrap justify-center">
            <CTAButton id="see-works-btn" href="#works" variant="solid" label="See Works" />
            <CTAButton id="reach-out-btn" href="mailto:harshhvermaa@icloud.com" variant="outline" label="Reach out..." />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-reveal absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
          <div className="relative w-px h-10 bg-stroke overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-1/2 accent-gradient animate-scroll-down" />
          </div>
        </div>
      </section>
    </>
  )
}

interface CTAButtonProps {
  id: string
  href: string
  variant: 'solid' | 'outline'
  label: string
}

function CTAButton({ id, href, variant, label }: CTAButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      id={id}
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`
        cta-reveal relative rounded-full text-sm px-7 py-3.5 font-medium
        transition-all duration-300 overflow-hidden
        ${variant === 'solid'
          ? 'bg-text-primary text-bg hover:bg-bg hover:text-text-primary'
          : 'border-2 border-stroke bg-bg text-text-primary hover:border-transparent'
        }
      `}
    >
      {hovered && (
        <span
          className="absolute -inset-0.5 rounded-full -z-10"
          style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
        />
      )}
      {hovered && variant === 'solid' && (
        <span className="absolute inset-0 rounded-full -z-[5]" style={{ background: 'hsl(var(--bg))' }} />
      )}
      {label}
    </motion.a>
  )
}
