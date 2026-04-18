# Estructura de la app Aldaba

Este documento explica qué contiene cada carpeta y archivo principal del proyecto para que sea fácil mantenerlo y ampliarlo.

## Vista General

El proyecto está dividido en dos partes principales:

- `client/`: frontend en React + Vite.
- `backend/`: backend en Django REST Framework + PostgreSQL.

También hay archivos de configuración en la raíz del repositorio.

---

## Raíz del proyecto

### `ALDABA.md`
Documento de referencia general del proyecto. Describe la app, su arquitectura histórica y su contenido funcional.

### `DJANGO_API.md`
Guía de conexión entre el frontend y el backend. Incluye endpoints, autenticación JWT y referencia de modelos.

### `ESTRUCTURA_APP.md`
Este archivo. Explica la estructura completa del proyecto.

### `vite.config.ts`
Configuración de Vite para el frontend. Define el root, alias y el proxy hacia el backend en desarrollo.

### `tsconfig.json`
Configuración TypeScript general del workspace.

### `eslint.config.js`
Reglas de lint para mantener consistencia en el código.

### `package.json`
Scripts y dependencias principales del frontend.

### `.gitignore`
Archivos y carpetas que Git no debe versionar.

---

## Carpeta `client/`

Frontend React de la aplicación turística.

### `client/index.html`
HTML base donde se monta la app React.

### `client/tsconfig.json`
Configuración TypeScript específica del frontend.

### `client/src/main.tsx`
Punto de entrada React. Monta la app y activa el router.

### `client/src/app/App.tsx`
Componente raíz del frontend. Define las rutas principales.

### `client/src/pages/`
Páginas principales del sitio.

- `Home.tsx`: landing principal.
- `Lugares.tsx`: listado de lugares turísticos.
- `LugarDetalle.tsx`: detalle de cada lugar.
- `Services.tsx`: alojamiento y gastronomía.
- `Excursions.tsx`: excursiones.
- `Events.tsx`: eventos y servicios culturales.
- `About.tsx`: información institucional.

### `client/src/features/`
Funciones o áreas completas de la app.

- `navigation/NavBar.tsx`: barra de navegación principal.
- `admin/AdminPanel.tsx`: panel de administración.
- `admin/AdminPanel.css`: estilos del panel admin.

### `client/src/shared/`
Recursos reutilizables compartidos por toda la interfaz.

- `ui/Footer.tsx`: pie de página.
- `ui/Modal.tsx`: modal reutilizable.
- `styles/global.css`: estilos globales, responsive y hover states.
- `theme/colors.ts`: paleta de colores centralizada.
- `data/siteData.ts`: datos compartidos de servicios, eventos, proyectos y empresa.

### `client/src/entities/`
Entidades de dominio con sus datos y modelo conceptual.

- `lugares/model/lugaresData.ts`: datos de los lugares turísticos.

### `client/public/images/`
Carpeta para imágenes locales estáticas que reemplazarán fotos externas en el futuro.

---

## Carpeta `backend/`

Backend Django REST Framework con PostgreSQL.

### `backend/manage.py`
Comando de administración de Django.

### `backend/requirements.txt`
Dependencias Python del backend.

### `backend/config/`
Configuración principal del proyecto Django.

- `settings.py`: configuración de apps, seguridad, DRF, JWT, CORS y base de datos PostgreSQL.
- `urls.py`: rutas raíz del backend.
- `wsgi.py`: entrada WSGI para despliegues tradicionales.
- `asgi.py`: entrada ASGI para despliegues asíncronos.

### `backend/aldaba_api/`
Aplicación principal del dominio Aldaba.

- `models.py`: modelos de base de datos.
- `serializers.py`: serializers DRF.
- `permissions.py`: permisos personalizados.
- `views.py`: viewsets públicos y de administración.
- `urls.py`: rutas del API agrupadas por dominio.
- `__init__.py`: marca la carpeta como paquete Python.

### `backend/aldaba_api/migrations/`
Carpeta de migraciones de Django para controlar cambios del esquema de base de datos.

- `__init__.py`: marca la carpeta como paquete de migraciones.

---

## Qué hace cada parte importante

- El frontend muestra la información y consume el backend vía `/api/...`.
- El backend expone datos públicos para lugares, alojamiento, gastronomía, excursiones, eventos y comunidad.
- El backend también expone rutas protegidas para edición desde el panel admin.
- PostgreSQL guarda toda la información persistente.
- JWT protege el acceso de administración.
