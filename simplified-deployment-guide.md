# PokéValue Tracker - Step-by-Step Deployment Guide for Vercel

This guide will walk you through deploying the PokéValue Tracker application to Vercel with detailed instructions for beginners.

## Prerequisites

- A GitHub account (free)
- A Vercel account (free)
- Git installed on your computer (if deploying from your local machine)

## Option 1: Deploy Directly from GitHub (Recommended)

### Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "pokevalue-tracker")
4. Choose "Public" or "Private" visibility
5. Click "Create repository"

### Step 2: Upload Files to GitHub

1. On your new repository page, click "uploading an existing file" link
2. Drag and drop all the files from the ZIP package you downloaded
3. Click "Commit changes" at the bottom of the page
4. Wait for the upload to complete

### Step 3: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in (or create an account)
2. Click "Add New..." and select "Project"
3. Connect your GitHub account if prompted
4. Find and select your "pokevalue-tracker" repository
5. Vercel will automatically detect the Next.js framework
6. Keep all default settings and click "Deploy"
7. Wait for the deployment to complete (usually 1-2 minutes)
8. Once finished, Vercel will provide you with a URL to access your website

## Option 2: Deploy from Your Local Machine

### Step 1: Extract the ZIP File

1. Extract the ZIP file to a folder on your computer
2. Open a terminal or command prompt
3. Navigate to the extracted folder:
   ```
   cd path/to/pokevalue-tracker
   ```

### Step 2: Initialize Git Repository

1. Initialize a new Git repository:
   ```
   git init
   ```
2. Add all files to the repository:
   ```
   git add .
   ```
3. Commit the files:
   ```
   git commit -m "Initial commit"
   ```

### Step 3: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in to your account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Name your repository (e.g., "pokevalue-tracker")
4. Choose "Public" or "Private" visibility
5. Click "Create repository" (do not initialize with README)
6. Follow the instructions under "…or push an existing repository from the command line"

### Step 4: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign in (or create an account)
2. Click "Add New..." and select "Project"
3. Connect your GitHub account if prompted
4. Find and select your "pokevalue-tracker" repository
5. Vercel will automatically detect the Next.js framework
6. Keep all default settings and click "Deploy"
7. Wait for the deployment to complete (usually 1-2 minutes)
8. Once finished, Vercel will provide you with a URL to access your website

## Troubleshooting

### If the deployment fails:

1. Check the Vercel logs for specific error messages
2. Make sure all files were properly uploaded to GitHub
3. Verify that the package.json file is in the root directory
4. Try deploying again after fixing any issues

### If you see dependency errors:

1. In the Vercel dashboard, go to your project settings
2. Click on "General" and find "Build & Development Settings"
3. Set the "Install Command" to: `npm install --legacy-peer-deps`
4. Redeploy the project

## Accessing Your Website

After successful deployment, your website will be available at:
- `https://pokevalue-tracker-[username].vercel.app` (default)
- Or a custom domain if you set one up in Vercel settings

## Making Updates

To update your website after deployment:

1. Make changes to your files locally
2. Commit and push the changes to GitHub:
   ```
   git add .
   git commit -m "Update description"
   git push
   ```
3. Vercel will automatically deploy the changes

## Setting Up a Custom Domain (Optional)

1. In the Vercel dashboard, go to your project
2. Click on "Settings" and then "Domains"
3. Add your domain and follow the instructions to configure DNS settings

## Need Help?

If you encounter any issues during deployment, you can:
- Check the [Vercel documentation](https://vercel.com/docs)
- Visit the [Next.js deployment guide](https://nextjs.org/docs/deployment)
- Contact Vercel support through their dashboard
