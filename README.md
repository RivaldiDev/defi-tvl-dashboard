<div align="center">

# DeFi Pulse

**DeFi protocol analytics dashboard showing Total Value Locked across 200+ protocols and chains.**

[![Tech Stack](https://skillicons.dev/icons?i=nextjs,typescript,tailwind,github&theme=dark&perline=4)](https://skillicons.dev)

![Next.js](https://img.shields.io/badge/Next.js_16-App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Components-000000?style=for-the-badge)
![DeFi_Llama-API-purple](https://img.shields.io/badge/DeFi_Llama--API--purple)

[![GitHub](https://img.shields.io/badge/Source_Code-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/RivaldiDev/defi-tvl-dashboard)
[![Vercel](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://defi-tvl-dashboard-weld.vercel.app)

[Overview](#overview) · [Features](#features) · [Tech Stack](#tech-stack) · [API](#api) · [Getting Started](#getting-started) · [Architecture](#architecture)

</div>

---

## Overview

DeFi protocol analytics dashboard showing Total Value Locked across 200+ protocols and chains.

Built with **Next.js 16** (App Router, TypeScript), **shadcn/ui** component library, **Tailwind CSS**, and **Framer Motion** for animations. All data is fetched client-side from free public APIs — no API keys required, no backend server.

## Features

| Area | What it does |
| --- | --- |
| **Protocol Rankings** | Top 50 DeFi protocols by TVL with protocol icons from DeFi Llama. |
| **Category Filters** | Filter by Staking, Lending, DEX, Bridge categories. |
| **TVL Tracking** | Total TVL across all chains with 1d/7d/1m change percentages. |
| **Chain Distribution** | Chain badges showing which chains each protocol supports. |
| **UI/UX** | Purple/pink gradient dark theme with animated data bars. |

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | Next.js 16 (App Router, TypeScript) |
| **UI Components** | shadcn/ui (Radix + Tailwind) |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **API** | DeFi Llama API (Free, No API Key) |
| **Deployment** | Vercel |

## API

This project uses **DeFi Llama API** — completely free, no authentication required.

| Endpoint | Purpose |
| --- | --- |
| Free tier | No rate limiting for reasonable usage |
| No API key | Direct fetch from browser |
| CORS | Enabled for client-side requests |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/RivaldiDev/defi-tvl-dashboard.git
cd defi-tvl-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Architecture

```
src/
├── app/
│   ├── layout.tsx        # Root layout with metadata
│   ├── page.tsx          # Main dashboard page (client component)
│   └── globals.css       # Tailwind CSS globals
├── components/
│   ├── header.tsx        # Sticky header with branding
│   ├── stat-card.tsx     # Stat card with trend indicator
│   ├── category-tabs.tsx # Filter tabs for protocol categories
│   ├── protocol-table.tsx# Protocol ranking table
│   └── ui/               # shadcn/ui components (Card, Badge, etc.)
└── lib/
    ├── api.ts            # API fetch functions with caching
    ├── types.ts          # TypeScript types and category helpers
    └── utils.ts          # Utility functions (cn helper)
```

## Deployment

This project is deployed on **Vercel** with automatic deployments from the `main` branch.

```bash
# Deploy to Vercel
npx vercel --prod
```

---

<div align="center">

![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>
