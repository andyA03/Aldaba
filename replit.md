# Aldaba Web

Plataforma web de gestión y promoción turística para Aldaba en Trinidad, Cuba. Información sobre alojamiento, gastronomía, excursiones, eventos y patrimonio cultural UNESCO.

## Arquitectura

Proyecto frontend puro (React + Vite). El backend será provisto por una API Django REST Framework externa.

### Estructura del proyecto

- `/client` — Frontend React (Vite, React Router 7, TanStack Query)
  - `src/pages/` — Páginas de la aplicación
  - `src/components/` — NavBar, Footer, Modal
  - `src/admin/` — Panel de administración
  - `src/data/` — Datos de lugares turísticos
  - `src/styles/` — Estilos globales
- `/constants` — Datos compartidos (hostales, restaurantes, excursiones, eventos)

## Stack técnico

- **Frontend**: React 19, React Router 7, TanStack Query, Lucide React, Vite
- **Backend (externo)**: Django REST Framework (a conectar)
- **Package Manager**: npm

## Desarrollo

```bash
npm run dev      # Inicia el frontend en puerto 5000
npm run build    # Build de producción
npm run preview  # Preview del build
```

## Conexión con Django

El proxy de Vite redirige `/api` → `http://localhost:8000` (puerto por defecto de Django).

Configurado en `vite.config.ts`:
```ts
proxy: {
  '/api': 'http://localhost:8000',
}
```

## Páginas

| Ruta | Descripción |
|---|---|
| `/` | Landing con hero pantalla completa y carrusel |
| `/lugares` | 8 lugares turísticos con filtros por categoría |
| `/lugares/:slug` | Detalle de cada lugar |
| `/services` | Alojamiento y gastronomía |
| `/excursions` | Excursiones guiadas |
| `/events` | Eventos y cultura |
| `/about` | Nosotros y contacto |
| `/admin` | Panel de administración (admin / admin123) |

## Despliegue

- **Build**: `npm run build` → genera `client-dist/`
- **Servir**: cualquier servidor estático apuntando a `client-dist/`
