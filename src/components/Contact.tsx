import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Hls from 'hls.js'
import gsap from 'gsap'

const HLS_URL = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

const MARQUEE_TEXT = 'OPEN SOURCE • BACKEND • EMBEDDED • GNOME • RASPBERRY PI • AUTOMATION • '

const SOCIAL_LINKS = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/harshverma27' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/harshhvermaa/' },
  { id: 'gitlab', label: 'GitLab', href: 'https://gitlab.gnome.org/harshverma' },
]

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

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

  // GSAP marquee
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <footer id="contact" className="relative pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden section-scrim">
      {/* Background video container */}
      <div className="relative rounded-3xl overflow-hidden mx-6 md:mx-10 lg:mx-16 mb-16 md:mb-24">
        <div className="relative h-64 md:h-80 overflow-hidden">
          {/* Flipped video */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
            style={{ transform: 'translate(-50%, -50%) scaleY(-1)' }}
          />
          {/* Heavy overlay */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />

          {/* CTA content */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
            <motion.p
              className="text-xs text-muted uppercase tracking-[0.3em] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get in touch
            </motion.p>
            <motion.h2
              className="text-3xl md:text-5xl font-display italic text-text-primary mb-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Let's build something
            </motion.h2>
            <motion.a
              id="email-cta-btn"
              href="mailto:harshhvermaa@icloud.com"
              className="group relative rounded-full px-8 py-4 text-sm font-medium text-text-primary border border-stroke hover:border-transparent transition-all duration-300"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span
                className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                  inset: '-2px',
                }}
              />
              <span className="absolute inset-0 bg-bg/80 rounded-full opacity-0 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2">
                harshhvermaa@icloud.com
                <span className="opacity-50 group-hover:opacity-100 transition-opacity">↗</span>
              </span>
            </motion.a>
          </div>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden mb-16 md:mb-20 py-4 border-t border-b border-stroke bg-bg/20 backdrop-blur-sm">
        <div
          ref={marqueeRef}
          className="whitespace-nowrap inline-flex"
          style={{ willChange: 'transform' }}
        >
          {Array(10).fill(MARQUEE_TEXT).map((text, i) => (
            <span
              key={i}
              className="text-muted text-sm md:text-base uppercase tracking-[0.2em] mr-0"
            >
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Footer bar */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Social links */}
          <div className="flex items-center gap-1">
            {SOCIAL_LINKS.map(link => (
              <motion.a
                key={link.id}
                id={`social-${link.id}`}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted hover:text-text-primary transition-colors duration-200 px-3 py-1.5 rounded-full hover:bg-surface/70"
                whileHover={{ y: -1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Available for projects */}
          <div className="flex items-center gap-2">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-pulse-dot" />
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            </div>
            <span className="text-xs text-muted uppercase tracking-[0.2em]">
              Available for projects
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-stroke/50 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs text-muted">
            © 2026 Harsh Verma. All rights reserved.
          </span>
          <span className="text-xs text-muted">
            NIT Hamirpur · EE '28
          </span>
        </div>
      </div>
    </footer>
  )
}
