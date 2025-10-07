# Lee Leibrandt - Portfolio

Professional portfolio website showcasing my work as a Software Engineer.

## EmailJS Security Setup

To protect your email service from abuse:

### 1. Enable Domain Restrictions in EmailJS

1. Go to https://dashboard.emailjs.com/admin/account
2. Under **"Allowed Origins"**, add your domain:
   - For production: `https://your-domain.com`
   - For testing locally: `http://localhost:*` or `http://127.0.0.1:*`
3. Click **Save**

This prevents anyone from using your public key on other websites.

### 2. Enable reCAPTCHA (Optional but Recommended)

1. Go to https://dashboard.emailjs.com/admin/account
2. Scroll to **"Security"**
3. Enable **"reCAPTCHA v3"**
4. Get your reCAPTCHA site key from Google
5. Add it to EmailJS settings

This blocks bots from abusing your email service.

### 3. Monitor Usage

- Check your EmailJS dashboard regularly for unusual activity
- Set up usage alerts in EmailJS settings
- EmailJS free tier: 200 emails/month

## Local Development

Simply open `index.html` in your browser or use a local server:

```bash
# Python 3
python -m http.server 8080

# Node.js
npx http-server -p 8080
```

Then visit: `http://localhost:8080`

## Deployment

Deploy to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Any web host

**After deploying, remember to add your production domain to EmailJS Allowed Origins!**

## How It Works

The contact form uses EmailJS with:
- ✅ Public key visible in code (by design - it's meant to be public)
- ✅ Domain restrictions prevent unauthorized use
- ✅ reCAPTCHA blocks bots
- ✅ No backend server needed
