'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronRight, MessageSquare, Github, Sparkles } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { motion } from 'framer-motion'

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
}

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50"
      >
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="relative w-32 h-12">
              <Image
                src="/logo.png"
                alt="Sollvr Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
            <div className="space-x-8">
              <Link href="/#projects" className="text-gray-600 hover:text-[rgb(0,74,172)] font-medium">Projects</Link>
              <Link href="/#pricing" className="text-gray-600 hover:text-[rgb(0,74,172)] font-medium">Pricing</Link>
              <Link href="/#contact" className="text-gray-600 hover:text-[rgb(0,74,172)] font-medium">Contact</Link>
            </div>
          </div>
        </nav>
      </motion.header>

      <main className="pt-20">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-32"
        >
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="container mx-auto px-4 relative"
          >
            <motion.div variants={fadeInUp} className="max-w-4xl mx-auto text-center">
              <h1 className="font-roboto text-6xl font-medium text-gray-900 mb-6 tracking-tight">
                Boost Your Startup with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[rgb(0,74,172)] to-blue-500">
                  Ready-to-Launch
                </span>{" "}
                Projects
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Why reinvent the wheel when you can use our rocket boosters? Launch your MVP faster than you can say &ldquo;disrupt&rdquo;.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" className="bg-[rgb(0,74,172)] hover:bg-white hover:text-[rgb(0,74,172)] border border-transparent hover:border-[rgb(0,74,172)] transition-all h-12 px-8">
                  Explore Projects <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8">
                  About us
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Info Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 bg-[#FFE5D9]"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-20">
              <h2 className="font-roboto text-5xl font-bold mb-6 text-gray-900">
                From Concept to Launch in Weeks, <span className="text-[rgb(0,74,172)]">Not Months</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ignyt your idea with my lightning-fast MVP development. I turn your vision into a 
                market-ready product in just 2-3 weeks, giving you the edge in today's fast-paced 
                tech landscape.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl p-8 text-center floating-card shadow-lg">
                <div className="w-16 h-16 mx-auto mb-6 text-[rgb(0,74,172)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 13.242V20h1v2H2v-2h1v-6.758A4.496 4.496 0 0 1 1 9.5c0-.827.224-1.624.633-2.303L4.345 2.5a1 1 0 0 1 .866-.5H18.79a1 1 0 0 1 .866.5l2.712 4.697c.409.679.633 1.476.633 2.303 0 1.45-.693 2.737-1.763 3.542V20h1v2H2v-2h1V9.242a4.496 4.496 0 0 1-1-2.742c0-.827.224-1.624.633-2.303L4.345 2.5a1 1 0 0 1 .866-.5H18.79a1 1 0 0 1 .866.5l2.712 4.697c.409.679.633 1.476.633 2.303 0 1.45-.693 2.737-1.763 3.542z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Package</h3>
                <p className="text-gray-600">
                  Your MVP includes a sleek web application, a high-converting landing page, and SEO-ready content. 
                  Everything is built to launch fast and scale effortlessly.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center floating-card shadow-lg" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 mx-auto mb-6 text-[rgb(0,74,172)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Seamless Integrations</h3>
                <p className="text-gray-600">
                  I set up all necessary integrations for you, including payment gateways, user authentication, 
                  and email marketing platforms.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 text-center floating-card shadow-lg" style={{ animationDelay: '0.4s' }}>
                <div className="w-16 h-16 mx-auto mb-6 text-[rgb(0,74,172)]">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17,7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7M7,15A3,3 0 0,1 4,12A3,3 0 0,1 7,9A3,3 0 0,1 10,12A3,3 0 0,1 7,15Z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Modern, Scalable Tech</h3>
                <p className="text-gray-600">
                  I use the latest technologies combined with AI to ensure your MVP is fast, stable, 
                  and built to scale.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          className="py-32 bg-[#FFE5D9]"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4">
                A glimpse into the <span className="text-[rgb(0,74,172)]">websites</span> that I have built.
              </h2>
              <p className="text-xl text-gray-600">
                Here are some of the MVPs I've helped founders launch. They all had innovative ideas and I helped them convert them into reality.
              </p>
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto"
            >
              <motion.div variants={fadeInUp}>
                <ProjectCard 
                  title="AI Quiz Generator"
                  description="An intelligent quiz generation system that creates custom quizzes based on your content. Perfect for educators and training platforms."
                  image="/ai-quiz-gen.png"
                  techStack={["Next.js", "OpenAI", "TailwindCSS", "TypeScript"]}
                  demoLink="https://quzai.sollvr.com"
                  tags={["AI", "EdTech", "Study Companion", "PDF/Video Analysis"]}
                />
              </motion.div>
              <motion.div variants={fadeInUp}>
                <ProjectCard 
                  title="Data from Image"
                  description="Extract valuable data from images using advanced OCR and AI. Transform visual information into structured data effortlessly."
                  image="/datafromimg-img.png"
                  techStack={["React", "TensorFlow", "Python", "Computer Vision"]}
                  demoLink="https://datafromimage.sollvr.com"
                  tags={["Mobile App", "Social Networking", "Travel", "Solo Travelers"]}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          id="contact" 
          className="py-32 bg-white"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-16">
              <MessageSquare className="w-8 h-8 text-[rgb(0,74,172)]" />
              <h2 className="font-roboto text-4xl font-medium text-center text-gray-900">
                Let&apos;s Talk Rocket Science
              </h2>
            </motion.div>
            <motion.div 
              variants={fadeInUp}
              className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
            >
              <ContactForm />
            </motion.div>
          </div>
        </motion.section>

        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-gray-900 text-gray-300 py-16"
        >
          <div className="container mx-auto px-4 text-center">
            <div className="flex items-center justify-center mb-8">
              <Image
                src="/logo.png"
                alt="Sollvr Logo"
                width={100}
                height={40}
                className="object-contain"
              />
            </div>
            <p className="text-sm">&copy; 2024 Sollvr. All rights reserved. Now go disrupt something!</p>
          </div>
        </motion.footer>
      </main>
    </div>
  )
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  techStack: string[];
  demoLink: string;
  tags: string[];
}

function ProjectCard({ title, description, image, techStack, demoLink, tags }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden p-8 relative group shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-white to-[rgb(0,74,172)] opacity-5"></div>
      <div className="relative z-10">
        <div className="flex gap-2 mb-6">
          {tags.map((tag, index) => (
            <span key={index} className="bg-[rgb(0,74,172)]/10 text-[rgb(0,74,172)] text-sm px-4 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-8 text-lg">{description}</p>
        <div className="relative h-[400px] w-full mb-8 rounded-2xl overflow-hidden bg-gray-50">
          <Image 
            src={image} 
            alt={title} 
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            priority
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {techStack.map((tech, index) => (
            <span key={index} className="bg-[rgb(0,74,172)]/10 text-[rgb(0,74,172)] text-sm font-medium px-4 py-1.5 rounded-full border border-[rgb(0,74,172)]/20">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Link href={demoLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[rgb(0,74,172)] text-white hover:bg-[rgb(0,74,172)]/90 h-12 px-6">
              View Live Demo
            </Button>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
            <Github className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}