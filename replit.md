# Aldaba Trinidad - Tourism Website

## Overview
Responsive web application for Aldaba, a tourism and cultural services company in Trinidad and Valle de los Ingenios, Cuba. The site showcases accommodation, gastronomy, excursions, events, and cultural services. Also includes a standalone admin panel for hostel management.

## Architecture
- **Frontend**: Expo React Native Web with Expo Router (file-based routing), responsive desktop + mobile
- **Backend**: Express.js serving API, landing page, and admin panel
- **Admin Panel**: Standalone React HTML page at `/admin` (port 5000) for hostel CRUD
- **Navigation**: Web → top horizontal nav bar (logo left + text links right); Mobile → bottom icons-only tab bar
- **State**: Local state only (no database needed, promotional content site)
- **Admin State**: localStorage persistence for hostel data
- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Responsiveness**: Content max-width 900px centered on desktop, full-width on mobile

## Color Palette (Blue Theme)
- Primary: #1B4F8A (deep navy blue)
- PrimaryLight: #2563EB (bright blue)
- Secondary: #0EA5E9 (sky blue)
- Accent: #06B6D4 (cyan)
- Background: #F0F8FF (alice blue)
- Text: #0C1524 (dark navy)

## Key Files
- `constants/data.ts` - All content data: hostels, gastronomy, excursions, events
- `constants/colors.ts` - Blue theme color palette
- `app/(tabs)/index.tsx` - Home screen with 5-slide auto-scrolling image carousel
- `app/(tabs)/services.tsx` - Services with ImageBackground header + card images
- `app/(tabs)/excursions.tsx` - Excursions with ImageBackground header + card images
- `app/(tabs)/events.tsx` - Events with ImageBackground header + card images
- `app/(tabs)/about.tsx` - About screen with UCI footer credit
- `app/(tabs)/_layout.tsx` - Icons-only tab bar navigation
- `server/templates/admin.html` - Admin panel (blue theme, CRUD, localStorage)
- `server/index.ts` - Express server serving /admin route

## Image Strategy
All images currently use picsum.photos placeholder URLs with descriptive seeds.
To replace with real photos: search `picsum.photos/seed/` in each tab file and replace URLs.
- Carousel images: in `index.tsx` → `carouselSlides` array
- Header images: ImageBackground source in each tab screen
- Card images: `accommodationImages`, `gastronomyImages`, `excursionImages`, `eventSpaceImages` objects

## Recent Changes
- 2026-03-19: Added background images to service/excursion/event section headers (ImageBackground + gradient overlay)
- 2026-03-19: Full redesign — blue color palette, responsive desktop layout, image carousel, icons-only navbar, UCI footer, admin panel blue theme
- 2026-02-08: Added standalone admin panel for hostel management at /admin route
- 2026-02-06: Initial build with 5 tabs, service request modals, community timeline

## User Preferences
- Spanish language content
- Blue color palette (pleasant for the eye)
- Focus on cultural heritage and tourism promotion
- Web-first design with desktop and mobile responsiveness
- Universidad de las Ciencias Informaticas credited in footer
