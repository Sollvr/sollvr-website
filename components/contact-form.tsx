'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ContactFormProps {
  selectedPackage?: string;
}

export function ContactForm({ selectedPackage }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      package: selectedPackage || 'Not specified'
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold text-[rgb(0,74,172)] mb-4">Thank You!</h3>
        <p className="text-gray-600">
          We&apos;ve received your message and will get back to you shortly about the {selectedPackage} package.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {selectedPackage && (
        <div className="bg-[rgb(0,74,172)]/5 p-4 rounded-lg mb-6">
          <p className="text-sm text-[rgb(0,74,172)]">Selected Package: {selectedPackage}</p>
        </div>
      )}
      <div>
        <Input
          name="name"
          placeholder="Your Name"
          required
          className="w-full"
        />
      </div>
      <div>
        <Input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          className="w-full"
        />
      </div>
      <div>
        <Textarea
          name="message"
          placeholder="Tell us about your project"
          required
          className="w-full min-h-[100px]"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-[rgb(0,74,172)] text-white hover:bg-[rgb(0,74,172)]/90"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
} 