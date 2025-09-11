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

## Tech Stack

- Framework : Next.js
- Language : TypeScript
- Styling : Tailwind CSS
- Icons : Lucide Icons
- Package Manager : pnpm
- Linting : ESLint 9

## Installation Steps (with pnpm)

- **Clone the repo in your local**
    ```bash
    git clone https://github.com/Scaler-Innovation-Labs/Dashboard
    ```
- **Then install pnpm in your machine**

    - **macOS**
        - Using Homebrew (recommended):  
            ```bash
            brew install pnpm
            ```

        - Using Corepack :  
            ```bash
            corepack enable 
            corepack prepare pnpm@latest --activate
            ```

        - Using npm (use latest nvm):  
            ```bash
            npm i -g pnpm
            ```

    - **Windows**
        - Using Corepack :  
            ```bash
            corepack enable
            corepack prepare pnpm@latest --activate
            ```

        - Using Chocolatey :  
            ```bash
            choco install pnpm
            ```

        - Using npm (use latest nvm):  
            ```bash
            npm i -g pnpm
            ```

## Running the Project (dev & build scripts)

```bash
    # Install dependencies
    pnpm install

    # Start development server (Turbopack)
    pnpm dev

    # Build production bundle (Turbopack)
    pnpm build

    # Start production server (build & start prod server)
    pnpm start

    # Lint code
    pnpm lint
```

## Contribution Guidelines

### Getting Started
1. **Read the Code of Conduct** - All contributors must follow our community standards
2. **Install Properly** - Go through the installation process and prepare it to run on your machine

### Development Workflow
1. **Follow TypeScript strict mode** - No `any` types without explicit justification
2. **Run linting** before committing:
    ```bash
    pnpm lint
    ```
3. **Fix ALL linting errors** - No warnings allowed
4. **Test thoroughly** on multiple screen sizes and browsers (for UI changes)
5. **Commit with conventional commits**:
    ```bash
    git commit -m "feat: add student grade calculation"
    git commit -m "fix: resolve authentication redirect loop"
    ```

### Pull Request Requirements
- **Minimum 1 reviewers** required for approval
- **All checks must pass** (linting, tests, build)
- **No merge conflicts** - rebase on latest main
- **Clear PR description** with:
    - What was changed and why
    - Screenshots for any changes
    - How well it has been tested
- **Small, focused PRs** - One feature/fix per PR

### Code Standards (Strict)
- **TypeScript**: Strict mode enabled, no `any` types
- **Styling**: Tailwind CSS classes only, no inline styles
- **Components**: Must be reusable and documented

### Commit Message Format

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`  
Scopes: `auth`, `dashboard`, `ui`, `api`, `db`

## License
This project is licensed under the MIT License.  
Copyright (c) 2025 Dashboard
