import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { name, email, company, message, selectedPlan } = req.body

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    console.log('Transporter created, verifying...')
    await transporter.verify()
    console.log('Transporter verified, sending mail...')

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission${selectedPlan ? ` - ${selectedPlan} Plan` : ''}`,
      html: `
        <h2>New Contact Form Submission${selectedPlan ? ` - ${selectedPlan} Plan` : ''}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${selectedPlan ? `<p><strong>Selected Plan:</strong> ${selectedPlan}</p>` : ''}
        <p><strong>Message:</strong> ${message}</p>
      `,
    })

    console.log('Message sent: %s', info.messageId)
    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Detailed error:', error)
    if (error instanceof Error) {
      res.status(500).json({ 
        message: 'Failed to send email', 
        error: error.message,
        stack: error.stack
      })
    } else {
      res.status(500).json({ 
        message: 'Failed to send email', 
        error: 'An unknown error occurred'
      })
    }
  }
}
