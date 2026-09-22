# AmakTech Solutions

Production-oriented Next.js application for AmakTech Solutions.

## Stack
- Next.js 16.3.3 App Router
- TypeScript / React
- Prisma + PostgreSQL
- Zod
- React Icons

## Local setup
1. Install Node.js 20.9+.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`.
3. For Supabase, use the project connection string from the dashboard. Prisma usually needs either:
   - Direct DB: `postgresql://postgres.<project_ref>:<password>@db.<project_ref>.supabase.co:5432/postgres?sslmode=require`
   - Transaction Pooler: `postgresql://postgres.<project_ref>:<password>@aws-1-eu-west-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require`
4. Run `npm install`.
5. Run `npx prisma generate`.
6. Run `npx prisma migrate dev --name init`.
7. Run `npm run dev` and open http://localhost:3000.

## Production
`npm run build` then `npm run start`.

## Roadmap
Admin authentication, admin dashboard, project/service/testimonial management, email notifications, media uploads, customer enquiry workflow, security hardening, Nginx/PM2/HTTPS deployment.
