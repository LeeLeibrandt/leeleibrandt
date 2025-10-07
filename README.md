# Lee Leibrandt - Portfolio

Professional portfolio website showcasing my work as a Software Engineer.

## Setup Instructions

### 1. Install Netlify CLI (if deploying locally)
```bash
npm install -g netlify-cli
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):
```bash
cp .env.example .env
```

Then add your EmailJS credentials to `.env`:
- `EMAILJS_SERVICE_ID` - Your EmailJS service ID
- `EMAILJS_TEMPLATE_ID` - Your EmailJS template ID
- `EMAILJS_PUBLIC_KEY` - Your EmailJS public key
- `EMAILJS_PRIVATE_KEY` - Your EmailJS private key

Get these from: https://dashboard.emailjs.com/admin

### 3. Deploy to Netlify

#### Option A: Deploy via Netlify UI
1. Push your code to GitHub
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repository
5. Add environment variables in: Site settings → Environment variables
6. Deploy!

#### Option B: Deploy via CLI
```bash
netlify login
netlify init
netlify deploy --prod
```

Add environment variables via CLI:
```bash
netlify env:set EMAILJS_SERVICE_ID "your_value"
netlify env:set EMAILJS_TEMPLATE_ID "your_value"
netlify env:set EMAILJS_PUBLIC_KEY "your_value"
netlify env:set EMAILJS_PRIVATE_KEY "your_value"
```

### 4. Test Locally
```bash
netlify dev
```

## Security Notes

- **Never commit `.env`** - It's already in `.gitignore`
- All email credentials are stored securely in environment variables
- The serverless function runs on Netlify's servers, keeping credentials hidden from the browser

## Contact Form

The contact form uses a secure serverless function to send emails via EmailJS. No credentials are exposed to the browser.
