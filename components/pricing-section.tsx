'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight } from 'lucide-react'
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
  features: string[];
  highlighted?: boolean;
  onSelect: () => void;
  isSelected: boolean;
}

function PricingCard({ title, price, features, highlighted = false, onSelect, isSelected }: PricingCardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-md text-center transition-all duration-300 ${highlighted || isSelected ? 'ring-2 ring-[rgb(0,74,172)] scale-105' : 'hover:scale-102'}`}>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-4xl font-bold text-[rgb(0,74,172)] mb-4">{price}</p>
      <ul className="text-left mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center mb-2">
            <ChevronRight className="h-4 w-4 text-[rgb(0,74,172)] mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <Button 
        onClick={onSelect}
        className={`w-full ${highlighted || isSelected ? 'bg-[rgb(0,74,172)] hover:bg-[rgb(0,60,140)]' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
      >
        Choose Plan
      </Button>
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
    <section id="pricing" className="container mx-auto px-4 py-20 bg-[#FFE5D9]">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Pricing That Won't Break The Bank</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          title="Starter"
          price="$499"
          features={[
            "Basic Customization",
            "30 Days Support",
            "Documentation"
          ]}
          onSelect={() => handlePlanSelect('Starter')}
          isSelected={selectedPlan === 'Starter'}
        />
        <PricingCard 
          title="Growth"
          price="$999"
          features={[
            "Advanced Customization",
            "60 Days Support",
            "Documentation",
            "Priority Queue"
          ]}
          highlighted={true}
          onSelect={() => handlePlanSelect('Growth')}
          isSelected={selectedPlan === 'Growth'}
        />
        <PricingCard 
          title="Pro"
          price="Contact Us"
          features={[
            "Full Customization",
            "Dedicated Support",
            "Documentation",
            "Priority Development"
          ]}
          onSelect={() => handlePlanSelect('Enterprise')}
          isSelected={selectedPlan === 'Enterprise'}
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