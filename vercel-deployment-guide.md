# Vercel Deployment Guide for PokéValue Tracker

This guide will walk you through deploying the PokéValue Tracker application to Vercel for permanent hosting.

## Prerequisites

- A GitHub account
- A Vercel account (free tier is sufficient)

## Step 1: Push the Code to GitHub

1. Create a new GitHub repository:
   - Go to https://github.com/new
   - Name your repository (e.g., "pokevalue-tracker")
   - Choose public or private visibility
   - Click "Create repository"

2. Initialize and push your local repository:
   ```bash
   cd /path/to/pokevalue-tracker
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/pokevalue-tracker.git
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. Log in to your Vercel account at https://vercel.com/

2. Click "Add New..." and select "Project"

3. Import your GitHub repository:
   - Connect your GitHub account if not already connected
   - Select the "pokevalue-tracker" repository
   - Click "Import"

4. Configure the project:
   - Vercel will automatically detect the Next.js framework
   - The default settings should work fine as we've included a vercel.json file
   - You can customize the project name if desired
   - Leave all other settings at their defaults

5. Click "Deploy"

6. Wait for the deployment to complete (usually takes 1-2 minutes)

7. Once deployed, Vercel will provide you with a URL (e.g., https://pokevalue-tracker.vercel.app)

## Step 3: Configure Custom Domain (Optional)

If you want to use a custom domain:

1. From your project dashboard, click "Settings" > "Domains"

2. Add your domain and follow the instructions to configure DNS settings

## Automatic Deployments

Vercel automatically deploys updates when you push changes to your GitHub repository. To update your site:

1. Make changes to your local code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update description"
   git push
   ```
3. Vercel will automatically deploy the changes

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs in the Vercel dashboard
2. Ensure all dependencies are correctly specified in package.json
3. Verify that the vercel.json configuration is correct
4. Check that the application works locally with `npm run build && npm start`

## Additional Resources

- Vercel Documentation: https://vercel.com/docs
- Next.js Deployment Guide: https://nextjs.org/docs/deployment
