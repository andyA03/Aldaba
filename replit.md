# Aldaba Trinidad - Tourism Website

## Overview
Responsive pure web application for Aldaba, a tourism and cultural services company in Trinidad and Valle de los Ingenios, Cuba. The site showcases accommodation, gastronomy, excursions, events, and cultural services. Includes a standalone admin panel for hostel management.

## Architecture
- **Frontend**: React 19 + Vite 8 + React Router DOM v7, pure HTML/CSS web app (NO React Native/Expo)
- **Backend**: Express.js on port 3001 serving API and admin panel
- **Frontend port**: 5000 (Vite dev server, webview)
- **Backend port**: 3001 (Express API + admin panel)
- **Admin Panel**: Standalone HTML page at `/admin` (served by Express, proxied via Vite)
- **Navigation**: Fixed 64px top nav bar (logo left + text links right); mobile hamburger menu
- **State**: Local state only (no database needed, promotional content site)
- **Icons**: lucide-react
- **Fonts**: Playfair Display (headings) + DM Sans (body) — loaded from Google Fonts via CSS
- **Responsiveness**: Content max-width 900px centered, CSS Grid/Flexbox, window.innerWidth for JS breakpoints
- **Colors**: Defined in `client/src/colors.ts`

## Color Palette (Blue Theme)
- Primary: #1B4F8A (deep navy blue)
- PrimaryLight: #2563EB (bright blue)
- Secondary: #0EA5E9 (sky blue)
- Accent: #06B6D4 (cyan)
- Background: #C2D9EE (light blue)
- Card: #FFFFFF
- Text: #0C1524 (dark navy)

## Key Files
- `constants/data.ts` - All content data: accommodations, gastronomy, excursions, events, community projects
- `constants/colors.ts` - Blue theme color palette (original, kept for reference)
- `client/src/colors.ts` - Web color palette (used by all client components)
- `client/src/styles/global.css` - Google Fonts import, CSS reset, utility classes, responsive grid
- `client/src/App.tsx` - React Router routes (5 pages)
- `client/src/components/NavBar.tsx` - Fixed top nav with mobile hamburger
- `client/src/components/Footer.tsx` - Company footer with UCI credit
- `client/src/components/Modal.tsx` - Service request modal with form
- `client/src/pages/Home.tsx` - Carousel (CSS-based, 5 slides, auto-scroll), quick access, highlights, CTA
- `client/src/pages/Services.tsx` - Tabs (Alojamiento/Gastronomía) + cards + modal
- `client/src/pages/Excursions.tsx` - Excursion cards with duration badge + modal
- `client/src/pages/Events.tsx` - Event spaces + cultural services + other services
- `client/src/pages/About.tsx` - Company info, mission, values, timeline, contact
- `server/templates/admin.html` - Admin panel (CRUD, localStorage)
- `server/index.ts` - Express server (port 3001)
- `vite.config.ts` - Vite config (root: client, port 5000, proxy /api /admin → 3001)

## Image Strategy
All images use picsum.photos placeholder URLs with descriptive seeds.
To replace with real photos: search `picsum.photos/seed/` in each page file.
- Carousel: `SLIDES` array in `Home.tsx`
- Section headers: `backgroundImage` style in each page
- Cards: `ACCOMMODATION_IMAGES`, `GASTRONOMY_IMAGES`, `EXCURSION_IMAGES`, `EVENT_IMAGES`, `CULTURAL_IMAGES` objects

## Workflows
- **Start Frontend**: `npx vite` → Vite dev server on port 5000 (webview)
- **Start Backend**: `PORT=3001 npm run server:dev` → Express on port 3001 (console)

## Recent Changes
- 2026-03-20: Full conversion from Expo React Native to pure React + Vite web app
- 2026-03-19: Added background images to service/excursion/event section headers
- 2026-03-19: Blue color palette, responsive desktop layout, image carousel, UCI footer
- 2026-02-08: Added standalone admin panel for hostel management at /admin route

## User Preferences
- Spanish language content
- Blue color palette (pleasant for the eye)
- Focus on cultural heritage and tourism promotion
- Web-first design with desktop and mobile responsiveness
- Universidad de las Ciencias Informáticas credited in footer
