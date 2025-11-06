## Personal Portfolio - Futuristic Tron Style

This is a personal portfolio built with [Next.js](https://nextjs.org), featuring a futuristic Tron-inspired design. The MVP showcases:

- **Your name, photo, and short bio**
- **Static links to your social networks**
- **A grid of web development and cybersecurity projects**
- **Reusable React components** (`Header`, `SocialLinks`, `Projects`)
- **Modern UI with Flexbox, CSS Grid, and custom global styles**
- **Google Fonts: Orbitron & Roboto** for a cyber look

---
## Getting Started

First, install dependencies and run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


Main files to customize:
- `src/app/page.js` (main page layout)
- `src/components/Header.js` (name, photo, bio)
- `src/components/SocialLinks.js` (social media links)
- `src/components/Projects.js` (project cards)
- `src/app/globals.css` (global Tron-like styles)


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Orbitron](https://fonts.google.com/specimen/Orbitron) and [Roboto](https://fonts.google.com/specimen/Roboto) for a futuristic look.


---

## Customization & Deployment

- Update your photo in `public/file.svg` or replace with your own image
- Edit your bio and social links in the respective components
- Add or modify projects in `Projects.js`

To deploy, use [Vercel](https://vercel.com/) or your preferred platform. See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

---

## Prisma (database) — quick setup

This project includes a minimal Prisma setup to store `Project` and `Contact` records using SQLite during development. The following steps explain how to initialize and use Prisma locally.

1. Install dev dependency (already present in `devDependencies`):

```powershell
npm install prisma --save-dev
# (or if you prefer yarn/pnpm)
```

2. Ensure `@prisma/client` is installed (should be in `dependencies`):

```powershell
npm install @prisma/client
```

3. Create or edit `.env` in project root and set the database URL (SQLite example):

```text
DATABASE_URL="file:./dev.db"
```

4. Update your Prisma schema if you edit models. The schema file is at `prisma/schema.prisma`.

5. Run Prisma generate (build the client used by the app):

```powershell
npx prisma generate
```

6. Create a migration and apply it (for SQLite dev):

```powershell
npx prisma migrate dev --name init
```

7. (Optional) Open Prisma Studio to inspect data in the browser:

```powershell
npx prisma studio
```

8. Example usage from code (already included in the repo):

- `src/lib/prisma.js` — single Prisma client instance export.
- `src/server/project.js` — Project CRUD helpers.
- `src/server/contact.js` — Contact CRUD helpers.

You can run the demo script that uses these helpers:

```powershell
node index.js
```

If you change the Prisma schema (models), re-run `npx prisma generate` and create/apply a new migration so the generated client and database are in sync.

Troubleshooting
- If you get "@prisma/client did not initialize yet", run `npx prisma generate` and ensure `@prisma/client` is installed.
- If migrations fail, double-check `DATABASE_URL` and that the `prisma` folder exists with `schema.prisma`.

