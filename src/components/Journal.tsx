import { motion } from 'framer-motion'

const POSTS = [
  {
    id: 'post-gnome',
    href: 'https://www.linkedin.com/posts/harshhvermaa_opensource-gnome-embeddedsystems-share-7465797068750729217-l-5w/',
    tag: '#OpenSource #GNOME #EmbeddedSystems',
    title: 'Going deep instead of wide — GNOME, Embedded & the hard path',
    excerpt: 'From the past 3-4 weeks, I am watching everyone post about joining IIT research internships, startups, and web/AI dev roles this summer. I did something different… I plan to spend these weeks going deep into Embedded Systems, RTOS, and Linux Kernel Development.',
    date: 'May 28, 2026',
    likes: 100,
    comments: 7,
    accent: '#A8E05F',
    emoji: '🔩',
  },
  {
    id: 'post-oracle',
    href: 'https://www.linkedin.com/posts/harshhvermaa_whats-with-oracle-and-other-companies-laying-share-7467172127524302848-iA2M/',
    tag: '#TechLayoffs #CorporateWorld',
    title: "What's with Oracle and other companies laying off interns?",
    excerpt: "Every now and then I am seeing a post where an Oracle intern got laid off, and was denied the job offer. I still have around 2 years till I enter the job world, but I'm already terrified. The interns getting laid off aren't normal students — >8.5 CGPA, 1000+ DSA problems, previous GSoC experience.",
    date: 'Jun 4, 2026',
    likes: 420,
    comments: 5,
    accent: '#F59E0B',
    emoji: '💭',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
}

export default function Journal() {
  return (
    <section id="journal" className="relative py-16 md:py-24 section-scrim">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex items-start justify-between mb-10 md:mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display text-text-primary mb-3">
              Recent <em>thoughts</em>
            </h2>
            <p className="text-sm text-muted max-w-md">
              Notes and reflections posted on LinkedIn — raw thoughts from the journey.
            </p>
          </div>

          <motion.a
            id="view-all-journal-btn"
            href="https://www.linkedin.com/in/harshhvermaa/"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-muted hover:text-text-primary border border-stroke/80 bg-bg/25 backdrop-blur-sm hover:border-transparent transition-all duration-300 group relative"
            whileHover={{ scale: 1.03 }}
          >
            <span
              className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(90deg, #A8E05F 0%, #34C47C 100%)',
                inset: '-2px',
              }}
            />
            <span className="absolute inset-0 bg-bg/85 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">View LinkedIn</span>
            <span className="relative z-10 group-hover:translate-x-0.5 transition-transform">→</span>
          </motion.a>
        </motion.div>

        {/* LinkedIn posts as large cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {POSTS.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <PostCard post={post} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

interface Post {
  id: string
  href: string
  tag: string
  title: string
  excerpt: string
  date: string
  likes: number
  comments: number
  accent: string
  emoji: string
}

function PostCard({ post }: { post: Post }) {
  return (
    <motion.a
      id={post.id}
      href={post.href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col p-6 md:p-7 bg-surface/72 border border-stroke/80 rounded-3xl cursor-pointer hover:border-white/10 transition-all duration-300 shadow-2xl shadow-black/20 backdrop-blur-md"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-5">
        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src="/avatar.png"
              alt="Harsh Verma"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary">Harsh Verma</div>
            <div className="text-xs text-muted">{post.date}</div>
          </div>
        </div>

        {/* LinkedIn logo */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 opacity-40 group-hover:opacity-80 transition-opacity"
          style={{ background: '#0A66C2' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>
      </div>

      {/* Tag */}
      <div className="mb-3">
        <span
          className="text-xs px-3 py-1 rounded-full"
          style={{
            background: `${post.accent}15`,
            color: post.accent,
            border: `1px solid ${post.accent}25`,
          }}
        >
          {post.emoji} {post.tag}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-text-primary font-semibold text-base md:text-lg leading-snug mb-3 group-hover:text-white transition-colors">
        {post.title}
      </h3>

      {/* Excerpt */}
      <p className="text-muted text-sm leading-relaxed line-clamp-3 flex-1 mb-6">
        {post.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-stroke/50">
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
              <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            {post.likes}
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {post.comments}
          </span>
        </div>
        <div
          className="text-xs flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
          style={{ color: post.accent }}
        >
          Read on LinkedIn ↗
        </div>
      </div>
    </motion.a>
  )
}
