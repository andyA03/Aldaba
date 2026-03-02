# GUIA DE MODIFICACION - Aldaba Trinidad

Este documento explica cada directorio y archivo del proyecto para que puedas editarlo sin dificultad.

---

## ESTRUCTURA GENERAL

```
aldaba-trinidad/
|
|-- app/                  ← Pantallas de la app (lo que ven los turistas)
|-- components/           ← Piezas reutilizables de la interfaz
|-- constants/            ← Textos, datos y colores del sitio
|-- server/               ← Servidor backend + panel de admin
|-- assets/               ← Imagenes e iconos
|-- lib/                  ← Configuracion tecnica de red
|-- shared/               ← Tipos de datos compartidos
```

---

## 1. `constants/` — DATOS Y COLORES DEL SITIO

> **Si quieres cambiar textos, descripciones, precios o contenido, empieza aqui.**

### `constants/data.ts`
Es el archivo mas importante para el contenido. Contiene **todos los datos** que aparecen en la app:
- Lista de servicios de alojamiento (hostales, casas)
- Lista de restaurantes y gastronomia
- Lista de excursiones disponibles
- Lista de eventos culturales
- Informacion de contacto de la empresa

**Como modificarlo:**
- Busca el array que corresponde a lo que quieres cambiar (ej. `excursions`, `events`, `services`)
- Edita el texto dentro de las comillas
- Cada elemento tiene campos como `name`, `description`, `price`, `duration`

### `constants/colors.ts`
Define **todos los colores** del sitio. Si quieres cambiar la paleta visual, solo edita este archivo.

| Variable | Color | Uso |
|---|---|---|
| `primary` | #8B2500 (terracota) | Botones principales, encabezados |
| `secondary` | #1B4332 (verde colonial) | Fondos de seccion |
| `accent` | #C17817 (dorado ambar) | Detalles, iconos destacados |
| `background` | #FDF8F0 (crema calida) | Fondo general de pantallas |
| `text` | #2C1810 (cafe oscuro) | Texto principal |
| `textLight` | #6B4C3B (cafe claro) | Texto secundario |

---

## 2. `app/` — PANTALLAS DE LA APP

> **Si quieres modificar lo que el usuario ve en cada pestaña, edita estos archivos.**

### `app/_layout.tsx`
Configuracion raiz de la app: fuentes, proveedores globales, splash screen. No necesitas tocarlo salvo que quieras cambiar las fuentes.

### `app/(tabs)/` — Las 5 pestanas principales

Cada archivo es una pantalla completa de la app:

| Archivo | Pestana | Que contiene |
|---|---|---|
| `index.tsx` | **Inicio** | Banner principal, bienvenida, acceso rapido a secciones |
| `services.tsx` | **Servicios** | Alojamiento, gastronomia, servicios culturales con modal de solicitud |
| `excursions.tsx` | **Excursiones** | Tarjetas de excursiones disponibles con detalles y precios |
| `events.tsx` | **Eventos** | Calendario de eventos culturales y actividades especiales |
| `about.tsx` | **Nosotros** | Historia de la empresa, contacto, redes sociales |

### `app/(tabs)/_layout.tsx`
Configura la barra de pestanas inferior: iconos, nombres, colores. Edita aqui si quieres cambiar el nombre o icono de una pestana.

### `app/+not-found.tsx`
Pagina que se muestra cuando alguien accede a una ruta que no existe. Puedes dejarlo como esta.

---

## 3. `server/` — SERVIDOR BACKEND Y PANEL DE ADMIN

> **El servidor corre en el puerto 5000 y maneja el panel de administracion.**

### `server/index.ts`
Punto de entrada del servidor Express. Define las rutas principales:
- `/` → muestra la landing page
- `/admin` → muestra el panel de administracion
- `/api/*` → rutas de la API

No necesitas modificarlo salvo que quieras agregar nuevas rutas.

### `server/routes.ts`
Define los endpoints de la API (rutas que terminan en `/api/...`). Si quieres crear nuevas funcionalidades del lado del servidor, agrega rutas aqui.

### `server/storage.ts`
Maneja como se guardan los datos en el servidor. Actualmente usa almacenamiento en memoria.

### `server/templates/landing-page.html`
Pagina HTML estatica que se muestra en la raiz del servidor (puerto 5000). Es diferente a la app principal.

### `server/templates/admin.html`
**Panel de administracion de hostales.** Accesible en `/admin` del servidor (puerto 5000).

Este archivo contiene todo el panel en un solo HTML:
- La interfaz visual (HTML + CSS)
- La logica de la aplicacion (JavaScript con React via CDN)
- Los datos se guardan en el **localStorage** del navegador bajo la clave `aldaba_hostales`

**Como modificar el panel de admin:**
- Para cambiar el diseno visual: busca la seccion `<style>` al inicio del archivo
- Para cambiar la logica (agregar campos, cambiar comportamiento): busca la seccion `<script>` al final
- Los hostales de ejemplo iniciales estan en la variable `initialHostales` dentro del script

---

## 4. `components/` — COMPONENTES REUTILIZABLES

> **Piezas de interfaz que se usan en multiples pantallas.**

### `components/ErrorBoundary.tsx`
Captura errores en la app y muestra una pantalla de error amigable en lugar de que la app se cierre. No necesitas modificarlo.

### `components/ErrorFallback.tsx`
La pantalla visual que se muestra cuando ocurre un error. Puedes editar el mensaje o el boton de "reintentar" si quieres.

### `components/KeyboardAwareScrollViewCompat.tsx`
Componente tecnico que maneja el teclado en formularios (evita que el teclado tape los campos). No necesitas modificarlo.

---

## 5. `assets/` — IMAGENES E ICONOS

> **Aqui van todas las imagenes del proyecto.**

### `assets/images/`

| Archivo | Para que sirve |
|---|---|
| `icon.png` | Icono de la app (el que aparece en el celular) |
| `splash-icon.png` | Logo que aparece mientras carga la app |
| `favicon.png` | Icono en la pestana del navegador web |
| `android-icon-*.png` | Variantes del icono para Android |

**Para cambiar el icono:** reemplaza `icon.png` con tu nueva imagen (debe ser cuadrada, 1024x1024 px recomendado).

---

## 6. `lib/` — CONFIGURACION DE RED

### `lib/query-client.ts`
Configuracion tecnica para las peticiones al servidor (React Query). Define la URL base del servidor y como se manejan los errores de red. No necesitas modificarlo.

---

## 7. `shared/` — TIPOS DE DATOS

### `shared/schema.ts`
Define la estructura de los datos (como se llaman los campos, que tipo son). Si agregas nuevos campos a los datos, debes registrarlos aqui tambien.

---

## 8. ARCHIVOS DE CONFIGURACION EN LA RAIZ

| Archivo | Para que sirve | Toca? |
|---|---|---|
| `app.json` | Nombre de la app, version, configuracion de Expo | Solo para cambiar nombre/version |
| `package.json` | Lista de dependencias del proyecto | No tocar manualmente |
| `tsconfig.json` | Configuracion de TypeScript | No tocar |
| `babel.config.js` | Configuracion del compilador JavaScript | No tocar |
| `metro.config.js` | Configuracion del bundler de Expo | No tocar |
| `drizzle.config.ts` | Configuracion de base de datos (no activa) | No tocar |
| `eslint.config.js` | Reglas de calidad de codigo | No tocar |
| `.replit` | Configuracion del entorno Replit | No tocar |

---

## GUIA RAPIDA: DONDE EDITAR CADA COSA

| Quiero cambiar... | Archivo a editar |
|---|---|
| Texto de una excursion | `constants/data.ts` → array `excursions` |
| Texto de un evento | `constants/data.ts` → array `events` |
| Informacion de contacto | `constants/data.ts` → seccion de contacto |
| Colores del sitio | `constants/colors.ts` |
| Pantalla de inicio | `app/(tabs)/index.tsx` |
| Pantalla de servicios | `app/(tabs)/services.tsx` |
| Pantalla de excursiones | `app/(tabs)/excursions.tsx` |
| Pantalla de eventos | `app/(tabs)/events.tsx` |
| Pantalla "Sobre Nosotros" | `app/(tabs)/about.tsx` |
| Nombres de las pestanas | `app/(tabs)/_layout.tsx` |
| Panel de administracion | `server/templates/admin.html` |
| Icono de la app | `assets/images/icon.png` |

---

## COMO SE EJECUTA EL PROYECTO

El proyecto tiene **dos servidores** que corren al mismo tiempo:

| Servidor | Puerto | Comando | Que sirve |
|---|---|---|---|
| Backend (Express) | 5000 | `npm run server:dev` | API + Panel Admin |
| Frontend (Expo) | 8081 | `npm run expo:dev` | App para turistas |

- **App turistica:** `http://localhost:8081`
- **Panel de admin:** `http://localhost:5000/admin`

---

*Documento de referencia para el proyecto Aldaba Trinidad*
*Empresa: Aldaba - Gestion y promocion de servicios turisticos, Trinidad, Cuba*
