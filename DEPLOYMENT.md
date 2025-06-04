# Deployment Guide

This guide explains how to deploy the DOGS application to Vercel.

## Prerequisites

- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub/GitLab/Bitbucket account (recommended for automatic deployments)
- PostgreSQL database (can be hosted on services like Supabase, Railway, or Vercel Postgres)

## Environment Variables

Before deploying, make sure to set up the following environment variables in your Vercel project:

```
DATABASE_URL=your_postgres_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=your_vercel_app_url
```

## Deployment Steps

### 1. Push your code to a Git repository

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-git-repo-url
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and log in
2. Click "Add New" > "Project"
3. Import your Git repository
4. Vercel will automatically detect it's a Next.js app
5. Add your environment variables in the project settings
6. Click "Deploy"

### 3. Configure Custom Domain (Optional)

1. Go to your project in Vercel
2. Navigate to "Domains" in the project settings
3. Add your custom domain and follow the verification steps

## Post-Deployment

After deployment, make sure to:

1. Set up a production database if you haven't already
2. Run any necessary database migrations
3. Test all major functionality in the production environment

## Troubleshooting

- If you get database connection errors, double-check your `DATABASE_URL`
- For authentication issues, verify your `NEXTAUTH_SECRET` and `NEXTAUTH_URL`
- Check the Vercel deployment logs for any build or runtime errors
