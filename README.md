# TalentHub

Monorepo for the TalentHub platform.

## Structure

```
talenthub/
├── landing/    # Next.js — Marketing & public-facing site
├── app/        # Next.js — Dashboard web / backoffice
└── mobile/     # React Native (Expo) — Mobile app for users & suppliers
```

## Prerequisites

- Node.js >= 18
- npm >= 9

## Getting started

Install all dependencies from the root:

```bash
npm install
```

### Run individual workspaces

```bash
# Marketing landing page
npm run dev:landing

# Web dashboard / backoffice
npm run dev:app

# Mobile app (requires Expo CLI)
npm run dev:mobile
```

## Workspaces

| Package | Description | Tech |
|---------|-------------|------|
| `landing` | Public marketing site | Next.js 14, TypeScript, Tailwind CSS |
| `app` | Dashboard & backoffice | Next.js 14, TypeScript, Tailwind CSS |
| `mobile` | Mobile app | React Native, Expo, TypeScript |
