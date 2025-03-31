# PokéValue Tracker Deployment Guide

This document provides instructions for deploying the PokéValue Tracker application.

## Prerequisites

- Node.js 18+ and npm/pnpm installed
- Git for version control
- A Cloudflare account (for deployment)

## Local Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/pokevalue-tracker.git
   cd pokevalue-tracker
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Start the development server:
   ```
   pnpm dev
   ```

4. Access the application at http://localhost:3000

## Production Deployment

The PokéValue Tracker application is configured for deployment to Cloudflare Pages, which provides:
- Global CDN distribution
- Automatic HTTPS
- CI/CD integration with GitHub

### Deployment Steps

1. Build the application for production:
   ```
   pnpm build
   ```

2. Deploy using Wrangler:
   ```
   pnpm wrangler pages deploy .next
   ```

3. Configure environment variables in the Cloudflare dashboard:
   - `NODE_ENV`: Set to "production"
   - `API_KEY`: Your API key for external services (if applicable)

## Database Setup

For production deployment, you'll need to set up a proper database:

1. Create a D1 database in Cloudflare:
   ```
   wrangler d1 create pokevalue-db
   ```

2. Update the wrangler.toml file with your database ID

3. Apply migrations:
   ```
   wrangler d1 migrations apply --production
   ```

## Post-Deployment Verification

After deployment, verify the following:

1. All pages load correctly
2. Authentication works
3. Card management functions properly
4. Price fetching from external sources works
5. Image recognition functions as expected

## Troubleshooting

If you encounter issues during deployment:

1. Check Cloudflare logs for errors
2. Verify environment variables are set correctly
3. Ensure database migrations have been applied
4. Check for CORS issues with external APIs

## Maintenance

Regular maintenance tasks:

1. Update dependencies periodically
2. Monitor API rate limits for external services
3. Backup database regularly
4. Check for security updates
