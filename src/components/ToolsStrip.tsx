import { motion } from 'framer-motion'
import {
  AutoCADIcon,
  SketchUpIcon,
  D5Icon,
  TwinmotionIcon,
  PhotoshopIcon,
} from './TechIcons'

type Tool = {
  name: string
  Icon: (props: { size?: number; strokeWidth?: number; className?: string }) => JSX.Element
}

const tools: Tool[] = [
  { name: 'AutoCAD', Icon: AutoCADIcon },
  { name: 'SketchUp', Icon: SketchUpIcon },
  { name: 'D5 Render', Icon: D5Icon },
  { name: 'Twinmotion', Icon: TwinmotionIcon },
  { name: 'Photoshop', Icon: PhotoshopIcon },
]

export default function ToolsStrip() {
  return (
    <section
      aria-label="Herramientas"
      className="section-gutter py-16 md:py-20 border-t border-b border-line"
    >
      <div className="max-content">
        <div className="flex items-center gap-4 mb-12">
          <span className="h-px flex-1 bg-line" />
          <span className="text-[10px] uppercase tracking-[0.25em] text-muted">
            Stack · Software
          </span>
          <span className="h-px flex-1 bg-line" />
        </div>

        <ul className="flex flex-wrap items-start justify-center gap-x-6 gap-y-10 md:gap-x-12">
          {tools.map((tool, i) => {
            const { Icon } = tool
            return (
              <motion.li
                key={tool.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: i * 0.09,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -6 }}
                className="group flex flex-col items-center gap-3 w-28 md:w-32 cursor-default"
              >
                <motion.div
                  className="relative flex items-center justify-center h-16 w-16 md:h-20 md:w-20 border border-line bg-bg/60 backdrop-blur-sm text-ink group-hover:text-accent transition-colors"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon size={32} strokeWidth={3.5} />
                  <motion.span
                    aria-hidden
                    className="absolute -top-1 -right-1 block h-2 w-2 rounded-full bg-accent"
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
                <span className="font-display text-sm md:text-base text-ink text-center">
                  {tool.name}
                </span>
              </motion.li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
