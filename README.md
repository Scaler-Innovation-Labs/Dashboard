# SST Dashboard

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![pnpm](https://img.shields.io/badge/pnpm-managed-orange?logo=pnpm)
![Node](https://img.shields.io/badge/Node-%E2%89%A518-green?logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue)
![Build](https://img.shields.io/badge/Build-passing-brightgreen)

</div>

## Project Overview

The SST Students Dashboard is a web application for SST students to access their academic information and campus resources in one place. It provides a personalized dashboard, results/grades, announcements, and quick links to essential services, with secure authentication and a responsive UI. Built with Next.js and TypeScript, styled with Tailwind CSS, and managed with pnpm, the project focuses on speed, accessibility, and ease of contribution.

## Project Structure

```
Dashboard/
├── src/
│   ├── app/
│   │   ├── (app)/
│   │   │   └── dashboard/
│   │   │       ├── admin/
│   │   │       ├── faculty/
│   │   │       ├── student/
│   │   │       ├── layout.tsx
│   │   │       └── page.tsx
│   │   ├── (auth)/
│   │   │   └── login/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── ui/
│   ├── conf/
│   ├── db/
│   │   ├── drizzle/
│   │   ├── index.ts
│   │   ├── migerate.ts
│   │   └── schema.ts
│   ├── hook/
│   ├── lib/
│   ├── model/
│   ├── provider/
│   ├── schema/
│   ├── types/
│   └── utils/
├── public/
├── commitlint.config.js
├── components.json
├── drizzle.config.ts
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

**Key Directories Explained:**

- **`src/app/`** - Next.js App Router pages and layouts
  - `(app)/` - Protected dashboard routes
  - `(auth)/` - Authentication pages
- **`src/components/`** - Reusable UI components
  - `ui/` - shadcn/ui components
- **`src/db/`** - Database configuration and schemas
  - `drizzle/` - Migration files
- **`src/lib/`** - Utility functions and configurations
- **`src/schema/`** - Zod validation schemas
- **`src/types/`** - TypeScript type definitions
- **`src/utils/`** - Helper functions
- **`public/`** - Static assets (images, icons)

- Keep components in `src/components/`
- Database schemas in `src/db/schema.ts`
- Utilities in `src/lib/` and `src/utils/`
- Types in `src/types/`

## Tech Stack

- Framework : Next.js
- Language : TypeScript
- Database : Postgres
- ORM : Drizzle
- Styling : Tailwind CSS
- UI Library : shadcn-ui
- Data Validator : Zod
- Icons : Lucide Icons
- Package Manager : pnpm
- Linting : ESLint 9

## Getting Started

Ready to contribute or set up the project locally? Check out our detailed setup guide:

**[View Contribution Guide](./CONTRIBUTION.md)**

The contributing guide includes:

- Complete installation instructions
- Development workflow
- Database setup and management
- Code standards and guidelines
- Pull request process
- Commit conventions

## Quick Start

**Prerequisites**: Node.js 18+, PostgreSQL, pnpm

If you just want to get the project running quickly:

```bash
# Clone the repository
git clone https://github.com/Scaler-Innovation-Labs/Dashboard
cd Dashboard

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your PostgreSQL database URL

# Set up the database
pnpm db:push

# Start development server
pnpm dev
```

For detailed setup instructions, please refer to our [Contribution Guide](./CONTRIBUTION.md).

## License

This project is licensed under the MIT License.  
Copyright (c) 2025 Dashboard
