import { motion } from 'framer-motion'

// SPEC (Society for Promotion of Electronics Culture), newest role first.
const SPEC = [
  {
    role: 'Technical Lead',
    when: "Aug '26 – now",
    events: [{ name: 'Breakout Brigade 5.0', text: 'Led a hands-on hardware workshop for 300+ freshers.' }],
  },
  {
    role: 'Executive',
    when: "Aug '25 – May '26",
    events: [
      { name: 'Electrothon 8.0', text: 'Ran an MLH-backed hackathon for 500+ students from several colleges.' },
      { name: 'Breakout Brigade 4.0', text: 'Directed a workshop for 120+ students, rated the best of the four.' },
    ],
  },
  {
    role: 'Volunteer',
    when: "Sep '24 – May '25",
    events: [{ name: 'Electrothon 7.0', text: 'Organised an MLH-backed hackathon with 2,500+ registrations.' }],
  },
]

const HACKATHONS = [
  { name: 'HackSecure', text: 'Android app with an on-device VPN to measure every byte entering and leaving the phone.' },
  { name: 'Rekkathon', text: 'Portable network-security box: ad blocking over private DNS, attack detection, fire and smoke sensing.' },
  { name: 'Hack 5.0', text: 'Chrome extension that turns live sign language into English text.' },
]

export default function Community() {
  return (
    <section id="community" className="relative py-16 md:py-24 section-scrim">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="flex items-center gap-3 mb-10 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-accent-2 font-mono text-sm">▸</span>
          <span className="font-mono text-xs text-muted uppercase tracking-[0.3em]">Beyond code</span>
          <div className="flex-1 h-px bg-stroke/70" />
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-16">
          {/* SPEC timeline */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display text-text-primary mb-2">SPEC, NIT Hamirpur</h2>
            <p className="text-sm text-muted mb-8">The college electronics society. Three years, three roles.</p>
            <ol className="relative border-l border-stroke/80 ml-1.5 space-y-9">
              {SPEC.map((s) => (
                <li key={s.role} className="pl-7 relative">
                  <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-accent-2" />
                  <div className="flex flex-wrap items-baseline gap-x-3 mb-3">
                    <h3 className="font-display text-2xl text-text-primary">{s.role}</h3>
                    <span className="font-mono text-xs text-muted">{s.when}</span>
                  </div>
                  <ul className="space-y-2">
                    {s.events.map((e) => (
                      <li key={e.name} className="text-sm text-muted leading-relaxed">
                        <span className="text-text-primary/90">{e.name}.</span> {e.text}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>

          {/* Patent + hackathons */}
          <div className="space-y-12">
            <div className="rounded-2xl border border-stroke bg-[#080b09]/80 p-6 md:p-7">
              <div className="flex items-baseline justify-between gap-4 mb-4">
                <span className="font-mono text-sm text-accent-1">IN202611081064 A1</span>
                <span className="font-mono text-xs text-muted">Aug 2026</span>
              </div>
              <h3 className="font-display text-2xl text-text-primary mb-2">Patent, co-inventor</h3>
              <p className="text-sm text-muted leading-relaxed">
                A router attachment that watches network traffic and the room it sits in. It
                blocks suspicious domains and traffic spikes, senses smoke, flame and heat, and
                alerts the owner. Filed by NIT Hamirpur, published August 2026.
              </p>
            </div>

            <div>
              <h3 className="font-display text-2xl text-text-primary mb-4">Hackathons</h3>
              <ul className="border-t border-stroke/60">
                {HACKATHONS.map((h) => (
                  <li key={h.name} className="py-4 border-b border-stroke/60 text-sm leading-relaxed">
                    <span className="text-text-primary/90">{h.name}.</span>{' '}
                    <span className="text-muted">{h.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
