import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ChevronRight, MessageSquare, Github, Sparkles } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { PricingSection } from '@/components/pricing-section'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFE5D9] via-[#FFE5D9] to-[#F5EDE4]">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <Link href="/" className="relative w-32 h-12">
            <Image
              src="/logo.png"
              alt="Sollvr Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
          <div className="space-x-4">
            <Link href="/#projects" className="text-gray-600 hover:text-[rgb(0,74,172)]">Projects</Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-[rgb(0,74,172)]">Pricing</Link>
            <Link href="/#contact" className="text-gray-600 hover:text-[rgb(0,74,172)]">Contact</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-6">
            Boost Your Startup with <span className="text-[rgb(0,74,172)]">Ready-to-Launch</span> Projects
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Why reinvent the wheel when you can use our rocket boosters? Launch your MVP faster than you can say &ldquo;disrupt&rdquo;.
          </p>
          <Button size="lg" className="bg-[rgb(0,74,172)] hover:bg-white hover:text-[rgb(0,74,172)] transition-colors">
            Explore Projects <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center gap-3 mb-12">
            <Sparkles className="w-8 h-8 text-[rgb(0,74,172)]" />
            <h2 className="font-poppins font-bold text-4xl text-center text-gray-900">
              Our Launchpad Projects
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard 
              title="AI Quiz Generator"
              description="An intelligent quiz generation system that creates custom quizzes based on your content. Perfect for educators and training platforms."
              image="/ai-quiz-gen.png"
              techStack={["Next.js", "OpenAI", "TailwindCSS", "TypeScript"]}
              demoLink="https://quzai.sollvr.com"
            />
            <ProjectCard 
              title="Data from Image"
              description="Extract valuable data from images using advanced OCR and AI. Transform visual information into structured data effortlessly."
              image="/datafromimg-img.png"
              techStack={["React", "TensorFlow", "Python", "Computer Vision"]}
              demoLink="https://datafromimage.sollvr.com"
            />
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-4 py-20">
          <div className="relative flex items-center justify-center gap-3 mb-12">
            <MessageSquare className="w-8 h-8 text-[rgb(0,74,172)]" />
            <h2 className="font-poppins font-bold text-4xl text-center text-gray-900">
              Let&apos;s Talk Rocket Science
            </h2>
            <div className="hidden lg:block ml-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white shadow-lg">
                <video 
                  className="w-full h-full object-cover scale-150"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                >
                  <source src="/animation-2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </section>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 Sollvr. All rights reserved. Now go disrupt something!</p>
          </div>
        </footer>
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
}

function ProjectCard({ title, description, image, techStack, demoLink }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 w-full">
        <Image 
          src={image} 
          alt={title} 
          fill
          className="object-contain p-4"
          priority
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech, index) => (
            <span key={index} className="bg-[rgba(0,74,172,0.1)] text-[rgb(0,74,172)] text-xs font-semibold px-2.5 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Link href={demoLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[rgb(0,74,172)] hover:bg-white hover:text-[rgb(0,74,172)] border border-transparent hover:border-[rgb(0,74,172)] transition-all">
              View Demo
            </Button>
          </Link>
          <Link href="#" className="text-gray-500 hover:text-gray-700">
            <Github className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}