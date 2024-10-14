"use client"

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, CheckCircle2, ChevronDown, Code2, Cpu, Globe, Mail, MessageSquare, Phone, Send, X, Zap, Menu } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast, Toaster } from 'react-hot-toast'
import { sendContactForm } from '../lib/contact'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export function HomePageWithExpandableSections() {
  const [selectedPlan, setSelectedPlan] = useState('starter')
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! How can I assist you with our services and plans today?" }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [isHomeExpanded, setIsHomeExpanded] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<{ type: 'service' | 'plan', id: string } | null>(null)
  const [serviceRequirements, setServiceRequirements] = useState('')
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false)
  const [isChatInquiryPopupOpen, setIsChatInquiryPopupOpen] = useState(false)
  const [selectedServiceFromChat, setSelectedServiceFromChat] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  const plans = {
    starter: { name: 'Starter', price: 249, time: '2 weeks' },
    pro: { name: 'Pro', price: 499, time: '1 week' },
    enterprise: { name: 'Enterprise', price: 999, time: '3 days' },
  }

  const services = [
    {
      id: 'mvp',
      title: 'MVP Development',
      icon: Code2,
      description: 'Rapidly build and launch your minimum viable product.',
      details: 'Our MVP development service focuses on creating a functional prototype of your product idea in the shortest time possible. We prioritize core features, employ agile methodologies, and use cutting-edge technologies to bring your vision to life quickly and efficiently.'
    },
    {
      id: 'webapps',
      title: 'Web Applications',
      icon: Globe,
      description: 'Custom web apps tailored to your business needs.',
      details: 'We specialize in developing robust, scalable web applications that cater to your specific business requirements. Our team utilizes modern frameworks and best practices to ensure your web app is not only functional but also user-friendly and performant.'
    },
    {
      id: 'itsolutions',
      title: 'IT Solutions',
      icon: Cpu,
      description: 'Comprehensive IT support for growing startups.',
      details: "Our IT solutions encompass a wide range of services designed to support your startup's growth. From infrastructure setup and management to cybersecurity and cloud solutions, we provide the technical backbone your business needs to thrive in the digital landscape."
    },
  ]

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || isLoading) return

    const userMessage = { role: 'user', content: inputMessage }
    setMessages(prevMessages => [...prevMessages, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response from AI')
      }

      const data = await response.json()
      setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: data.message }])

      // Check if the response mentions opening a request form
      if (data.message.includes('use the "Get Started" button to open a request form')) {
        setIsChatInquiryPopupOpen(true)
        // Try to determine the selected service from the AI's response
        const serviceMatch = services.find(s => data.message.toLowerCase().includes(s.title.toLowerCase()))
        if (serviceMatch) {
          setSelectedServiceFromChat(serviceMatch.id)
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again later." }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const toggleServiceExpansion = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
  }

  const toggleHomeExpansion = () => {
    setIsHomeExpanded(!isHomeExpanded)
  }

  const handleGetStarted = (type: 'service' | 'plan', id: string) => {
    if (type === 'service' && id === 'mvp') {
      // Scroll to pricing section
      const pricingSection = document.getElementById('pricing')
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      setSelectedItem({ type, id })
      setIsPopupOpen(true)
    }
  }

  const handlePopupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const toastId = toast.loading('Sending request...')
    try {
      await sendContactForm({
        name: contactForm.name,
        email: contactForm.email,
        message: `${selectedItem?.type === 'service' ? 'Service' : 'Plan'}: ${selectedItem?.id}\nRequirements: ${serviceRequirements}`
      })
      toast.success('Request sent successfully!', { id: toastId })
      setIsPopupOpen(false)
      setServiceRequirements('')
      setIsConfirmationPopupOpen(true) // Open the confirmation popup
    } catch (error) {
      toast.error('Failed to send request. Please try again.', { id: toastId })
    }
  }

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContactForm(prevState => ({ ...prevState, [name]: value }))
  }

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const toastId = toast.loading('Sending message...')
    try {
      await sendContactForm(contactForm)
      toast.success('Message sent successfully!', { id: toastId })
      setContactForm({ name: '', email: '', message: '' })
      setIsConfirmationPopupOpen(true) // Open the confirmation popup
    } catch (error) {
      toast.error('Failed to send message. Please try again.', { id: toastId })
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }
//add logo please
  return (
    <div className="flex flex-col min-h-screen bg-primary-400 text-secondary-100">
      <Toaster position="bottom-right" />
      <header className="sticky top-0 z-50 w-full border-b border-primary-300 bg-primary-500/95 backdrop-blur supports-[backdrop-filter]:bg-primary-500/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-14 items-center justify-between">
            <a className="flex items-center space-x-2" href="/">
              <Zap className="h-6 w-6 text-secondary-400" /> 
              <span className="font-logo font-bold text-secondary-400 text-xl">sollvr</span>
            </a>
            <nav className="hidden md:flex items-center space-x-1 text-sm font-medium">
              <a className="px-3 py-2 rounded-md transition-colors hover:bg-black hover:text-white" href="#home">Home</a>
              <a className="px-3 py-2 rounded-md transition-colors hover:bg-black hover:text-white" href="#services">Services</a>
              <a className="px-3 py-2 rounded-md transition-colors hover:bg-black hover:text-white" href="#pricing">Pricing</a>
              <a className="px-3 py-2 rounded-md transition-colors hover:bg-black hover:text-white" href="#contact">Contact</a>
            </nav>
            <Button className="md:hidden" size="icon" variant="ghost" onClick={toggleMobileMenu}>
              <Menu className="h-6 w-6 text-secondary-200" />
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-primary-500/95 backdrop-blur supports-[backdrop-filter]:bg-primary-500/60">
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <a className="flex items-center space-x-2" href="/">
                <Zap className="h-6 w-6 text-secondary-400" />
                <span className="font-logo font-bold text-secondary-400 text-xl">sollvr</span>
              </a>
              <Button size="icon" variant="ghost" onClick={toggleMobileMenu}>
                <X className="h-6 w-6 text-secondary-200" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-4">
              <a className="text-lg font-medium px-3 py-2 rounded-md transition-colors hover:bg-primary-600 hover:text-secondary-200" href="#home" onClick={toggleMobileMenu}>Home</a>
              <a className="text-lg font-medium px-3 py-2 rounded-md transition-colors hover:bg-primary-600 hover:text-secondary-200" href="#services" onClick={toggleMobileMenu}>Services</a>
              <a className="text-lg font-medium px-3 py-2 rounded-md transition-colors hover:bg-primary-600 hover:text-secondary-200" href="#products" onClick={toggleMobileMenu}>Products</a>
              <a className="text-lg font-medium px-3 py-2 rounded-md transition-colors hover:bg-primary-600 hover:text-secondary-200" href="#pricing" onClick={toggleMobileMenu}>Pricing</a>
              <a className="text-lg font-medium px-3 py-2 rounded-md transition-colors hover:bg-primary-600 hover:text-secondary-200" href="#contact" onClick={toggleMobileMenu}>Contact</a>
            </nav>
          </div>
        </div>
      )}
      <main className="flex-1">
        <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-secondary-400">
                  Empowering Startups with Rapid MVP Development
                </h1>
                <p className="mx-auto max-w-[700px] text-secondary-200 md:text-xl">
                  We turn your ideas into reality. Fast, efficient, and tailored for startups without in-house developers.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild className="bg-secondary-400 text-primary-700 hover:bg-black hover:text-white transition-colors">
                  <a href="#contact">Get Started</a>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={toggleHomeExpansion} 
                  className="text-secondary-200 border-secondary-200 hover:bg-black hover:text-white transition-colors"
                >
                  {isHomeExpanded ? 'Show Less' : 'Learn More'}
                </Button>
              </div>
              {isHomeExpanded && (
                <Card className="mt-8 w-full max-w-3xl bg-primary-200 text-primary-800">
                  <CardHeader>
                    <CardTitle className="text-primary-900">About Sollvr</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-700">
                      Sollvr is a cutting-edge technology company specializing in rapid MVP development, web application creation, and comprehensive IT solutions for startups. We understand the unique challenges faced by new businesses and have tailored our services to meet these specific needs.
                    </p>
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-primary-900">Our Approach</h3>
                    <ul className="list-disc pl-5 space-y-2 text-primary-700">
                      <li>Rapid Prototyping: We quickly turn your ideas into functional prototypes, allowing for early testing and validation.</li>
                      <li>Agile Development: Our iterative approach ensures flexibility and allows for continuous improvement based on feedback.</li>
                      <li>Scalable Solutions: We build with growth in mind, ensuring your MVP can evolve into a full-fledged product.</li>
                      <li>Tech Stack Expertise: Our team is proficient in a wide range of modern technologies, allowing us to choose the best tools for your project.</li>
                      <li>Ongoing Support: We don't just build and leave. We provide continued support to ensure your product's success.</li>
                    </ul>
                    <h3 className="text-lg font-semibold mt-4 mb-2 text-primary-900">Why Choose Sollvr?</h3>
                    <p className="text-primary-700">
                      At Sollvr, we combine technical expertise with a deep understanding of the startup ecosystem. Our team of experienced developers, designers, and project managers work closely with you to bring your vision to life. We're not just service providers; we're your technology partners, committed to your success.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
        <section id="services" className="w-full py-12 md:py-16 lg:py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {services.map((service) => (
                <Card key={service.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    {expandedService === service.id && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{service.details}</p>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => toggleServiceExpansion(service.id)}
                      className="w-full hover:bg-black hover:text-white transition-colors"
                    >
                      {expandedService === service.id ? 'Show Less' : 'Learn More'}
                    </Button>
                    <Button
                      onClick={() => handleGetStarted('service', service.id)}
                      className="w-full hover:bg-black hover:text-white transition-colors"
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        {/* Comment out the entire products section
        <section id="products" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="flex flex-col items-center text-center">
                <img
                  alt="Product 1"
                  className="mx-auto mb-4 aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="200"
                  src="/placeholder.svg?height=200&width=300"
                  width="300"
                />
                <h3 className="text-xl font-bold mb-2">E-commerce Platform</h3>
                <p className="text-gray-500 dark:text-gray-400">Scalable and customizable e-commerce solution.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  alt="Product 2"
                  className="mx-auto mb-4 aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="200"
                  src="/placeholder.svg?height=200&width=300"
                  width="300"
                />
                <h3 className="text-xl font-bold mb-2">CRM System</h3>
                <p className="text-gray-500 dark:text-gray-400">Efficient customer relationship management tool.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  alt="Product 3"
                  className="mx-auto mb-4 aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="200"
                  src="/placeholder.svg?height=200&width=300"
                  width="300"
                />
                <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
                <p className="text-gray-500 dark:text-gray-400">Insightful data visualization for informed decisions.</p>
              </div>
            </div>
          </div>
        </section>
        */}
        <section id="pricing" className="w-full py-12 md:py-16 lg:py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {Object.entries(plans).map(([key, plan]) => (
                <Card key={key} className={selectedPlan === key ? 'border-primary' : ''}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">${plan.price}</p>
                    <p className="text-gray-500 dark:text-gray-400">Delivery Time: {plan.time}</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        Custom Design
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        Responsive Layout
                      </li>
                      <li className="flex items-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                        Source Code
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleGetStarted('plan', key)}
                      className="w-full hover:bg-black hover:text-white transition-colors"
                    >
                      Select Plan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-primary-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-secondary-400">Contact Us</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-secondary-300">Get in Touch</h3>
                <p className="text-secondary-100">
                  Have questions or ready to start your project? Reach out to us!
                </p>
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-secondary-400" />
                  <span className="text-secondary-200">contact@sollvr.com</span>
                </div>
                </div>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name">Name</label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={handleContactInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    type="email"
                    value={contactForm.email}
                    onChange={handleContactInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your message..."
                    rows={4}
                    value={contactForm.message}
                    onChange={handleContactInputChange}
                    required
                  ></textarea>
                </div>
                <Button 
                  type="submit" 
                  className="bg-secondary-400 text-primary-700 hover:bg-black hover:text-white transition-colors"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full py-6 bg-primary-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-secondary-400" />
              <span className="font-logo font-bold text-secondary-400 text-xl">sollvr</span>
            </div>
            <p className="text-center text-sm text-secondary-200">
            </p>
          </div>
        </div>
      </footer>
      
      {/* Chat Button */}
      <Button
        onClick={() => setIsChatOpen(true)}
        className={cn(
          "fixed bottom-4 right-4 z-50 rounded-full p-4 shadow-lg",
          "bg-secondary-400 hover:bg-black text-primary-700 hover:text-white transition-colors"
        )}
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      {/* Chat Interface */}
      {isChatOpen && (
        <Card className="fixed bottom-4 right-4 w-full sm:w-80 h-96 flex flex-col z-50 shadow-xl bg-primary-200 text-secondary-900">
          <CardHeader className="flex flex-row items-center bg-primary-300">
            <CardTitle className="text-secondary-800">Chat with AI</CardTitle>
            <Button
              onClick={() => setIsChatOpen(false)}
              variant="ghost"
              size="icon"
              className="ml-auto text-secondary-700 hover:bg-black hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`flex items-end ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <Avatar className={message.role === 'user' ? 'ml-2' : 'mr-2'}>
                    <AvatarFallback>{message.role === 'user' ? 'U' : 'AI'}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`max-w-[80%] rounded-lg p-2 ${
                      message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex w-full items-center space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="bg-primary-100 text-secondary-900 placeholder-secondary-500"
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading} 
                className="bg-secondary-400 text-primary-700 hover:bg-black hover:text-white transition-colors"
              >
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}

      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Get Started with {selectedItem?.type === 'service' 
                ? services.find(s => s.id === selectedItem.id)?.title 
                : plans[selectedItem?.id as keyof typeof plans]?.name}
            </DialogTitle>
            <DialogDescription>
              Please provide your details and any specific requirements for this {selectedItem?.type}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePopupSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="popup-name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                  id="popup-name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="popup-email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="popup-email"
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="popup-requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
                <textarea
                  id="popup-requirements"
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  value={serviceRequirements}
                  onChange={(e) => setServiceRequirements(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmationPopupOpen} onOpenChange={setIsConfirmationPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Received</DialogTitle>
            <DialogDescription>
              We have received your request. Please wait for our response, we will get to you in under 24 hours.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsConfirmationPopupOpen(false)}>Ok</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isChatInquiryPopupOpen} onOpenChange={setIsChatInquiryPopupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request More Information</DialogTitle>
            <DialogDescription>
              Please provide your details and any specific requirements for the service you're interested in.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePopupSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="chat-inquiry-name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                  id="chat-inquiry-name"
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="chat-inquiry-email" className="block text-sm font-medium text-gray-700">Email</label>
                <Input
                  id="chat-inquiry-email"
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="chat-inquiry-service" className="block text-sm font-medium text-gray-700">Service</label>
                <select
                  id="chat-inquiry-service"
                  name="service"
                  value={selectedServiceFromChat}
                  onChange={(e) => setSelectedServiceFromChat(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>{service.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="chat-inquiry-requirements" className="block text-sm font-medium text-gray-700">Requirements</label>
                <textarea
                  id="chat-inquiry-requirements"
                  className="w-full p-2 border rounded-md"
                  rows={4}
                  value={serviceRequirements}
                  onChange={(e) => setServiceRequirements(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button type="submit">Submit Request</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}