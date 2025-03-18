"use client"

import { Project } from "@/types/project"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { ChevronLeft, ChevronRight, X, ExternalLink, Github, Play, ImageIcon, Info, LineChart, Clock } from "lucide-react"

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  if (!project) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === project.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.images.length - 1 : prev - 1
    )
  }

  const imageCount = project.images.length
  const imageIndicators = Array.from({ length: imageCount }, (_, i) => i)

  return (
    <Dialog open={!!project} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-6xl w-full bg-background p-0 overflow-hidden">
        <div className="flex flex-col lg:flex-row h-[90vh]">
          {/* Left Panel - Media */}
          <div className="lg:w-3/5 h-full relative">
            <Tabs defaultValue="gallery" className="h-full">
              <TabsList className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm">
                <TabsTrigger value="gallery" className="data-[state=active]:bg-primary">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Gallery
                </TabsTrigger>
                {project.video && (
                  <TabsTrigger value="video" className="data-[state=active]:bg-primary">
                    <Play className="w-4 h-4 mr-2" />
                    Demo
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="gallery" className="h-full m-0">
                <div className="relative h-full">
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="relative h-full"
                    >
                      <Image
                        src={project.images[currentImageIndex]}
                        alt={`${project.title} preview ${currentImageIndex + 1}`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {imageIndicators.map((index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImageIndex === index
                            ? "bg-primary w-4"
                            : "bg-white/50 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>

              {project.video && (
                <TabsContent value="video" className="h-full m-0">
                  <div className="relative h-full">
                    <iframe
                      src={`${project.video}${isVideoPlaying ? '?autoplay=1' : ''}`}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </TabsContent>
              )}
            </Tabs>

            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-30 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Right Panel - Content */}
          <div className="lg:w-2/5 h-full overflow-y-auto p-6 border-l">
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold">{project.title}</h2>
                <p className="text-muted-foreground mt-2">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project.stats && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <LineChart className="w-5 h-5" />
                    <h3 className="font-semibold">Key Metrics</h3>
                  </div>
                  <p className="text-muted-foreground">{project.stats}</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <Info className="w-5 h-5" />
                    <h3 className="font-semibold">Project Details</h3>
                  </div>
                  <div className="grid gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Challenges</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {project.challenges.map((challenge, index) => (
                          <li key={index}>{challenge}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Solutions</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {project.solutions.map((solution, index) => (
                          <li key={index}>{solution}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Impact</h4>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {project.impact.map((impact, index) => (
                          <li key={index}>{impact}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}