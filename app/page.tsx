'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronRight, MessageSquare, Github, Check, Building2, Rocket, Users, Sparkles } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Define spring configuration
const springConfig = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

// Enhanced animation variants
const zoomInVariant = {
  initial: { 
    scale: 0.95,
    opacity: 0
  },
  animate: { 
    scale: 1,
    opacity: 1,
    transition: springConfig
  }
}

const slideUpVariant = {
  initial: { 
    y: 100,
    opacity: 0
  },
  animate: { 
    y: 0,
    opacity: 1,
    transition: springConfig
  }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.3
    }
  }
}

export default function Page() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  
  // Add TypeWriter related state
  const [currentWord, setCurrentWord] = useState('Projects');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsContactOpen(true);
  };

  // Scroll behavior effect
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  // TypeWriter effect
  useEffect(() => {
    const words = ['Projects', 'Ideas', 'MVPs', 'Apps'];
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (currentWord === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentWord(prev => prev.slice(0, -1));
        }, 50);
      }
    } else {
      const nextWord = words[wordIndex];
      if (currentWord === nextWord) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timeout = setTimeout(() => {
          setCurrentWord(nextWord.slice(0, currentWord.length + 1));
        }, 100);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [currentWord, isDeleting, wordIndex]);

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
      `}</style>
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={springConfig}
        className="fixed top-0 w-full bg-[rgb(0,0,0)] backdrop-blur-sm border-b border-gray-800/50 z-50"
        layout
      >
        <motion.nav 
          className="container mx-auto px-4 py-2"
          layout
          transition={springConfig}
        >
          <div className="flex justify-between items-center">
            <Link href="/" className="relative w-40 h-16 -mt-1 -mb-1">
              <Image
                src="/logo-2.png"
                alt="Sollvr Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <div className="space-x-8">
              <Link href="/#projects" className="text-gray-300 hover:text-purple-400 font-medium">Projects</Link>
              <Link href="/#pricing" className="text-gray-300 hover:text-purple-400 font-medium">Pricing</Link>
              <Link href="/#contact" className="text-gray-300 hover:text-purple-400 font-medium">Contact</Link>
            </div>
          </div>
        </motion.nav>
      </motion.header>

      <main className="pt-16 bg-black min-h-screen">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-black py-40"
        >
          {/* Purple glow effects with initial state */}
          <motion.div 
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[128px] -translate-x-1/2 -translate-y-1/2" 
          />
          <motion.div 
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CCFF00]/20 rounded-full blur-[128px] translate-x-1/2 -translate-y-1/2" 
          />
          <motion.div 
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[128px] -translate-x-1/2 translate-y-1/2" 
          />
          
          {/* Grid overlay with smoother initial state */}
          <motion.div 
            initial={{ opacity: 0.02, scale: 1.1 }}
            animate={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"
          />
          
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_70%)]" />
          
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="container mx-auto px-4 relative"
          >
            <motion.div 
              variants={zoomInVariant}
              className="max-w-6xl mx-auto text-center"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 mb-6 border border-white/10"
              >
                <span className="bg-[#CCFF00] text-black text-xs font-bold px-2 py-0.5 rounded-full">NEW</span>
                <span className="text-gray-400 text-sm">We&apos;ve just released new features</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-roboto text-7xl font-medium text-white text-glow mb-6 tracking-tight max-w-5xl mx-auto"
              >
                Empowering Your Startup with <br />
                <span className="relative inline-block">
                Rapid MVP Development
                  <motion.span 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                    className="absolute -bottom-2 left-0 w-full h-2 bg-[#CCFF00]/50 origin-left"
                  />
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto"
              >
                We turn your ideas into reality. Fast, efficient, and tailored for startups without in-house developers.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="flex items-center justify-center gap-4"
              >
                <Button 
                  size="lg" 
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#CCFF00] hover:bg-[#CCFF00]/90 text-black border-none transition-all h-12 px-8 font-medium"
                >
                  Book A Free Demo <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Info Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-150px" }}
          className="py-32 bg-black"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <span className="text-sm text-gray-400 mb-4 block">Built-in Useful Features</span>
              <h2 className="font-roboto text-5xl text-glow mb-6 text-white">
                Simplify Your Workflow<br />
                With Our Powerful Tools
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Explore the advanced tools designed to streamline your processes,
                enhance productivity, and drive business growth effectively
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-6xl mx-auto">
              {/* First Feature - Rapid Prototyping */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="bg-[#12121A] rounded-3xl p-8 relative overflow-hidden group md:col-span-1"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-xl w-full h-[300px] bg-[#1C1C25] relative overflow-hidden"
                >
                  <Image
                    src="/feature-real-1.jpg"
                    alt="Rapid Prototyping"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center"
                    >
                      <div className="w-12 h-12 bg-purple-600/40 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-purple-600 rounded-full" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex flex-col justify-center md:col-span-1"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center mb-6"
                >
                  <span className="text-2xl">🚀</span>
                </motion.div>
                <motion.h3 
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl font-medium text-glow text-white mb-4"
                >
                  Rapid<br />Prototyping
                </motion.h3>
                <motion.p 
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="text-gray-400 text-lg mb-8"
                >
                  We quickly turn your ideas into functional prototypes, allowing for early testing and validation.
                </motion.p>
              </motion.div>

              {/* Second Feature - Agile Development */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex flex-col justify-center md:col-span-1 md:col-start-1 md:row-start-2"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-[#CCFF00]/10 rounded-xl flex items-center justify-center mb-6"
                >
                  <span className="text-2xl">🔄</span>
                </motion.div>
                <motion.h3 
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl font-medium text-glow text-white mb-4"
                >
                  Agile<br />Development
                </motion.h3>
                <motion.p 
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="text-gray-400 text-lg mb-8"
                >
                  Our iterative approach ensures flexibility and allows for continuous improvement based on feedback.
                </motion.p>
              </motion.div>

              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="bg-[#12121A] rounded-3xl p-8 relative overflow-hidden group md:col-span-1 md:col-start-2 md:row-start-2"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-xl w-full h-[300px] bg-[#1C1C25] relative overflow-hidden"
                >
                  <Image
                    src="/feature2-2.jpeg"
                    alt="Agile Development"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="w-16 h-16 bg-[#CCFF00]/20 rounded-full flex items-center justify-center"
                    >
                      <div className="w-12 h-12 bg-[#CCFF00]/40 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#CCFF00] rounded-full" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Third Feature - Scalable Solutions */}
              <motion.div 
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="bg-[#12121A] rounded-3xl p-8 relative overflow-hidden group md:col-span-1 md:col-start-1 md:row-start-3"
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="rounded-xl w-full h-[300px] bg-[#1C1C25] relative overflow-hidden"
                >
                  <Image
                    src="/feature3.jpeg"
                    alt="Scalable Solutions"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center"
                    >
                      <div className="w-12 h-12 bg-green-500/40 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-green-500 rounded-full" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="flex flex-col justify-center md:col-span-1 md:col-start-2 md:row-start-3"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6"
                >
                  <span className="text-2xl">📈</span>
                </motion.div>
                <motion.h3 
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-3xl font-medium text-glow text-white mb-4"
                >
                  Scalable<br />Solutions
                </motion.h3>
                <motion.p 
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="text-gray-400 text-lg mb-8"
                >
                  We build with growth in mind, ensuring your MVP can evolve into a full-fledged product.
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-150px" }}
          className="py-32 bg-black"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={zoomInVariant}
              className="text-center mb-16"
            >
              <span className="text-sm text-gray-400 mb-4 block">Our Projects</span>
              <h2 className="text-5xl font-bold text-glow mb-4 text-white">
                Few <span className="text-purple-500">Projects</span> We&apos;ve Built
              </h2>
              <p className="text-xl text-gray-400">
                Here are some of the solutions we have launched successfully
              </p>
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto"
            >
              <motion.div 
                variants={zoomInVariant}
                whileHover={{ 
                  scale: 1.02,
                  transition: springConfig
                }}
                layout
                transition={{ ...springConfig, layout: { duration: 0.3 } }}
                className="shine-effect"
              >
                <div className="bg-[#12121A] rounded-3xl overflow-hidden p-8 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex gap-2 mb-6">
                      {["AI", "EdTech", "Study Companion", "Material Analysis"].map((tag, index) => (
                        <span key={index} className="bg-purple-600/10 text-purple-400 text-sm px-4 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold text-glow text-white mb-4">AI Quiz Generator</h3>
                    <p className="text-gray-400 mb-8 text-lg">
                      An intelligent quiz generation system that creates custom quizzes based on your content. Perfect for educators and training platforms.
                    </p>
                    <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden bg-[#1C1C25]">
                      <Image 
                        src="/ai-quiz-gen.png" 
                        alt="AI Quiz Generator" 
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {["Next.js", "OpenAI", "TailwindCSS", "TypeScript"].map((tech, index) => (
                        <span key={index} className="bg-purple-600/10 text-purple-400 text-sm font-medium px-4 py-1.5 rounded-full border border-purple-600/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <Link href="https://quizai.sollvr.com" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white h-12 px-6">
                          View Live Demo
                        </Button>
                      </Link>
                      <Link href="#" className="text-gray-500 hover:text-gray-400 transition-colors">
                        <Github className="h-6 w-6" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={zoomInVariant}
                whileHover={{ 
                  scale: 1.02,
                  transition: springConfig
                }}
                layout
                transition={{ ...springConfig, layout: { duration: 0.3 } }}
                className="shine-effect"
              >
                <div className="bg-[#12121A] rounded-3xl overflow-hidden p-8 relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex gap-2 mb-6">
                      {["Web App", "Image Processing", "Data-Scraping", "AI"].map((tag, index) => (
                        <span key={index} className="bg-[#CCFF00]/10 text-[#CCFF00] text-sm px-4 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold text-glow text-white mb-4">Data from Image</h3>
                    <p className="text-gray-400 mb-8 text-lg">
                      Extract valuable data from images using advanced OCR and AI. Transform visual information into structured data effortlessly.
                    </p>
                    <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden bg-[#1C1C25]">
                      <Image 
                        src="/datafromimg-img.png" 
                        alt="Data from Image" 
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {["React", "TensorFlow", "Python", "Next.js"].map((tech, index) => (
                        <span key={index} className="bg-[#CCFF00]/10 text-[#CCFF00] text-sm font-medium px-4 py-1.5 rounded-full border border-[#CCFF00]/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center">
                      <Link href="https://datafromimage.sollvr.com" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-[#CCFF00]/20 hover:bg-[#CCFF00]/30 text-white h-12 px-6">
                          View Live Demo
                        </Button>
                      </Link>
                      <Link href="#" className="text-gray-500 hover:text-gray-400 transition-colors">
                        <Github className="h-6 w-6" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section 
          id="pricing"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-150px" }}
          className="py-32 bg-black relative overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src="/banner-bg.png"
              alt="Background Pattern"
              fill
              className="object-cover opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <motion.div variants={slideUpVariant} className="text-center mb-16">
              <h2 className="text-5xl font-bold text-glow mb-4 text-white">
                Ready to <span className="text-purple-500">BUILD</span> ?
              </h2>
              <p className="text-xl text-gray-400">Choose the perfect package for your project</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              <motion.div 
                variants={zoomInVariant}
                whileHover={{ 
                  scale: 1.02,
                  transition: springConfig
                }}
                layout
                transition={{ ...springConfig, layout: { duration: 0.3 } }}
                className="shine-effect"
              >
                <div className="bg-[#12121A] rounded-3xl p-8 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <span className="inline-block bg-purple-600 text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
                      Most Popular
                    </span>
                    <h3 className="text-2xl font-bold text-glow text-white mb-4">MVP Development Package</h3>
                    <p className="text-gray-400 mb-6">One time</p>
                    <div className="text-4xl font-bold text-glow text-white mb-8">Starting at $599</div>
                    <button 
                      onClick={() => handlePackageSelect('MVP Development')}
                      className="w-full bg-purple-600 text-white hover:bg-purple-700 h-12 mb-8 rounded-md"
                    >
                      Get Started Now →
                    </button>
                    <div>
                      <p className="font-medium mb-8 text-yellow-500">Completion time: As short as 2 weeks.</p>
                      <p className="font-medium mb-4 text-white">What&apos;s Included:</p>
                      <ul className="space-y-4">
                        {[
                          "Complete MVP development in 2 weeks",
                          "Web application",
                          "Modern, scalable tech stack",
                          "Seamless integrations (payments, auth, etc.)",
                          "Personalized, founder-led development",
                        ].map((feature, index) => (
                          <motion.li 
                            key={index}
                            variants={{
                              initial: { opacity: 0, x: -20 },
                              animate: { opacity: 1, x: 0 }
                            }}
                            className="flex items-start gap-3"
                          >
                            <Check className="h-5 w-5 mt-0.5 text-purple-500" />
                            <span className="text-gray-400">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={zoomInVariant}
                whileHover={{ 
                  scale: 1.02,
                  transition: springConfig
                }}
                layout
                transition={{ ...springConfig, layout: { duration: 0.3 } }}
                className="shine-effect"
              >
                <div className="bg-[#12121A] rounded-3xl p-8 text-center relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <span className="inline-block bg-[#CCFF00]/20 text-[#CCFF00] text-sm font-medium px-4 py-1 rounded-full mb-6">
                      DevOps Included
                    </span>
                    <h3 className="text-2xl font-bold text-glow text-white mb-4">Growth Package</h3>
                    <p className="text-gray-400 mb-6">One time</p>
                    <div className="text-4xl font-bold text-glow text-white mb-8">Starting at $997</div>
                    <button 
                      onClick={() => handlePackageSelect('Growth Retainer')}
                      className="w-full bg-[#CCFF00]/20 text-white hover:bg-[#CCFF00]/30 h-12 mb-8 rounded-md"
                    >
                      Schedule a Call →
                    </button>
                    <div>
                      <p className="font-medium mb-8 text-yellow-500">Completion time: As short as 1 week.</p>
                      <p className="font-medium mb-4 text-white">What&apos;s Included:</p>
                        <ul className="space-y-4">
                        {[
                          "Complete MVP development in 1-2 weeks",
                          "Flexible hours allocation",
                          "Frequent strategy calls",
                          "Priority feature development",
                          "DevOps Included"
                        ].map((feature, index) => (
                          <motion.li 
                            key={index}
                            variants={{
                              initial: { opacity: 0, x: -20 },
                              animate: { opacity: 1, x: 0 }
                            }}
                            className="flex items-start gap-3"
                          >
                            <Check className="h-5 w-5 mt-0.5 text-[#CCFF00]" />
                            <span className="text-gray-400">{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Contact Dialog */}
        <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Get Started with {selectedPackage}</DialogTitle>
              <DialogDescription>
                Fill out the form below and we&apos;ll get back to you with more information about the {selectedPackage} package.
              </DialogDescription>
            </DialogHeader>
            <ContactForm selectedPackage={selectedPackage} />
          </DialogContent>
        </Dialog>

        {/* About Dialog */}
        <Dialog open={isAboutOpen} onOpenChange={setIsAboutOpen}>
          <DialogContent className="sm:max-w-[600px] bg-gradient-to-br from-white to-gray-50 DialogContent">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2 text-[rgb(0,74,172)]">
                <Building2 className="h-6 w-6" />
                We are Sollvr
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                <div className="space-y-6 mt-4">
                  <p className="text-base leading-relaxed">
                    At Sollvr, we transform innovative ideas into market-ready solutions with lightning speed. 
                    Our passion lies in helping startups and entrepreneurs bring their visions to life through 
                    cutting-edge technology and efficient development practices.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                    <motion.div 
                      className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 about-card"
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={springConfig}
                      whileHover={{
                        y: -5,
                        transition: springConfig
                      }}
                    >
                      <Rocket className="h-6 w-6 text-[rgb(0,74,172)] mb-2" />
                      <h3 className="font-semibold text-gray-900 mb-1">Fast Delivery</h3>
                      <p className="text-sm text-gray-600">From concept to launch in weeks, not months</p>
                    </motion.div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 about-card">
                      <Users className="h-6 w-6 text-[rgb(0,74,172)] mb-2" />
                      <h3 className="font-semibold text-gray-900 mb-1">Expert Team</h3>
                      <p className="text-sm text-gray-600">Dedicated developers and designers</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 about-card">
                      <Sparkles className="h-6 w-6 text-[rgb(0,74,172)] mb-2" />
                      <h3 className="font-semibold text-gray-900 mb-1">Quality First</h3>
                      <p className="text-sm text-gray-600">Modern, scalable, and maintainable code</p>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed">
                    Our approach combines technical expertise with a deep understanding of startup needs. 
                    We specialize in building MVPs that not only validate your ideas but also provide a 
                    solid foundation for growth. With Sollvr, you&apos;re not just getting developers – 
                    you&apos;re partnering with a team that&apos;s invested in your success.
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
          <DialogContent className="bg-[#12121A] border border-gray-800">
            <DialogHeader>
              <DialogTitle className="text-2xl font-medium text-white">Success!</DialogTitle>
              <DialogDescription className="text-gray-400 text-lg">
                Your Request has been received! We will get back to you soon!
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={() => setIsSuccessDialogOpen(false)}
                className="bg-white hover:bg-gray-100 text-black font-medium"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Contact Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-150px" }}
          id="contact" 
          className="py-32 bg-black relative overflow-hidden"
        >
          {/* Purple glow effects */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] -translate-x-1/2 -translate-y-1/2" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CCFF00]/10 rounded-full blur-[128px] translate-x-1/2 -translate-y-1/2" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] -translate-x-1/2 translate-y-1/2" 
          />

          {/* Grid overlay */}
          <motion.div 
            initial={{ opacity: 0.02, scale: 1.1 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"
          />

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_70%)]" />

          <div className="container mx-auto px-4 relative">
            <motion.div variants={zoomInVariant} className="text-center mb-16">
              <h2 className="font-roboto text-5xl font-medium text-glow text-white mb-4">
                Contact
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Contact Sales Form */}
              <motion.div variants={zoomInVariant} className="bg-[#12121A]/80 backdrop-blur-sm rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-[#CCFF00]/10 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-[#CCFF00]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-glow text-white mb-2">Contact sales</h3>
                      <p className="text-gray-400">Talk to our team about your enterprise needs.</p>
                    </div>
                  </div>

                  <form className="space-y-4" onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const data = {
                      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                      email: formData.get('email'),
                      company: formData.get('company'),
                      message: formData.get('message'),
                      jobTitle: formData.get('jobTitle'),
                      phone: formData.get('phone'),
                      country: formData.get('country')
                    };

                    try {
                      await fetch('/api/contact', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                      });

                      setIsSuccessDialogOpen(true);
                      form.reset();
                      
                    } catch (error) {
                      if (error instanceof TypeError && error.message === 'Failed to fetch') {
                        alert('Network error. Please check your connection and try again.');
                      } else {
                        setIsSuccessDialogOpen(true);
                        form.reset();
                      }
                      console.error('Error:', error);
                    }
                  }}>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">First Name</label>
                        <input 
                          type="text"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 bg-[#1C1C25] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#CCFF00]/50"
                          placeholder="Jonathan"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Last Name</label>
                        <input 
                          type="text"
                          name="lastName"
                          required
                          className="w-full px-4 py-3 bg-[#1C1C25] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#CCFF00]/50"
                          placeholder="Jones"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Company</label>
                        <input 
                          type="text"
                          name="company"
                          required
                          className="w-full px-4 py-3 bg-[#1C1C25] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#CCFF00]/50"
                          placeholder="Sollvr"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Job Title</label>
                        <input 
                          type="text"
                          name="jobTitle"
                          required
                          className="w-full px-4 py-3 bg-[#1C1C25] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#CCFF00]/50"
                          placeholder="Head of Design"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Phone</label>
                        <input 
                          type="tel"
                          name="phone"
                          required
                          className="w-full px-4 py-3 bg-[#1C1C25] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#CCFF00]/50"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-1 block">Country</label>
                        <input 
                          type="text"
                          name="country"
                          required
                          className="w-full px-4 py-3 bg-[#1C1C25] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#CCFF00]/50"
                          placeholder="United States"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">Company Email</label>
                      <input 
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-[#1C1C25] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#CCFF00]/50"
                        placeholder="jonathan@sollvr.com"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 mb-1 block">How can we help?</label>
                      <textarea 
                        name="message"
                        required
                        className="w-full px-4 py-3 bg-[#1C1C25] border border-gray-800 rounded-lg text-white focus:outline-none focus:border-[#CCFF00]/50 min-h-[120px]"
                        placeholder="Tell us more about your enterprise needs."
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-white hover:bg-gray-100 text-black font-medium py-3 rounded-lg transition-colors"
                    >
                      Contact sales
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Support Options */}
              <div className="space-y-4">
                <motion.div variants={zoomInVariant} className="bg-[#12121A]/80 backdrop-blur-sm rounded-3xl p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 bg-purple-600/10 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-medium text-glow text-white mb-2">Community support</h3>
                        <p className="text-gray-400">Get help with your project from the community.</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-start gap-4">
                      {/* Social Media Links */}
                      <Link 
                        href="https://linkedin.com/company/sollvr" 
                        target="_blank"
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      </Link>
                      <Link 
                        href="https://x.com/Sollvrofficial" 
                        target="_blank"
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="X (Twitter)"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      </Link>
                      <Link 
                        href="https://www.tiktok.com/@sollvrofficial?lang=en" 
                        target="_blank"
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="TikTok"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                      </Link>
                      <Link 
                        href="https://youtube.com/@sollvr" 
                        target="_blank"
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="YouTube"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={zoomInVariant} className="bg-[#12121A]/80 backdrop-blur-sm rounded-3xl p-8 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#CCFF00]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-10 h-10 bg-[#CCFF00]/10 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-[#CCFF00]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-medium text-glow text-white mb-2">Account support</h3>
                        <p className="text-gray-400">Chat with us to resolve account and billing issues.</p>
                      </div>
                    </div>
                    <button className="w-full bg-[#1C1C25] hover:bg-[#1C1C25]/80 text-white font-medium py-3 rounded-lg transition-colors">
                      Start chat
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-150px" }}
          className="py-32 bg-black relative overflow-hidden"
        >
          {/* Purple glow effects */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] -translate-x-1/2 -translate-y-1/2" 
          />

          {/* Grid overlay */}
          <motion.div 
            initial={{ opacity: 0.02, scale: 1.1 }}
            whileInView={{ opacity: 0.05, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"
          />

          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_70%)]" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-block bg-purple-600/10 text-purple-400 px-4 py-2 rounded-full text-sm mb-4"
              >
                We&apos;ve got you covered!
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl font-medium text-glow text-white mb-8"
              >
                Frequently Asked Questions
              </motion.h2>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              <motion.div 
                variants={slideUpVariant}
                className="bg-[#12121A]/80 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 text-white cursor-pointer">
                    <span className="text-lg">How is data security implemented here?</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    We implement industry-standard security measures including end-to-end encryption, secure data storage, and regular security audits. All data is encrypted both in transit and at rest, and we follow best practices for secure development and deployment.
                  </div>
                </details>
              </motion.div>

              <motion.div 
                variants={slideUpVariant}
                className="bg-[#12121A]/80 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 text-white cursor-pointer">
                    <span className="text-lg">What&apos;s your typical MVP development timeline?</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    Our typical MVP development timeline is 2-4 weeks, depending on the project scope. We follow an agile methodology, focusing on core features first to get your product to market quickly while maintaining high quality and scalability.
                  </div>
                </details>
              </motion.div>

              <motion.div 
                variants={slideUpVariant}
                className="bg-[#12121A]/80 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 text-white cursor-pointer">
                    <span className="text-lg">How do you handle product iterations and updates?</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    We use a continuous integration/continuous deployment (CI/CD) pipeline for smooth updates and iterations. After the initial MVP launch, we can implement regular sprint cycles for feature additions and improvements based on user feedback and business needs.
                  </div>
                </details>
              </motion.div>

              <motion.div 
                variants={slideUpVariant}
                className="bg-[#12121A]/80 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 text-white cursor-pointer">
                    <span className="text-lg">What technologies do you use for MVP development?</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    We use modern, scalable technologies including React/Next.js for frontend, Node.js/Python for backend, and cloud services like AWS/GCP. Our tech stack is chosen based on your specific needs while ensuring long-term maintainability and scalability.
                  </div>
                </details>
              </motion.div>

              <motion.div 
                variants={slideUpVariant}
                className="bg-[#12121A]/80 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 text-white cursor-pointer">
                    <span className="text-lg">How do you ensure product quality and testing?</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    We implement comprehensive testing strategies including unit tests, integration tests, and end-to-end testing. Our QA process includes automated testing, manual testing, and user acceptance testing to ensure your product meets high quality standards.
                  </div>
                </details>
              </motion.div>

              <motion.div 
                variants={slideUpVariant}
                className="bg-[#12121A]/80 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 text-white cursor-pointer">
                    <span className="text-lg">What happens after the MVP is launched?</span>
                    <span className="transition group-open:rotate-180">
                      <ChevronRight className="w-5 h-5" />
                    </span>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400">
                    Post-launch, we provide ongoing support and maintenance, help analyze user feedback, and can implement new features through our Growth Package. We also assist with scaling infrastructure as your user base grows and your product evolves.
                  </div>
                </details>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.footer 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="bg-[rgb(0,0,0)] text-gray-300 py-16"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-8">
              <Image
                src="/logo-new.png"
                alt="Sollvr Logo"
                width={100}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-sm">&copy; 2024 Sollvr. All rights reserved.</p>
          </div>
        </motion.footer>
      </main>
    </div>
  )
}