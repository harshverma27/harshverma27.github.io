import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SKILLS = [
  { label: 'GitHub Actions', category: 'Automation', color: '#A8E05F', bg: '/skills/automation.png' },
  { label: 'GitLab CI/CD', category: 'Automation', color: '#34C47C', bg: '/skills/automation.png' },
  { label: 'Kotlin', category: 'Android', color: '#6FE6B0', bg: '/skills/android.png' },
  { label: 'Jetpack Compose', category: 'Android', color: '#A8E05F', bg: '/skills/android.png' },
  { label: 'Raspberry Pi', category: 'Embedded', color: '#34C47C', bg: '/skills/embedded.png' },
  { label: 'PCB Design', category: 'Hardware', color: '#6FE6B0', bg: '/skills/embedded.png' },
  { label: 'Django', category: 'Backend', color: '#A8E05F', bg: '/skills/backend.png' },
  { label: 'Firebase', category: 'Backend', color: '#34C47C', bg: '/skills/backend.png' },
  { label: 'Python', category: 'Programming', color: '#6FE6B0', bg: '/skills/automation.png' },
  { label: 'FFmpeg', category: 'Systems', color: '#A8E05F', bg: '/skills/embedded.png' },
  { label: 'Linux', category: 'Systems', color: '#34C47C', bg: '/skills/embedded.png' },
  { label: 'GTK+', category: 'Desktop', color: '#6FE6B0', bg: '/skills/backend.png' },
]

const COL1 = SKILLS.slice(0, 6)
const COL2 = SKILLS.slice(6, 12)

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      })

      gsap.fromTo(col1Ref.current,
        { y: 0 },
        {
          y: -320,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        }
      )

      gsap.fromTo(col2Ref.current,
        { y: -160 },
        {
          y: 160,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="explorations"
      className="relative section-scrim"
      style={{ minHeight: '300vh' }}
    >
      {/* Pinned center content */}
      <div
        ref={contentRef}
        className="relative z-10 h-screen flex items-center justify-center pointer-events-none"
      >
        <motion.div
          className="text-center px-6 pointer-events-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-text-primary mb-4">
            Tech <em>playground</em>
          </h2>
          <p className="text-sm text-muted max-w-sm mx-auto mb-8">
            Tools, languages, and systems I've explored across embedded, backend, and open-source work.
          </p>
          <motion.a
            id="explore-github-btn"
            href="https://github.com/harshverma27"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm text-muted border border-stroke/80 bg-bg/25 backdrop-blur-sm hover:text-text-primary transition-all duration-300 group relative"
            whileHover={{ scale: 1.03 }}
          >
            <span
              className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, #A8E05F 0%, #34C47C 100%)',
                inset: '-2px',
              }}
            />
            <span className="absolute inset-0 bg-bg/85 rounded-full opacity-0 group-hover:opacity-100" />
            <span className="relative z-10">View GitHub ↗</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Parallax columns */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ paddingTop: '10vh', paddingBottom: '10vh' }}
      >
        <div className="h-full max-w-[1400px] mx-auto px-6 md:px-10 flex">
          {/* Left column */}
          <div className="flex-1 flex justify-start items-start pt-[20vh]">
            <div ref={col1Ref} className="flex flex-col gap-4 pointer-events-auto">
              {COL1.map((skill, i) => (
                <SkillCard key={i} skill={skill} />
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex-1 flex justify-end items-start pt-[40vh]">
            <div ref={col2Ref} className="flex flex-col gap-4 pointer-events-auto">
              {COL2.map((skill, i) => (
                <SkillCard key={i} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface Skill {
  label: string
  category: string
  color: string
  bg: string
}

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <motion.div
      className="relative w-[180px] md:w-[240px] aspect-square max-w-[240px] rounded-3xl overflow-hidden cursor-default group"
      whileHover={{ scale: 1.06, rotate: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Background image */}
      <img
        src={skill.bg}
        alt={skill.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark overlay — heavier at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,0.3) 100%)',
        }}
      />

      {/* Accent colour tint */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-25 transition-opacity duration-500"
        style={{ background: skill.color }}
      />

      {/* Border */}
      <div className="absolute inset-0 rounded-3xl border border-white/8 group-hover:border-white/20 transition-colors duration-300" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-end p-4">
        {/* Category tag */}
        <span
          className="text-xs px-2.5 py-0.5 rounded-full mb-2"
          style={{
            background: `${skill.color}20`,
            color: skill.color,
            border: `1px solid ${skill.color}40`,
            backdropFilter: 'blur(8px)',
          }}
        >
          {skill.category}
        </span>

        {/* Skill name */}
        <h3 className="text-white font-semibold text-base leading-tight drop-shadow-lg">
          {skill.label}
        </h3>

        {/* Accent bar */}
        <div
          className="mt-2 h-0.5 w-6 rounded-full transition-all duration-500 group-hover:w-12"
          style={{ background: `linear-gradient(90deg, ${skill.color} 0%, transparent 100%)` }}
        />
      </div>
    </motion.div>
  )
}
