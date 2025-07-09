import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { WelcomeEmail } from '../src/emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: 'Daniel Madeley <mail@madeleydesignstudio.com>',
      to: [email],
      subject: "Welcome to Daniel Madeley's Newsletter!",
      react: WelcomeEmail({ userEmail: email }),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send welcome email' });
    }

    console.log('Welcome email sent to:', email);

    return res.status(200).json({
      message: 'Successfully subscribed! Check your email for a welcome message.',
      id: data?.id,
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
