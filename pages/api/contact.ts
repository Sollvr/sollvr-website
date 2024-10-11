import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    console.log('Attempting to send email...')
    console.log('EMAIL_USER:', process.env.EMAIL_USER)
    console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '[REDACTED]' : 'Not set')

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    try {
      console.log('Transporter created, verifying...')
      await transporter.verify()
      console.log('Transporter verified, sending mail...')

      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
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
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}