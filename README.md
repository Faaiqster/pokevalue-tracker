# PokéValue Tracker

A comprehensive web application for tracking Pokémon card collection values in real-time.

## Overview

PokéValue Tracker is a mobile-friendly web application that helps Pokémon card collectors track their collection's value using real-time price data from PriceCharting and Collectr. The application features both manual card entry and image-based card detection.

## Features

- **Dashboard**: View total collection value and recently added cards
- **Card Management**: Add, edit, and delete cards in your collection
- **Price Tracking**: Real-time price data from PriceCharting and Collectr
- **Image Recognition**: Upload images to automatically detect and identify cards
- **Collection Search**: Find cards by name, set, or number
- **Price History**: Track value changes over time

## Technology Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Cloudflare D1 (SQLite-compatible)
- **Image Recognition**: TensorFlow.js and Tesseract.js
- **Deployment**: Cloudflare Pages

## Documentation

- [Deployment Guide](./deployment-guide.md): Instructions for deploying the application
- [User Guide](./user-guide.md): Comprehensive guide for end users
- [Requirements](./requirements.md): Original project requirements and specifications

## Project Structure

```
pokevalue-tracker/
├── migrations/              # Database migration files
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js pages and API routes
│   │   ├── api/             # Backend API endpoints
│   │   ├── dashboard/       # Dashboard page
│   │   ├── add-card/        # Card entry form
│   │   ├── scan/            # Image scanning interface
│   │   ├── collection/      # Collection management
│   │   ├── card/            # Card details view
│   ├── components/          # Reusable UI components
│   │   ├── layout/          # Layout components (header, footer)
│   │   ├── ui/              # UI components from shadcn/ui
│   ├── lib/                 # Utility functions
│   │   ├── price-fetchers/  # Price fetching services
│   │   ├── image-recognition/ # Card detection services
│   │   ├── test-utils/      # Testing utilities
│   ├── scripts/             # Helper scripts
├── deployment-guide.md      # Deployment instructions
├── user-guide.md            # End-user documentation
├── requirements.md          # Project requirements
└── README.md                # Project overview
```

## Getting Started

See the [Deployment Guide](./deployment-guide.md) for detailed setup instructions.

Quick start:

```bash
# Clone the repository
git clone https://github.com/your-username/pokevalue-tracker.git
cd pokevalue-tracker

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## Future Enhancements

- CSV export functionality
- Public collection sharing
- Price change notifications
- Advanced condition tracking
- Mobile application

## License

MIT
