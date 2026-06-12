import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Hls from 'hls.js'
import gsap from 'gsap'

const HLS_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

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
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,12,10,0.18)_42%,rgba(8,12,10,0.82)_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg/90 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg/50 to-transparent" />
      </div>

      <section
        id="home"
        className="relative z-10 w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
          <p className="blur-in font-mono text-[0.7rem] sm:text-xs text-muted uppercase tracking-[0.32em] mb-8">
            <span className="text-accent-2">●</span> NIT Hamirpur — Electronics &amp; Communication, &rsquo;28
          </p>

          <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-7">
            Harsh Verma
          </h1>

          <p className="blur-in text-base md:text-xl text-muted max-w-xl leading-relaxed mb-8">
            I build real-world systems — from{' '}
            <span className="text-text-primary">embedded firmware</span> and{' '}
            <span className="text-text-primary">backend services</span> to{' '}
            <span className="text-text-primary">open-source tools</span> that actually ship.
          </p>

          {/* Terminal-style "currently" line bridging into the latest project */}
          <a
            href="#works"
            className="blur-in group inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm text-muted hover:text-text-primary mb-11 px-4 py-2 rounded-full border border-stroke/70 bg-bg/30 backdrop-blur-sm transition-colors"
          >
            <span className="text-accent-2">▸</span>
            <span>currently building</span>
            <span className="text-accent-1 font-medium">SparkIDE</span>
            <span className="text-muted/70">— a block-based Arduino IDE</span>
            <span className="text-accent-2 group-hover:translate-x-0.5 transition-transform">↓</span>
          </a>

          <div className="inline-flex gap-4 flex-wrap justify-center">
            <CTAButton id="see-works-btn" href="#works" variant="solid" label="Latest project" />
            <CTAButton id="reach-out-btn" href="mailto:harshkardam246+portfolio@gmail.com" variant="outline" label="Reach out" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-reveal absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono text-[0.65rem] text-muted uppercase tracking-[0.25em]">Scroll</span>
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
          style={{ background: 'linear-gradient(90deg, hsl(var(--accent-1)) 0%, hsl(var(--accent-2)) 100%)' }}
        />
      )}
      {hovered && variant === 'solid' && (
        <span className="absolute inset-0 rounded-full -z-[5]" style={{ background: 'hsl(var(--bg))' }} />
      )}
      {label}
    </motion.a>
  )
}
