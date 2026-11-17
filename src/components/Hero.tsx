import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function Hero() {
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
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-black" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/hero.mp4"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <section
        id="home"
        className="relative z-10 w-full h-screen min-h-[640px] flex items-center justify-center overflow-hidden"
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto [text-shadow:0_0_6px_rgba(0,0,0,0.65),0_2px_28px_rgba(0,0,0,0.9)]">
          <p className="blur-in font-mono text-[0.7rem] sm:text-xs text-white/85 uppercase tracking-[0.32em] mb-8">
            <span className="text-accent-2">●</span> NIT Hamirpur — Electrical Engineering, &rsquo;28
          </p>

          <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-7">
            Harsh Verma
          </h1>

          <p className="blur-in text-base md:text-xl text-white/85 max-w-xl leading-relaxed mb-8">
            I build test infrastructure for open source:{' '}
            <span className="text-text-primary">GIMP's first UI tests</span>,{' '}
            <span className="text-text-primary">dogtail's hermetic sessions</span>, and{' '}
            <span className="text-text-primary">two CVE fixes</span> along the way.
          </p>

          {/* Terminal-style "currently" line bridging into the open source section */}
          <a
            href="#floss"
            className="blur-in group inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm text-muted hover:text-text-primary mb-11 px-4 py-2 rounded-full border border-stroke/70 bg-bg/30 backdrop-blur-sm transition-colors"
          >
            <span className="text-accent-2">▸</span>
            <span className="whitespace-nowrap"><span className="hidden sm:inline">currently </span>contributing to</span>
            <span className="text-accent-1 font-medium whitespace-nowrap">GIMP &amp; dogtail</span>
            <span className="text-accent-2 group-hover:translate-x-0.5 transition-transform">↓</span>
          </a>

          <div className="inline-flex gap-4 flex-wrap justify-center">
            <CTAButton id="see-works-btn" href="#floss" variant="solid" label="See open source work" />
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
