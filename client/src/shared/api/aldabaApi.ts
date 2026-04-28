export type ApiListResponse<T> = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: T[];
} | T[];

async function requestJson<T>(path: string): Promise<T[]> {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Request failed for ${path}: ${response.status}`);
  }

  const payload: ApiListResponse<T> = await response.json();
  if (Array.isArray(payload)) {
    return payload;
  }

  return payload.results ?? [];
}

export type ApiLugar = {
  id: number;
  slug: string;
  nombre: string;
  categoria: string;
  categoria_color: string;
  foto: string;
  foto_hero: string;
  resumen: string;
  descripcion: string;
  horario: string;
  entrada: string;
  ubicacion: string;
  distancia: string;
  consejos: string;
};

export type LugarCardData = {
  id: number;
  slug: string;
  nombre: string;
  categoria: string;
  categoriaColor: string;
  foto: string;
  fotoHero: string;
  resumen: string;
  descripcion: string;
  horario: string;
  entrada: string;
  ubicacion: string;
  distancia: string;
  consejos: string;
};

export type ApiAccommodation = {
  id: number;
  nombre: string;
  foto: string;
  icono: string;
  habitaciones_count?: number;
};

export type AccommodationData = {
  id: string;
  name: string;
  description: string;
  amenities: string[];
  rooms: string;
  icon: string;
};

export type ApiGastronomy = {
  id: number;
  nombre: string;
  icono: string;
  mesas_count?: number;
};

export type GastronomyData = {
  id: string;
  name: string;
  description: string;
  offerings: string[];
  icon: string;
};

export type ApiExcursion = {
  id: number;
  destino: string;
  duracion: string;
  foto: string;
  icono: string;
  precio: number;
  personas: number;
};

export type ExcursionData = {
  id: string;
  name: string;
  description: string;
  features: string[];
  duration: string;
  icon: string;
};

export type ApiEventSpace = {
  id: number;
  nombre: string;
  capacidad: string;
  descripcion: string;
  tipos_evento: string[];
  foto: string;
  icono: string;
};

export type EventSpaceData = {
  id: string;
  name: string;
  capacity: string;
  description: string;
  eventTypes: string[];
  icon: string;
};

export type ApiCulturalService = {
  id: number;
  nombre: string;
  descripcion: string;
  foto: string;
  icono: string;
};

export type CulturalServiceData = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export type ApiOtherService = {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
};

export type OtherServiceData = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

export function toLugarCardData(item: ApiLugar): LugarCardData {
  return {
    id: item.id,
    slug: item.slug,
    nombre: item.nombre,
    categoria: item.categoria,
    categoriaColor: item.categoria_color,
    foto: item.foto,
    fotoHero: item.foto_hero,
    resumen: item.resumen,
    descripcion: item.descripcion,
    horario: item.horario,
    entrada: item.entrada,
    ubicacion: item.ubicacion,
    distancia: item.distancia,
    consejos: item.consejos,
  };
}

export function toAccommodationData(item: ApiAccommodation): AccommodationData {
  const roomCount = item.habitaciones_count ?? 0;
  const roomText = roomCount > 0 ? `${roomCount} habitaciones disponibles` : 'Sin habitaciones registradas';

  return {
    id: String(item.id),
    name: item.nombre,
    description: roomText,
    amenities: [roomText],
    rooms: roomCount > 0 ? `${roomCount}` : '-',
    icon: item.icono,
  };
}

export function toGastronomyData(item: ApiGastronomy): GastronomyData {
  const tableCount = item.mesas_count ?? 0;
  const tableText = tableCount > 0 ? `${tableCount} mesas disponibles` : 'Sin mesas registradas';

  return {
    id: String(item.id),
    name: item.nombre,
    description: tableText,
    offerings: [tableText],
    icon: item.icono,
  };
}

export function toExcursionData(item: ApiExcursion): ExcursionData {
  const priceLabel = `Precio: $${item.precio}`;
  const peopleLabel = `Personas: ${item.personas}`;

  return {
    id: String(item.id),
    name: item.destino,
    description: `${priceLabel} · ${peopleLabel}`,
    features: [priceLabel, peopleLabel],
    duration: item.duracion,
    icon: item.icono,
  };
}

export function toEventSpaceData(item: ApiEventSpace): EventSpaceData {
  return {
    id: String(item.id),
    name: item.nombre,
    capacity: item.capacidad,
    description: item.descripcion,
    eventTypes: item.tipos_evento,
    icon: item.icono,
  };
}

export function toCulturalServiceData(item: ApiCulturalService): CulturalServiceData {
  return {
    id: String(item.id),
    name: item.nombre,
    description: item.descripcion,
    icon: item.icono,
  };
}

export function toOtherServiceData(item: ApiOtherService): OtherServiceData {
  return {
    id: String(item.id),
    name: item.nombre,
    description: item.descripcion,
    icon: item.icono,
  };
}

export const fetchLugares = () => requestJson<ApiLugar>('/api/lugares/').then(items => items.map(toLugarCardData));
export const fetchAlojamientos = () => requestJson<ApiAccommodation>('/api/servicios/alojamiento/').then(items => items.map(toAccommodationData));
export const fetchGastronomia = () => requestJson<ApiGastronomy>('/api/servicios/gastronomia/').then(items => items.map(toGastronomyData));
export const fetchExcursiones = () => requestJson<ApiExcursion>('/api/excursiones/').then(items => items.map(toExcursionData));
export const fetchEspaciosEvento = () => requestJson<ApiEventSpace>('/api/eventos/espacios/').then(items => items.map(toEventSpaceData));
export const fetchServiciosCulturales = () => requestJson<ApiCulturalService>('/api/eventos/culturales/').then(items => items.map(toCulturalServiceData));
export const fetchOtrosServicios = () => requestJson<ApiOtherService>('/api/servicios/otros/').then(items => items.map(toOtherServiceData));