# Production Deployment Checklist

## ✅ Environment Variables Required

Add these to your production environment (.env.local or hosting platform):

```bash
# Required Stripe Configuration
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_live_webhook_secret_from_dashboard
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# Required Security
DOWNLOAD_SECRET=your-secure-random-string-for-tokens

# Optional Email Service
EMAIL_API_KEY=your_email_provider_api_key
```

## 🔧 Stripe Dashboard Setup

1. **Create Products & Prices**:
   - Update `priceId` in `src/components/maps/PricingSection.tsx:34` with your live price ID
   - Update `productId` in `src/components/maps/PricingSection.tsx:35` with your live product ID

2. **Configure Webhook**:
   - Add webhook endpoint: `https://your-domain.com/api/stripe/webhooks`
   - Enable event: `checkout.session.completed`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## 📁 File Management

1. **Create Downloads Directory**:
   ```bash
   mkdir -p public/downloads
   ```

2. **Add Your Map Files**:
   - Replace sample content in download endpoint
   - Add actual KMZ files to `public/downloads/`
   - Update product mapping in `src/app/api/download/route.ts:63-65`

## 📧 Email Integration

Update `sendDownloadEmail()` in `src/app/api/stripe/webhooks/route.ts:9-27`:
- Choose email service (SendGrid, Resend, etc.)
- Implement actual email sending
- Create email templates

## 🗄️ Database (Recommended)

Replace file-based token storage with a database:
- Update webhook to store in DB instead of files
- Update `/api/download-token` to read from DB
- Add token cleanup job for expired tokens

## 🔒 Security Enhancements

1. **Rate Limiting**: Add rate limiting to download endpoints
2. **CORS**: Configure proper CORS headers
3. **IP Whitelisting**: Whitelist Stripe webhook IPs
4. **Monitoring**: Add error monitoring (Sentry, etc.)

## 🚀 Deployment Steps

1. Set all environment variables in production
2. Deploy application 
3. Test Stripe webhook connectivity
4. Test complete purchase flow
5. Verify download links work
6. Check email delivery (if implemented)

## ⚠️ Important Notes

- Webhook signature verification is now enforced
- Download tokens expire after 7 days
- Files are cached locally (consider CDN for scale)
- Email logging is console-only (implement real service)