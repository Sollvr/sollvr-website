import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Rocket, Send, ChevronRight, Github } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { PricingSection } from '@/components/pricing-section'

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
            <Link href="/#projects" className="text-gray-600 hover:text-purple-600">Projects</Link>
            <Link href="/#pricing" className="text-gray-600 hover:text-purple-600">Pricing</Link>
            <Link href="/#contact" className="text-gray-600 hover:text-purple-600">Contact</Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-6xl font-extrabold text-gray-800 mb-6">
          Empowering Startups with  <span className="text-purple-600">Rapid MVP</span> Development
          </h1>
          <p className="text-xl text-gray-600 mb-8"> 
           We turn your ideas into reality. Fast, efficient, and tailored for startups without in-house developers.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
            Explore Projects <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Launchpad Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard 
              title="AI Quiz Generator"
              description="An intelligent quiz generation system that creates custom quizzes based on your content. Perfect for educators and training platforms."
              image="/ai-quiz-gen.png"
              techStack={["Next.js", "OpenAI", "TailwindCSS", "TypeScript"]}
              demoLink="https://quizai.sollvr.com"
            />
            <ProjectCard 
              title="Data from Image"
              description="Extract valuable data from images using advanced OCR and AI. Transform visual information into structured data effortlessly."
              image="/datafromimg-img.png"
              techStack={["React", "Next.js", "Python", "OpenAI"]}
              demoLink="https://datafromimage.sollvr.com"
            />
          </div>
        </section>

        {/* Pricing Section */}
        <PricingSection />

        {/* Contact Section */}
        <section id="contact" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Let's Talk Rocket Science</h2>
          <div className="max-w-md mx-auto">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Sollvr. All rights reserved. Now go disrupt something!</p>
        </div>
      </footer>
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
            <span key={index} className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Link href={demoLink} target="_blank" rel="noopener noreferrer">
            <Button className="bg-purple-600 hover:bg-purple-700">
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