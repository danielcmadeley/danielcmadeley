# Email Subscription Setup

This document provides complete setup instructions for the email subscription functionality using Resend and React Email.

## Overview

The email subscription system allows users to subscribe to the newsletter via the footer form and automatically sends them a welcome email using Resend's transactional email service.

## Features

- ✅ Newsletter subscription form in footer
- ✅ Email validation (client and server-side)
- ✅ Welcome email with React Email templates
- ✅ Vercel Edge Functions for serverless email sending
- ✅ Error handling and user feedback
- ✅ Professional email design

## Setup Instructions

### 1. Resend Account Setup

1. **Create Resend Account**
   - Go to [resend.com](https://resend.com)
   - Sign up for a free account
   - Verify your email address

2. **Get API Key**
   - Navigate to [API Keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Give it a name (e.g., "Daniel Madeley Newsletter")
   - Copy the API key (starts with `re_`)

3. **Verify Domain**
   - Go to [Domains](https://resend.com/domains)
   - Add your domain: `madeleydesignstudio.com`
   - Follow DNS setup instructions
   - Verify the domain is active

### 2. Environment Variables

Create a `.env` file in your project root:

```bash
# Resend API Key
RESEND_API_KEY=re_your_actual_api_key_here
```

### 3. Vercel Deployment

1. **Add Environment Variable in Vercel Dashboard**
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add `RESEND_API_KEY` with your actual API key
   - Set it for Production, Preview, and Development environments

2. **Deploy**
   ```bash
   bun run build
   vercel --prod
   ```

### 4. DNS Configuration

For the sender email `mail@madeleydesignstudio.com` to work properly, add these DNS records:

```
Type: TXT
Name: @
Value: v=spf1 include:_spf.resend.com ~all

Type: TXT  
Name: _dmarc
Value: v=DMARC1; p=quarantine; rua=mailto:dmarc@madeleydesignstudio.com

Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.com
```

## Testing

### Local Development

1. **Start Development Server**
   ```bash
   bun run dev
   ```

2. **Test the Form**
   - Navigate to any page (footer is on all pages)
   - Enter your email in the footer subscription form
   - Click "Subscribe"
   - Check console logs for email sending status

### Production Testing

1. **Test on Live Site**
   - Go to your deployed site
   - Use the subscription form
   - Check your email inbox for the welcome message

2. **Monitor Logs**
   - Check Vercel Function logs in dashboard
   - Check Resend dashboard for email delivery status

## File Structure

```
api/
└── subscribe.ts              # Vercel serverless function for subscriptions
src/
├── components/
│   └── Footer.astro          # Newsletter subscription form
└── emails/
    └── WelcomeEmail.tsx      # React Email welcome template
```

## API Endpoint

**POST** `/api/subscribe` (Vercel Serverless Function)

Request body:
```json
{
  "email": "user@example.com"
}
```

Success response:
```json
{
  "message": "Successfully subscribed! Check your email for a welcome message.",
  "id": "email_id_from_resend"
}
```

Error response:
```json
{
  "error": "Invalid email format"
}
```

## Email Template

The welcome email includes:
- Professional greeting
- Overview of newsletter content
- Call-to-action button to blog
- Footer with unsubscribe info
- Responsive design

## Security & Best Practices

- ✅ Email validation on client and server
- ✅ Rate limiting via Vercel Edge Functions
- ✅ Environment variables for sensitive data
- ✅ Error handling for all edge cases
- ✅ CORS properly configured
- ✅ SPF/DKIM/DMARC records for deliverability

## Troubleshooting

### Common Issues

1. **500 Internal Server Error**
   - Check if `RESEND_API_KEY` is set correctly in Vercel environment variables
   - Verify the API key is valid and active
   - Check Vercel function logs in the Functions tab

2. **Email Not Sending**
   - Verify domain is verified in Resend dashboard
   - Check DNS records are properly configured
   - Ensure sender email matches verified domain
   - Check Vercel function logs for detailed error messages

3. **Email in Spam**
   - Configure SPF, DKIM, and DMARC records
   - Use a verified domain
   - Avoid spam trigger words in subject/content

4. **Function Not Found**
   - Ensure the `api/subscribe.ts` file exists in the root directory
   - Check that the function is properly deployed to Vercel
   - Verify the function appears in the Vercel Functions dashboard

### Debug Steps

1. **Check Environment Variables**
   ```bash
   # In Vercel dashboard
   Settings > Environment Variables
   # Ensure RESEND_API_KEY is set for all environments
   ```

2. **Check Function Logs**
   ```bash
   # In Vercel dashboard
   Functions > View Function Logs
   # Look for the subscribe function and check its logs
   ```

3. **Test API Endpoint Directly**
   ```bash
   curl -X POST https://yoursite.com/api/subscribe \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com"}'
   ```

4. **Local Development Testing**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Test function locally
   vercel dev
   # Then test http://localhost:3000/api/subscribe
   ```

## Monitoring

- Monitor email delivery rates in Resend dashboard
- Track subscription success/failure rates
- Monitor Vercel function performance and errors
- Set up alerts for failed email sends

## Future Enhancements

- Add double opt-in confirmation
- Create unsubscribe functionality
- Add email templates for different purposes
- Implement email analytics tracking
- Add A/B testing for email content
- Create admin dashboard for subscriber management

## Support

For issues with:
- **Resend**: [Resend Documentation](https://resend.com/docs)
- **React Email**: [React Email Documentation](https://react.email/docs)
- **Vercel**: [Vercel Documentation](https://vercel.com/docs)

## Cost Considerations

- **Resend**: Free tier includes 3,000 emails/month
- **Vercel**: Serverless Functions included in free tier (100GB-hours execution time)
- **No database costs** (simple transactional email only)

This setup provides a professional, scalable email subscription system that will work reliably in production.