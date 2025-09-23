# Contributing to SST Dashboard

This contribution guide will help you get started with setting up the Dashboard locally and understanding our contribution process.

## Table of Contents

- [Installation & Setup](#installation--setup)
- [Development Workflow](#development-workflow)
- [Database Management](#database-management-drizzle-scripts)
- [Code Standards](#code-standards)
- [API Response & Error Handling](#api-response--error-handling)
- [Pull Request Process](#pull-request-process)
- [Commit Guidelines](#commit-guidelines)

## Installation & Setup

### Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js 18 or higher** - [Download from nodejs.org](https://nodejs.org/)
- **PostgreSQL** - Database server ([Download from postgresql.org](https://www.postgresql.org/download/))
- **Git** - Version control system

### Step 1: Clone the Repository

```bash
git clone https://github.com/Scaler-Innovation-Labs/Dashboard
cd Dashboard
```

### Step 2: Install pnpm

We use pnpm as our package manager. Install it using one of the following methods:

#### macOS

- **Using Homebrew (recommended):**

  ```bash
  brew install pnpm
  ```

- **Using Corepack:**

  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

- **Using npm:**
  ```bash
  npm i -g pnpm
  ```

#### Windows

- **Using Corepack:**

  ```bash
  corepack enable
  corepack prepare pnpm@latest --activate
  ```

- **Using Chocolatey:**

  ```bash
  choco install pnpm
  ```

- **Using npm:**
  ```bash
  npm i -g pnpm
  ```

### Step 3: Install Dependencies

```bash
pnpm install
```

### Step 4: Environment Setup

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=your_postgresql_connection_string
```

Replace `your_postgresql_connection_string` with your actual PostgreSQL connection string.

### Step 5: Database Setup

```bash
# Generate migration files from schema
pnpm db:generate

# Run the migrations
pnpm db:migrate
```

### Step 6: Start Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Development Workflow

### Available Scripts

```bash
# Start development server (Turbopack)
pnpm dev

# Build production bundle (Turbopack)
pnpm build

# Start production server (build & start prod server)
pnpm start

# Lint code
pnpm lint
```

### Database Management (Drizzle Scripts)

Our project uses Drizzle ORM with PostgreSQL for database management. Here are the available database scripts:

#### Database Setup & Migration Scripts

```bash
# Generate migration files from schema changes
pnpm db:generate

# Push schema changes directly to database
pnpm db:push

# Run pending migrations
pnpm db:migrate

# Pull schema from existing database
pnpm db:pull
```

#### Database Development Tools

```bash
# Open Drizzle Studio (database GUI)
pnpm db:studio

# Reset database (drop, push schema, migrate)
pnpm db:reset

# Drop all tables
pnpm db:drop
```

#### Database Workflow

1. **Make schema changes** in `src/db/schema.ts`
2. **Generate migration** with `pnpm db:generate`
3. **Review generated files** in `src/db/drizzle/`
4. **Apply migrations** with `pnpm db:migrate`
5. **Use Studio** (`pnpm db:studio`) to inspect data

## Code Standards

### TypeScript

- **Strict mode enabled** - No `any` types without explicit justification
- Use proper type definitions for all variables and functions
- Prefer interfaces over types when possible

### Styling

- **Tailwind CSS classes only** - No inline styles
- Use consistent spacing and color schemes
- Follow responsive design principles

### Components

- **Must be reusable and documented**
- Use proper prop types and interfaces
- Follow React best practices (hooks, functional components)

## API Response & Error Handling

We use typed, consistent API responses across all endpoints via `ApiResponse<T>`, `ApiError`, and `HttpStatus` from `src/types/api.ts`.

### Import

```ts
import { ApiResponse, ApiError, HttpStatus } from "@/types/api";
```

### Example of Using Success Response (2xx)

```ts
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";
import { HttpStatus } from "@/constants/HttpStatus";

export async function GET() {
  const res = ApiResponse.success(HttpStatus.OK, "User fetched successfully", {
    id: "123",
    name: "John Doe",
  });
  return NextResponse.json(res, { status: res.statusCode });
}
```

### Example of Using Error Response (4xx/5xx)

```ts
import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";
import { HttpStatus } from "@/constants/HttpStatus";

export async function POST() {
  const res = ApiResponse.error(HttpStatus.BAD_REQUEST, "Validation failed", [
    {
      code: "VALIDATION_ERROR",
      message: "Email is required",
      details: { field: "email" },
    },
  ]);
  return NextResponse.json(res, { status: res.statusCode });
}
```

### Rules & Guidelines

- Always return `NextResponse.json(response, { status: response.statusCode })`.
- Use `ApiResponse.success` for all 2xx; use `ApiResponse.error` for 4xx/5xx.
- Prefer `HttpStatus` enum over raw numbers to avoid typos.

### Standard Status Codes

- **200 OK**: Successful response
- **201 Created**: Resource created
- **204 No Content**: Success with no response body
- **400 Bad Request**: Invalid input/shape
- **401 Unauthorized**: Auth failure
- **403 Forbidden**: Permission failure
- **404 Not Found**: Resource missing
- **409 Conflict**: Duplicate/constraint conflict
- **422 Unprocessable Entity**: Business rule/validation failure
- **500 Internal Server Error**: Unexpected server error
- **503 Service Unavailable**: Downstream service/database unavailable

### Shape (for reference)

Success:

```json
{
  "success": true,
  "statusCode": 200,
  "message": "User fetched successfully",
  "data": { "id": "123", "name": "John Doe" }
}
```

Error:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Email is required",
      "details": { "field": "email" }
    }
  ]
}
```

## Pull Request Process

### Before Submitting a PR

1. **Read the Code of Conduct** - All contributors must follow our community standards
2. **Install Properly** - Go through the installation process and prepare it to run on your machine
3. **Run linting** before committing:
   ```bash
   pnpm lint
   ```
4. **Fix ALL linting errors** - No warnings allowed
5. **Test thoroughly** on multiple screen sizes and browsers (for UI changes)

### PR Requirements

- **Minimum 1 reviewers** required for approval
- **All checks must pass** (linting, tests, build)
- **No merge conflicts** - rebase on latest main
- **Clear PR description** with:
  - What was changed and why
  - Screenshots for any UI changes
  - How well it has been tested
- **Small, focused PRs** - One feature/fix per PR

### PR Template

When creating a pull request, please include:

```markdown
## Description

Brief description of what this PR does.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Tested on multiple browsers
- [ ] Tested on different screen sizes
- [ ] All existing tests pass

## Screenshots (if applicable)

Add screenshots here for UI changes.

## Checklist

- [ ] Code follows the project's style guidelines
- [ ] Self-review completed
- [ ] No linting errors
- [ ] Documentation updated (if needed)
```

## Commit Guidelines

We follow the conventional commit format with specific type requirements. Use this structure for all commits:

```bash
# Format: <type>(<scope>): <description>

# Types: `feat`, `fix`, `chore`, `hotfix` (only these 4 are allowed)
# Scopes: `auth`, `dashboard`, `ui`, `api`, `db`, etc
```

### Important Rules

1. **Only 4 commit types allowed**: `feat`, `fix`, `chore`, `hotfix`
2. **Capitalize words in commit messages**: Use proper capitalization like "Updated Readme File",

### Examples

```bash
# Feature example
git commit -m "feat(grades): Implement Student Grade Calculation System"

# Bug fix example
git commit -m "fix(auth): Resolve Infinite Redirect Loop In Login Flow"

# Documentation update
git commit -m "chore(docs): Update Installation Instructions In Contribution.md"

# Hotfix example
git commit -m "hotfix(api): Fix Critical Database Connection Issue"

# Maintenance task
git commit -m "chore(deps): Update Dependencies And Security Patches"
```

### Commit Types

- `feat`: New feature or functionality
- `fix`: Bug fix or issue resolution
- `chore`: Maintenance tasks, documentation updates, dependency updates
- `hotfix`: Critical fixes that need immediate deployment

### Common Scopes

- `auth`: Authentication related changes
- `dashboard`: Dashboard functionality
- `ui`: User interface components
- `api`: API endpoints and logic
- `db`: Database schema and queries
- `config`: Configuration changes
- `docs`: Documentation updates

## Getting Help

If you need help or have questions:

1. Check existing issues and discussions
2. Contact the maintainers or Contributors
   - Harsh Prakash : harsh.prakash@scaler.com (Maintainer)
   - Harsh Kumar : harsh.23bcs10021@sst.scaler.com
   - Debashis Maharana : debashis.23bcs10209@sst.scaler.com
   - Abhinav Kumar Jha : abhinav.23bcs10045@sst.scaler.com
