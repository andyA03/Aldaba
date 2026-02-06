# Aldaba Trinidad - Tourism App

## Overview
Mobile app for Aldaba, a tourism and cultural services company based in Trinidad and Valle de los Ingenios, Cuba. The app showcases accommodation, gastronomy, excursions, events, and cultural services.

## Architecture
- **Frontend**: Expo React Native with Expo Router (file-based routing)
- **Backend**: Express.js serving API and landing page
- **Navigation**: 5 tabs - Home, Services, Excursions, Events, About
- **State**: Local state only (no database needed, promotional content app)
- **Fonts**: Playfair Display (headings) + DM Sans (body)

## Color Palette
- Primary: #8B2500 (deep terracotta)
- Secondary: #1B4332 (colonial green)
- Accent/Gold: #C17817 (warm amber)
- Background: #FDF8F0 (warm cream)

## Key Files
- `constants/data.ts` - All mock data for services, venues, excursions, events
- `constants/colors.ts` - Theme colors
- `app/(tabs)/` - 5 tab screens: index, services, excursions, events, about

## Recent Changes
- 2026-02-06: Initial build of Aldaba tourism app with 5 tabs, service request modals, community timeline

## User Preferences
- Spanish language content
- Cuban colonial aesthetic
- Focus on cultural heritage and tourism promotion
