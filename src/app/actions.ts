'use server';

import { z } from 'zod';

// Enhanced Contact Form Schema with better validation
const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  email: z.string()
    .email('Please enter a valid email address')
    .toLowerCase()
    .trim(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .trim(),
});

// Simple in-memory rate limiting (for production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(identifier: string, maxRequests = 3, windowMs = 60000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

export async function sendContactMessage(values: z.infer<typeof contactFormSchema>) {
  try {
    // Validate input
    const validatedData = contactFormSchema.parse(values);
    
    // Rate limiting check
    if (!checkRateLimit(validatedData.email)) {
      return { 
        success: false, 
        error: 'Too many requests. Please try again later.' 
      };
    }

    // In production:
    // - Send email using Resend, SendGrid, or Nodemailer
    // - Save to database (Firebase, MongoDB, PostgreSQL)
    // - Send notification to Slack/Discord
    
    console.log('Contact message received:', validatedData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error sending contact message:', error);
    
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors[0]?.message || 'Validation failed.' 
      };
    }
    
    return { 
      success: false, 
      error: 'Failed to send message. Please try again.' 
    };
  }
}
