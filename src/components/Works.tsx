import { motion } from 'framer-motion'

const PROJECTS = [
  {
    id: 'nucleus',
    title: 'Nucleus',
    desc: 'A CLI-first STM32 toolchain in Rust. Swaps a 3 GB Eclipse IDE for a ~10 MB binary and one version-controlled stm32.toml.',
    tag: 'Rust · QEMU · OpenOCD',
    links: [
      { label: 'v0.2.0', href: 'https://github.com/harshverma27/nucleus/releases/tag/v0.2.0' },
      { label: 'demo', href: 'https://youtu.be/8zDZzE12wec' },
    ],
    github: 'https://github.com/harshverma27/nucleus',
  },
  {
    id: 'sparkide',
    title: 'SparkIDE',
    desc: 'Block-based Arduino IDE for Linux. Drag blocks, watch the C++ appear, flash in one click.',
    tag: 'Python · PyQt6 · Blockly',
    links: [{ label: 'v1.0.0', href: 'https://github.com/harshverma27/SparkIDE/releases/tag/v1.0.0' }],
    github: 'https://github.com/harshverma27/SparkIDE',
  },
  {
    id: 'kissan',
    title: 'Kissan Connect',
    desc: 'Android marketplace that connects farmers directly to buyers.',
    tag: 'Kotlin · Jetpack Compose · Django',
    links: [],
    github: 'https://github.com/harshverma27/Kissan-Connect',
  },
]

export default function Works() {
  return (
    <section id="works" className="relative py-16 md:py-24 section-scrim">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="flex items-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-accent-2 font-mono text-sm">▸</span>
          <span className="font-mono text-xs text-muted uppercase tracking-[0.3em]">Projects</span>
          <div className="flex-1 h-px bg-stroke/70" />
          <a
            href="https://github.com/harshverma27"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted hover:text-text-primary transition-colors"
          >
            all repos ↗
          </a>
        </motion.div>

        <div className="border-t border-stroke/60">
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              id={`project-${p.id}`}
              className="grid md:grid-cols-[14rem_1fr_auto] gap-x-8 gap-y-2 py-6 md:py-7 border-b border-stroke/60"
            >
              <h3 className="text-2xl md:text-3xl font-display">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-text-primary hover:text-accent-1 transition-colors"
                >
                  {p.title} <span className="text-muted text-lg">↗</span>
                </a>
              </h3>
              <div>
                <p className="text-sm text-text-primary/80 leading-relaxed max-w-xl mb-2">{p.desc}</p>
                <span className="font-mono text-xs text-muted">{p.tag}</span>
              </div>
              <div className="flex md:flex-col gap-4 md:gap-2 md:items-end">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs text-muted hover:text-accent-1 transition-colors"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
