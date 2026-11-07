# AmakTech Solutions

The AmakTech Solutions website and content-management application. It is built with Next.js App Router and TypeScript, with PostgreSQL persistence through Prisma.

## Features

- Public pages for the company, services, projects, technologies, and contact enquiries.
- AI assistant backed by the Google Gemini API.
- Admin area for managing enquiries, services, projects, testimonials, and media.
- PostgreSQL data models and migrations managed with Prisma.
- Optional SMTP delivery for contact enquiry notifications.

## Technology

- Next.js 16 and React
- TypeScript
- Prisma ORM and PostgreSQL
- Zod validation
- Google Gemini API
- Nodemailer

## Requirements

- Node.js 20.9 or later
- npm
- A PostgreSQL database

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your local environment file from the example:

   ```bash
   cp .env.example .env
   ```

   On Windows PowerShell, use `Copy-Item .env.example .env`.

3. Configure the environment variables described below. At minimum, set a valid `DATABASE_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`.

4. Generate the Prisma client and apply the development migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | PostgreSQL connection string used by Prisma. |
| `AUTH_SECRET` | Yes | Secret used to sign admin authentication tokens. Use a unique, random value. |
| `ADMIN_EMAIL` | Yes | Email address used to sign in to the admin area. |
| `ADMIN_PASSWORD` | Yes | Password used to sign in to the admin area. |
| `GEMINI_API_KEY` | For AI assistant | API key for Google Gemini. |
| `GEMINI_MODEL` | No | Gemini model name; the application uses its built-in default when omitted. |
| `SMTP_HOST` | For email notifications | SMTP server hostname. |
| `SMTP_PORT` | No | SMTP server port; defaults to `587`. |
| `SMTP_USER` | For email notifications | SMTP account username. |
| `SMTP_PASSWORD` | For email notifications | SMTP account password. |
| `CONTACT_TO_EMAIL` | For email notifications | Recipient for contact enquiry notifications. |

Keep credentials in `.env` or your deployment platform's secret manager. Do not commit credentials or production environment files.

## Useful commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run lint` | Run ESLint. |
| `npm run build` | Create a production build. |
| `npm run start` | Serve the production build. |
| `npx prisma generate` | Generate the Prisma client. |
| `npx prisma migrate dev` | Create or apply migrations during development. |
| `npx prisma migrate deploy` | Apply committed migrations in a deployment environment. |

## Deployment

Configure the required environment variables and a reachable PostgreSQL database in your hosting environment. Apply committed migrations before starting the application:

```bash
npx prisma migrate deploy
npm run build
npm run start
```

The host must provide Node.js 20.9 or later. Set secrets through the host's environment configuration rather than committing them to the repository.

## Project layout

```text
app/          Public pages, admin pages, and API routes
components/   Shared React UI components
lib/          Database, authentication, validation, email, and AI helpers
prisma/       Prisma schema and database migrations
public/       Static assets
```
