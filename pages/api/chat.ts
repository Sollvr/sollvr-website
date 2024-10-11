import type { NextApiRequest, NextApiResponse } from 'next'
import { sendContactForm } from '../../lib/contact'

type Message = {
  role: 'user' | 'assistant';
  content: string;
}

const services = [
  { id: 'mvp', title: 'MVP Development', price: 'Starting from $999' },
  { id: 'webapps', title: 'Web Applications', price: 'Starting from $2999' },
  { id: 'itsolutions', title: 'IT Solutions', price: 'Custom pricing based on requirements' },
]

const plans = [
  { id: 'starter', name: 'Starter', price: '$999', time: '1 week' },
  { id: 'pro', name: 'Pro', price: '$2999', time: '2 weeks' },
  { id: 'enterprise', name: 'Enterprise', price: '$4999', time: '4 weeks' },
]

function generateResponse(messages: Message[]): string {
  const lastMessage = messages[messages.length - 1].content.toLowerCase()

  if (lastMessage.includes('services') || lastMessage.includes('what do you offer')) {
    return `We offer the following services:\n${services.map(s => `- ${s.title}: ${s.price}`).join('\n')}\nWhich service are you interested in?`
  }

  if (lastMessage.includes('pricing') || lastMessage.includes('plans')) {
    return `We have the following plans:\n${plans.map(p => `- ${p.name}: ${p.price} (${p.time})`).join('\n')}\nWhich plan would you like more information about?`
  }

  for (const service of services) {
    if (lastMessage.includes(service.id) || lastMessage.includes(service.title.toLowerCase())) {
      return `Great! You're interested in our ${service.title} service. To provide you with more detailed information and discuss your specific requirements, please use the "Get Started" button to open a request form.`
    }
  }

  for (const plan of plans) {
    if (lastMessage.includes(plan.id) || lastMessage.includes(plan.name.toLowerCase())) {
      return `Excellent choice! You're interested in our ${plan.name} plan. To give you more specific details and discuss your needs, please use the "Get Started" button to open a request form.`
    }
  }

  return "I'm here to help you with information about our services and pricing plans. What would you like to know more about? If you're ready to discuss your specific needs, please use the 'Get Started' button to open a request form."
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { messages } = req.body as { messages: Message[] }
    const response = generateResponse(messages)

    res.status(200).json({ message: response })
  } catch (error) {
    console.error('Error in chat API:', error)
    res.status(500).json({ message: 'An error occurred while processing your request' })
  }
}