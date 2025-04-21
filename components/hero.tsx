import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import { motion } from 'framer-motion';
import { Twitter, Linkedin, Github } from 'lucide-react';

const Hero = () => {
  const typedRef = useRef(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Hey, I'm Nashih Amin – Fullstack Developer"],
      typeSpeed: 50,
      backSpeed: 0,
      loop: false,
      showCursor: true,
      cursorChar: '|'
    });

    return () => typed.destroy();
  }, []);

  useEffect(() => {
    if (!particlesRef.current) return;

    const particles = Array.from({ length: 50 }, (_, i) => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-teal-500 rounded-full';
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.opacity = '0.2';
      particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      return particle;
    });

    particles.forEach(particle => particlesRef.current?.appendChild(particle));

    return () => {
      particles.forEach(particle => particle.remove());
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-green-500"
        >
          <span ref={typedRef}></span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
        >
          I craft scalable, user-friendly web apps using cutting-edge tech.
          <br />
          Specializing in React.js, Next.js, and modern full-stack development.
        </motion.p>

        <motion.div variants={itemVariants}>
          <motion.a 
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-gradient-to-r from-teal-500 to-green-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transform transition-all duration-300"
          >
            Let's Build Together
          </motion.a>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex justify-center gap-6 mt-12"
        >
          {[
            { Icon: Twitter, url: 'https://twitter.com/nashihamm', color: 'hover:text-blue-400' },
            { Icon: Linkedin, url: 'https://linkedin.com/nashihamm', color: 'hover:text-blue-600' },
            { Icon: Github, url: 'https://github.com/nashihamm', color: 'hover:text-purple-600' }
          ].map(({ Icon, url, color }, index) => (
            <motion.a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              className={`text-gray-600 dark:text-gray-300 ${color} transition-colors duration-300`}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;