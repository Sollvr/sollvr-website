'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import { ContactForm } from './contact-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  tag?: string;
  onSelect: () => void;
  isSelected: boolean;
  dark?: boolean;
}

function PricingCard({ 
  title, 
  price, 
  description,
  features, 
  buttonText,
  tag,
  onSelect, 
  isSelected,
  dark = false 
}: PricingCardProps) {
  return (
    <div className={`rounded-3xl p-8 ${dark ? 'bg-black text-white' : 'bg-white'} transition-all duration-300`}>
      {tag && (
        <span className="inline-block bg-[rgb(0,74,172)] text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
          {tag}
        </span>
      )}
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className={`text-base mb-6 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-bold">{price}</span>
        {price !== 'Starting at $2497' && <span className={dark ? 'text-gray-400' : 'text-gray-600'}>/month</span>}
      </div>
      <Button 
        onClick={onSelect}
        className={`w-full mb-8 h-12 text-base font-medium ${
          dark 
            ? 'bg-white text-black hover:bg-gray-100' 
            : 'bg-black text-white hover:bg-gray-900'
        }`}
      >
        {buttonText}
      </Button>
      <p className={`font-medium mb-4 ${dark ? 'text-white' : 'text-black'}`}>What's Included:</p>
      <ul className="space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className={`h-5 w-5 mt-0.5 ${dark ? 'text-[rgb(0,74,172)]' : 'text-[rgb(0,74,172)]'}`} />
            <span className={dark ? 'text-gray-400' : 'text-gray-600'}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedPlanTitle, setSelectedPlanTitle] = useState<string>('');

  const handlePlanSelect = (planTitle: string) => {
    setSelectedPlan(planTitle);
    setSelectedPlanTitle(planTitle);
    setIsContactOpen(true);
  };

  return (
    <section id="pricing" className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 text-[rgb(0,74,172)]">Ready to BUILD?</h2>
        <p className="text-xl text-gray-600">Choose the perfect package for your project and get started today</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <PricingCard 
          title="Starter Package"
          price="Starting at $497"
          description="One time"
          buttonText="Get Started Now →"
          tag="Most Popular"
          features={[
            "Complete MVP development in 2 weeks",
            "Web application",
            "Modern, scalable tech stack",
            "Seamless integrations (devops side)",
            "Personalizeddevelopment",
            "Regular updates"
          ]}
          onSelect={() => handlePlanSelect('MVP Development')}
          isSelected={selectedPlan === 'MVP Development'}
        />
        <PricingCard 
          title="Growth Package"
          price="$999"
          description="No commitment, cancel anytime"
          buttonText="Schedule a Call →"
          tag="Ongoing Support"
          features={[
            "60 hours of development time per month",
            "Flexible hours allocation",
            "Weekly strategy calls",
            "Priority feature development",
          ]}
          onSelect={() => handlePlanSelect('Growth Retainer')}
          isSelected={selectedPlan === 'Growth Retainer'}
          dark={true}
        />
      </div>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Contact Us - {selectedPlanTitle} Plan</DialogTitle>
            <DialogDescription>
              Please fill out the form below and we'll get back to you with more information about the {selectedPlanTitle} plan.
            </DialogDescription>
          </DialogHeader>
          <ContactForm selectedPlan={selectedPlanTitle} />
        </DialogContent>
      </Dialog>
    </section>
  )
} 