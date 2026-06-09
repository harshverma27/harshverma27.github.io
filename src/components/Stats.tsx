import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  {
    id: 'stat-files',
    value: '65+',
    label: 'Files Covered',
    sub: 'GIMP test framework',
    accent: '#89AACC',
  },
  {
    id: 'stat-hackathons',
    value: '3',
    label: 'Hackathons',
    sub: 'At NIT Hamirpur',
    accent: '#4E85BF',
  },
  {
    id: 'stat-students',
    value: '2500+',
    label: 'Students Reached',
    sub: 'Via Electrothon events',
    accent: '#6B9FD4',
  },
]

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="stats" className="relative py-16 md:py-24 section-scrim">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } }
          }}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.id}
              id={stat.id}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
              }}
              className="text-center md:text-left group"
            >
              {/* Accent bar */}
              <div
                className="w-12 h-0.5 rounded-full mb-6 mx-auto md:mx-0 transition-all duration-500 group-hover:w-20"
                style={{ background: `linear-gradient(90deg, ${stat.accent} 0%, transparent 100%)` }}
              />

              {/* Value */}
              <div
                className="text-5xl md:text-6xl lg:text-7xl font-display italic mb-3 leading-none"
                style={{ color: stat.accent }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-text-primary font-medium text-lg mb-1">
                {stat.label}
              </div>

              {/* Sub */}
              <div className="text-muted text-sm">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="mt-16 md:mt-24 h-px bg-stroke"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ originX: 0 }}
        />
      </div>
    </section>
  )
}
