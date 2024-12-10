'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'

interface ContactFormState {
  name: string;
  email: string;
  company: string;
  message: string;
}

interface ContactFormProps {
  selectedPlan?: string;
}

export function ContactForm({ selectedPlan }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          selectedPlan,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const defaultMessage = selectedPlan 
    ? `I'm interested in the ${selectedPlan} plan. Please provide more information.`
    : '';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        disabled={status === 'submitting'}
      />
      <Input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={status === 'submitting'}
      />
      <Input
        type="text"
        name="company"
        placeholder="Your Company"
        value={formData.company}
        onChange={handleChange}
        disabled={status === 'submitting'}
      />
      <textarea
        name="message"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(0,74,172)]"
        rows={4}
        placeholder="Tell us about your requirements..."
        value={formData.message || defaultMessage}
        onChange={handleChange}
        required
        disabled={status === 'submitting'}
      />
      <div className="space-y-2">
        {status === 'error' && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
        {status === 'success' && (
          <p className="text-green-500 text-sm">Message sent successfully!</p>
        )}
        <Button
          type="submit"
          className="w-full bg-[rgb(0,74,172)] hover:bg-white hover:text-[rgb(0,74,172)] border border-transparent hover:border-[rgb(0,74,172)] transition-all disabled:opacity-50 disabled:hover:bg-[rgb(0,74,172)] disabled:hover:text-white disabled:hover:border-transparent"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            'Sending...'
          ) : (
            <>
              Send Message <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
} 