'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronRight, MessageSquare, Github, Check } from 'lucide-react'
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

// Enhanced animation variants
const zoomInVariant = {
  initial: { 
    scale: 0.95,
    opacity: 0
  },
  animate: { 
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
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
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.3
    }
  }
}

const cardVariant = {
  initial: { 
    opacity: 0, 
    y: 100,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

export default function Page() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const handlePackageSelect = (packageName: string) => {
    setSelectedPackage(packageName);
    setIsContactOpen(true);
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
          transition={{ duration: 1.2 }}
          className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-32"
        >
          <motion.div 
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
          />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-200px" }}
            className="container mx-auto px-4 relative"
          >
            <motion.div 
              variants={zoomInVariant}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="font-roboto text-6xl font-medium text-gray-900 mb-6 tracking-tight">
                Boost Your Startup with{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[rgb(0,74,172)] to-blue-500">
                  Ready-to-Launch
                </span>{" "}
                Projects
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Let&apos;s explore your idea together.
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
          viewport={{ once: true, margin: "-150px" }}
          className="py-32 bg-[#FFE5D9]"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={zoomInVariant}
              className="text-center mb-20"
            >
              <h2 className="font-roboto text-5xl mb-6 text-gray-900">
                IDEA to Launch in DAYS, <span className="text-[rgb(0,74,172)]">Not Years</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               Convert your idea into a market ready application within a span of weeks
              </p>
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            >
              <motion.div variants={cardVariant}>
                <div className="bg-white rounded-3xl p-8 text-center floating-card shadow-lg">
                  <div className="w-16 h-16 mx-auto mb-6 text-[rgb(0,74,172)] rotate-hover">
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
              </motion.div>
              <motion.div variants={cardVariant}>
                <div className="bg-white rounded-3xl p-8 text-center floating-card shadow-lg" style={{ animationDelay: '0.2s' }}>
                  <div className="w-16 h-16 mx-auto mb-6 text-[rgb(0,74,172)] rotate-hover">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13 9h-2V7h2m0 10h-2v-6h2m-1-9A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"/>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Seamless Integrations</h3>
                  <p className="text-gray-600">
                    Set up all necessary integrations for you.
                  </p>
                </div>
              </motion.div>
              <motion.div variants={cardVariant}>
                <div className="bg-white rounded-3xl p-8 text-center floating-card shadow-lg" style={{ animationDelay: '0.4s' }}>
                  <div className="w-16 h-16 mx-auto mb-6 text-[rgb(0,74,172)] rotate-hover">
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
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-150px" }}
          className="py-32 bg-[#FFE5D9]"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={zoomInVariant}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-4">
                Few <span className="text-[rgb(0,74,172)]">websites</span> that I have built.
              </h2>
              <p className="text-xl text-gray-600">
                Here are some of the MVPs I&apos;ve launched. I turned my ideas into reality.
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
                  transition: { duration: 0.3 }
                }}
                className="shine-effect"
              >
                <ProjectCard 
                  title="AI Quiz Generator"
                  description="An intelligent quiz generation system that creates custom quizzes based on your content. Perfect for educators and training platforms."
                  image="/ai-quiz-gen.png"
                  techStack={["Next.js", "OpenAI", "TailwindCSS", "TypeScript"]}
                  demoLink="https://quizai.sollvr.com"
                  tags={["AI", "EdTech", "Study Companion", "Material Analysis"]}
                />
              </motion.div>
              <motion.div 
                variants={zoomInVariant}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="shine-effect"
              >
                <ProjectCard 
                  title="Data from Image"
                  description="Extract valuable data from images using advanced OCR and AI. Transform visual information into structured data effortlessly."
                  image="/datafromimg-img.png"
                  techStack={["React", "TensorFlow", "Python", "Next.js"]}
                  demoLink="https://datafromimage.sollvr.com"
                  tags={["Web App", "Image Processing", "Data-Scraping", "AI"]}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Pricing Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-150px" }}
          className="py-32 bg-[#FFE5D9]"
        >
          <div className="container mx-auto px-4">
            <motion.div variants={slideUpVariant} className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 text-[rgb(0,74,172)]">Ready to BUILD?</h2>
              <p className="text-xl text-gray-600">Choose the perfect package for your project and get started today</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
              <motion.div 
                variants={zoomInVariant}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="shine-effect"
              >
                <div className="bg-white rounded-3xl p-8 text-center shadow-lg">
                  <span className="inline-block bg-[rgb(0,74,172)] text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
                    Most Popular
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">MVP Development Package</h3>
                  <p className="text-gray-600 mb-6">One time</p>
                  <div className="text-4xl font-bold mb-8">Starting at $497</div>
                  <button 
                    onClick={() => handlePackageSelect('MVP Development')}
                    className="w-full bg-[rgb(0,74,172)] text-white hover:bg-[rgb(0,74,172)]/90 h-12 mb-8 rounded-md"
                  >
                    Get Started Now →
                  </button>
                  <div>
                    <p className="font-medium mb-4 text-gray-900">What&apos;s Included:</p>
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
                          <Check className="h-5 w-5 mt-0.5 text-[rgb(0,74,172)]" />
                          <span className="text-gray-600">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                variants={zoomInVariant}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="shine-effect"
              >
                <div className="bg-black rounded-3xl p-8 text-center text-white shadow-lg">
                  <span className="inline-block bg-[rgb(0,74,172)] text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
                    Ongoing Support
                  </span>
                  <h3 className="text-2xl font-bold mb-4">Growth Package</h3>
                  <p className="text-gray-400 mb-6">No commitment, cancel anytime</p>
                  <div className="text-4xl font-bold mb-8">$997/month</div>
                  <button 
                    onClick={() => handlePackageSelect('Growth Retainer')}
                    className="w-full bg-white text-black hover:bg-gray-100 h-12 mb-8 rounded-md"
                  >
                    Schedule a Call →
                  </button>
                  <div>
                    <p className="font-medium mb-4 text-gray-900">What&apos;s Included:</p>
                    <ul className="space-y-4">
                      {[
                        "Flexible hours allocation",
                        "Weekly strategy calls",
                        "Priority feature development",
                      ].map((feature, index) => (
                        <motion.li 
                          key={index}
                          variants={{
                            initial: { opacity: 0, x: -20 },
                            animate: { opacity: 1, x: 0 }
                          }}
                          className="flex items-start gap-3"
                        >
                          <Check className="h-5 w-5 mt-0.5 text-[rgb(0,74,172)]" />
                          <span className="text-gray-400">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
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

        {/* Contact Section */}
        <motion.section 
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-150px" }}
          id="contact" 
          className="py-32 bg-white"
        >
          <div className="container mx-auto px-4">
            <motion.div 
              variants={zoomInVariant}
              className="flex items-center justify-center gap-3 mb-16"
            >
              <MessageSquare className="w-8 h-8 text-[rgb(0,74,172)] rotate-hover" />
              <h2 className="font-roboto text-4xl font-medium text-center text-gray-900">
                Let&apos;s Talk Rocket Science
              </h2>
            </motion.div>
            <motion.div 
              variants={zoomInVariant}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-8 shine-effect"
            >
              <ContactForm />
            </motion.div>
          </div>
        </motion.section>

        <motion.footer 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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