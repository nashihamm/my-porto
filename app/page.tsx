"use client"

import { motion } from 'framer-motion'
import { Tilt } from 'react-tilt'
import Image from 'next/image'
// import { CustomCursor } from '@/components/custom-cursor'
import { ProjectModal } from '@/components/project-modal'
import { useState } from 'react'
import { Project } from '@/types/project'
import { projects, stats } from '@/lib/data'
import Hero from '@/components/hero'


export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">      
     <Hero />

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-8 bg-primary/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Tilt
              key={index}
              options={{
                max: 25,
                scale: 1.05,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card rounded-xl p-6 h-full cursor-pointer hover:bg-primary/5 transition-colors"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.stats && (
                  <p className="text-sm text-muted-foreground">
                    {project.stats}
                  </p>
                )}
              </motion.div>
            </Tilt>
          ))}
        </div>
      </section>

     

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  )
}

