# DOCUMENTACION COMPLETA - Aldaba Trinidad
## Aplicacion Web de Servicios Turisticos, Culturales y Gastronomicos

---

## 1. DESCRIPCION GENERAL

**Aldaba Trinidad** es una aplicacion web desarrollada en React con TypeScript, construida sobre el framework Expo (con soporte web completo). El sitio web oficial de la empresa Aldaba presenta y promociona los servicios turisticos, culturales, patrimoniales y gastronomicos en la ciudad de Trinidad y el Valle de los Ingenios, Cuba.

### Objetivo
Informar, promocionar y facilitar la solicitud de servicios turisticos ofrecidos por Aldaba, incluyendo alojamiento, gastronomia, excursiones, eventos culturales y servicios complementarios.

### Tecnologias Utilizadas
- **React** (v19) - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estatico
- **Expo** (v54) - Framework de desarrollo con soporte web
- **Expo Router** (v6) - Enrutamiento basado en archivos
- **React Native Web** - Renderizado web de componentes nativos
- **Expo Linear Gradient** - Gradientes visuales
- **Expo Haptics** - Retroalimentacion haptica (solo dispositivos moviles)
- **Expo Vector Icons (Ionicons)** - Iconografia
- **Google Fonts** - Playfair Display + DM Sans
- **Express.js** - Servidor backend (puerto 5000)
- **TanStack React Query** - Gestion de estado del servidor

---

## 2. ESTRUCTURA DEL PROYECTO

```
aldaba-trinidad/
|
|-- app/                          # Directorio de rutas (Expo Router)
|   |-- _layout.tsx               # Layout raiz con proveedores globales
|   |-- +not-found.tsx            # Pagina 404
|   |-- +native-intent.tsx        # Intenciones nativas
|   |-- (tabs)/                   # Grupo de pestanas
|       |-- _layout.tsx           # Configuracion de pestanas (5 tabs)
|       |-- index.tsx             # Pantalla Inicio (Home)
|       |-- services.tsx          # Pantalla Servicios
|       |-- excursions.tsx        # Pantalla Excursiones
|       |-- events.tsx            # Pantalla Eventos y Servicios Culturales
|       |-- about.tsx             # Pantalla Sobre Nosotros
|
|-- assets/                       # Recursos estaticos
|   |-- images/
|       |-- icon.png              # Icono de la aplicacion
|       |-- splash-icon.png       # Icono del splash screen
|       |-- favicon.png           # Favicon web
|       |-- android-icon-*.png    # Iconos Android adaptativos
|
|-- components/                   # Componentes reutilizables
|   |-- ErrorBoundary.tsx         # Limite de errores React
|   |-- ErrorFallback.tsx         # UI de error con reinicio
|   |-- KeyboardAwareScrollViewCompat.tsx  # ScrollView adaptativo
|
|-- constants/                    # Constantes de la aplicacion
|   |-- colors.ts                 # Paleta de colores del tema
|   |-- data.ts                   # Datos mock (contenido completo)
|
|-- lib/                          # Utilidades
|   |-- query-client.ts           # Configuracion de React Query
|
|-- server/                       # Backend Express
|   |-- index.ts                  # Punto de entrada del servidor
|   |-- routes.ts                 # Rutas API
|   |-- storage.ts                # Capa de almacenamiento
|   |-- templates/
|       |-- landing-page.html     # Pagina de aterrizaje estatica
|
|-- shared/                       # Tipos compartidos
|   |-- schema.ts                 # Esquemas de datos
|
|-- app.json                      # Configuracion de Expo
|-- package.json                  # Dependencias del proyecto
|-- tsconfig.json                 # Configuracion TypeScript
|-- babel.config.js               # Configuracion de Babel
|-- metro.config.js               # Configuracion de Metro bundler
```

---

## 3. PALETA DE COLORES

La paleta esta inspirada en la arquitectura colonial cubana y los tonos calidos de Trinidad:

| Color | Codigo Hex | Uso |
|-------|-----------|-----|
| Primary (Terracota) | `#8B2500` | Color principal, botones, acentos |
| Primary Light | `#B8461B` | Variante clara del primario |
| Secondary (Verde Colonial) | `#1B4332` | Secciones de eventos, servicios culturales |
| Secondary Light | `#2D6A4F` | Variante clara del secundario |
| Gold (Ambar) | `#C17817` | Excursiones, badges, acentos dorados |
| Gold Light | `#E0A84C` | Variante clara del dorado |
| Accent (Arena) | `#D4A373` | Elementos decorativos |
| Background | `#FDF8F0` | Fondo general (crema calido) |
| Background Secondary | `#F5EDE0` | Fondo secundario |
| Text | `#1A0F0A` | Texto principal (marron oscuro) |
| Text Secondary | `#6B5B4F` | Texto secundario |
| Text Tertiary | `#9A8B7F` | Texto terciario/placeholders |
| Border | `#E8DDD0` | Bordes de tarjetas |
| Card | `#FFFFFF` | Fondo de tarjetas |

---

## 4. TIPOGRAFIA

Se utilizan dos familias tipograficas de Google Fonts:

### Playfair Display (Serif)
- **Uso**: Titulos principales, nombres de secciones, encabezados hero
- **Pesos**: 600 SemiBold, 700 Bold
- **Tamanos**: 22px (secciones), 34px (headers), 48px (hero)

### DM Sans (Sans-Serif)
- **Uso**: Texto de cuerpo, etiquetas, botones, descripciones
- **Pesos**: 400 Regular, 500 Medium, 600 SemiBold, 700 Bold
- **Tamanos**: 11-16px segun contexto

---

## 5. PANTALLAS Y FUNCIONALIDAD

### 5.1 Inicio (Home) - `app/(tabs)/index.tsx`

**Secciones:**
1. **Hero Section**: Gradiente terracota con nombre "Aldaba", tagline de la empresa, badge de ubicacion "Trinidad, Cuba" y boton CTA "Explorar Servicios"
2. **Acceso Rapido**: Grid de 4 tarjetas con acceso directo a Alojamiento, Gastronomia, Excursiones y Eventos
3. **Lo que nos distingue**: 3 tarjetas horizontales destacando Patrimonio UNESCO, Valle de los Ingenios y Cultura Viva
4. **Tarjeta de Bienvenida**: Gradiente verde con mensaje de bienvenida y enlace a "Conocer mas"

**Interacciones:**
- Tarjetas de acceso rapido navegan a las pestanas correspondientes
- Boton "Explorar Servicios" navega a la pestana de Servicios
- Enlace "Conocer mas" navega a la pestana Nosotros
- Retroalimentacion haptica en botones (dispositivos moviles)

---

### 5.2 Servicios - `app/(tabs)/services.tsx`

**Secciones:**
1. **Header**: Gradiente terracota con titulo "Servicios"
2. **Toggle Tabs**: Alternancia entre "Alojamiento" y "Gastronomia"
3. **Tarjetas de Alojamiento**: Informacion detallada de cada hostal
4. **Tarjetas de Gastronomia**: Informacion de cada establecimiento gastronomico
5. **Boton flotante (FAB)**: Abre modal para solicitar servicio

**Contenido de Alojamiento:**

| Propiedad | Hostal "La Merced" | Casa "Amargura #85" |
|-----------|-------------------|---------------------|
| Habitaciones | 8 | 5 |
| Climatizacion | Si | Si |
| TV | Si | Si |
| Minibar | Si | Si |
| Banera | No | Si |
| Lavanderia | Si | No |
| Desayuno | Si | No |
| Terraza | No | Si |

**Establecimientos Gastronomicos:**
1. Centro Cultural Patio Becquer - Musica en vivo, cocteleria cubana
2. Taberna Guanahuac - Ambientacion historica, platos tipicos
3. Bar Cafeteria Playa Ancon - Cocteles tropicales, vista al mar
4. Bar Cafeteria San Isidro de los Destiladeros - Cafe regional, vista al valle
5. Acuario - Espacio educativo ambiental con gastronomia ligera

**Modal "Solicitar Servicio":**
- Campo: Nombre (texto)
- Campo: Servicio deseado (area de texto)
- Boton: Enviar Solicitud
- Validacion de campos obligatorios

---

### 5.3 Excursiones - `app/(tabs)/excursions.tsx`

**Secciones:**
1. **Header**: Gradiente dorado con titulo "Excursiones"
2. **Barra informativa**: Iconos de Guias expertos, Fotos incluidas, Transporte
3. **Tarjetas de excursiones**: 3 excursiones con detalles completos

**Excursiones disponibles:**

| Excursion | Duracion | Transporte | Almuerzo |
|-----------|----------|------------|----------|
| Centro Historico de Trinidad | 3-4 horas | Opcional | Opcional |
| Valle de los Ingenios | 5-6 horas | Incluido | Disponible |
| Casa Hacienda Guaimaro | 2-3 horas | No especificado | No |

**Modal "Solicitar Excursion":**
- Campo: Nombre (texto)
- Campo: Numero de personas (numerico)
- Campo: Notas adicionales (area de texto)
- Muestra el nombre de la excursion seleccionada
- Validacion del campo nombre

---

### 5.4 Eventos - `app/(tabs)/events.tsx`

**Secciones:**
1. **Header**: Gradiente verde con titulo "Eventos"
2. **Espacios para Eventos**: Tarjetas con gradiente, capacidad e info
3. **Servicios Culturales**: Lista de 4 servicios culturales
4. **Otros Servicios**: Lista de 4 servicios complementarios

**Espacios para Eventos:**

| Espacio | Capacidad | Tipos de Eventos |
|---------|-----------|-----------------|
| Patio Becquer | 100 personas | Bodas, Cumpleanos, Fiestas de 15, Banquetes, Academicos, Presentaciones |
| Amargura #85 | 50 personas | Reuniones privadas, Cenas de gala, Corporativos, Celebraciones, Fotografia |

**Servicios Culturales:**
1. Casa Hacienda Guaimaro - Interpretacion historico-cultural
2. Centro Cultural Patio Becquer - Musica tradicional cubana en vivo
3. Taberna Guanahuac - Ambientacion historica colonial
4. Acuario - Espacio educativo y ambiental

**Otros Servicios:**
1. Recorridos en coches coloniales
2. Papeleria turistica (mapas, guias)
3. Artesania local
4. Servicio de guias turisticos

**Modal "Solicitar Espacio":**
- Campo: Nombre (texto)
- Campo: Tipo de evento (texto)
- Campo: Fecha deseada (texto)
- Validacion de campos obligatorios

---

### 5.5 Nosotros (About) - `app/(tabs)/about.tsx`

**Secciones:**
1. **Header**: Gradiente terracota-verde con titulo "Sobre Aldaba"
2. **Quienes Somos**: Descripcion completa de la empresa
3. **Nuestra Mision**: Tarjeta con gradiente dorado
4. **Nuestros Valores**: Lista de 5 valores con iconos
5. **Proyeccion Comunitaria**: Linea de tiempo con 5 proyectos
6. **Contacto**: Direccion, telefono y correo electronico
7. **Footer**: Logo, tagline y derechos reservados

**Valores de la empresa:**
1. Preservacion del patrimonio
2. Desarrollo comunitario
3. Excelencia en el servicio
4. Autenticidad cultural
5. Sostenibilidad

**Proyeccion Comunitaria (Timeline):**

| Ano | Proyecto | Descripcion |
|-----|----------|-------------|
| 2023 | Talleres con ninos | Programas educativos sobre patrimonio local |
| 2023 | Actividades comunitarias | Actividades sociales y culturales |
| 2024 | Concursos gastronomicos | Competencias culinarias tradicionales |
| 2024 | Festejos tradicionales | Festividades locales |
| 2025 | Celebraciones locales | Eventos festivos comunitarios |

**Informacion de Contacto:**
- Direccion: Centro Historico, Trinidad, Sancti Spiritus, Cuba
- Telefono: +53 41 99 XXXX (enlace directo para llamar)
- Email: info@aldaba.cu (enlace directo para enviar correo)

---

## 6. COMPONENTES REUTILIZABLES

### Tarjetas (Cards)
- `QuickAccessCard` - Tarjeta de acceso rapido con icono y titulo
- `HighlightCard` - Tarjeta de destaque horizontal
- `AccommodationCard` - Tarjeta expandible de alojamiento
- `GastronomyCard` - Tarjeta expandible de gastronomia
- `ExcursionCard` - Tarjeta de excursion con caracteristicas
- `EventSpaceCard` - Tarjeta de espacio para eventos con gradiente
- `CulturalServiceItem` - Item de servicio cultural
- `OtherServiceItem` - Item de servicio complementario
- `ValueCard` - Tarjeta de valor empresarial
- `CommunityItem` - Item de la linea de tiempo comunitaria
- `ContactItem` - Item de contacto con accion

### Modales
- `RequestModal` (Servicios) - Solicitud general de servicios
- `RequestModal` (Excursiones) - Solicitud de excursion especifica
- `RequestModal` (Eventos) - Solicitud de alquiler de espacio

---

## 7. NAVEGACION

La aplicacion utiliza **Expo Router** con navegacion por pestanas (tabs):

```
/ (index)          -> Pantalla de Inicio
/services          -> Pantalla de Servicios
/excursions        -> Pantalla de Excursiones
/events            -> Pantalla de Eventos
/about             -> Pantalla Nosotros
```

### Barra de Pestanas
- 5 pestanas con iconos Ionicons
- Soporte para iOS 26+ con liquid glass (NativeTabs)
- Fallback clasico con BlurView para iOS anterior y Android
- Soporte completo para web con fondo solido

---

## 8. DATOS MOCK

Todos los datos del contenido estan centralizados en `constants/data.ts`. Este archivo contiene:

- `accommodations` - Array de alojamientos con amenidades
- `gastronomyVenues` - Array de establecimientos gastronomicos con ofertas
- `excursions` - Array de excursiones con caracteristicas
- `eventSpaces` - Array de espacios para eventos con tipos de eventos
- `culturalServices` - Array de servicios culturales
- `otherServices` - Array de servicios complementarios
- `communityProjects` - Array de proyectos comunitarios con anos
- `companyInfo` - Objeto con informacion de la empresa, mision, valores y contacto

### Interfaces TypeScript
Cada tipo de dato tiene su interfaz definida:
- `Accommodation`
- `GastronomyVenue`
- `Excursion`
- `EventSpace`
- `CulturalService`
- `CommunityProject`

---

## 9. SERVIDOR BACKEND

El servidor Express (puerto 5000) proporciona:
- **CORS** configurado para dominios Replit y localhost
- **Landing page** estatica en la ruta raiz
- **Manifest** de Expo para dispositivos moviles
- **Archivos estaticos** desde `/assets` y `/static-build`
- **Logging** de peticiones API

---

## 10. COMO EJECUTAR

### Requisitos
- Node.js v20+
- npm

### Comandos

```bash
# Instalar dependencias
npm install

# Iniciar servidor backend (puerto 5000)
npm run server:dev

# Iniciar servidor frontend Expo (puerto 8081)
npm run expo:dev
```

### Acceso
- **Web**: http://localhost:8081
- **Movil**: Escanear codigo QR con Expo Go

---

## 11. COMPATIBILIDAD

| Plataforma | Estado | Notas |
|------------|--------|-------|
| Web (Chrome, Firefox, Safari) | Completo | Experiencia principal |
| iOS (Expo Go) | Completo | Con liquid glass en iOS 26+ |
| Android (Expo Go) | Completo | Material 3 tabs |

### Responsividad Web
- Layout adaptativo con ScrollView
- Tarjetas con ancho relativo al viewport
- Gradientes y modales responsivos
- Insets de 67px top y 34px bottom para web
- Tab bar con altura de 84px en web

---

## 12. PERSONALIZACION

### Cambiar colores
Editar `constants/colors.ts` para modificar toda la paleta de colores.

### Cambiar contenido
Editar `constants/data.ts` para modificar textos, descripciones, servicios, etc.

### Agregar nuevas secciones
1. Crear nuevo archivo en `app/(tabs)/`
2. Registrar la nueva pestana en `app/(tabs)/_layout.tsx`
3. Agregar datos en `constants/data.ts`

---

*Documentacion generada para el proyecto Aldaba Trinidad*
*Empresa: Aldaba - Gestion y promocion de servicios turisticos*
*Ubicacion: Trinidad y Valle de los Ingenios, Cuba*
