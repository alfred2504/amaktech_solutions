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
3. Run `npm install`.
4. Run `npx prisma generate`.
5. Run `npx prisma migrate dev --name init`.
6. Run `npm run dev` and open http://localhost:3000.

## Production
`npm run build` then `npm run start`.

## Roadmap
Admin authentication, admin dashboard, project/service/testimonial management, email notifications, media uploads, customer enquiry workflow, security hardening, Nginx/PM2/HTTPS deployment.
