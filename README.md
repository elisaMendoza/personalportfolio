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
