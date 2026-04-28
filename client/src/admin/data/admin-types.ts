export type SectionKey = "hostales" | "excursiones" | "restaurantes";

export type Habitacion = {
  id: number;
  hostal: string;
  foto: string;
  numero: string;
  tipo: string;
  huespedes: number;
  disponible: boolean;
  precio: number;
  reserva: string;
};

export type Excursion = {
  id: number;
  nombre: string;
  foto: string;
  fecha: string;
  hora: string;
  personas: number;
  guia: string;
  precio: number;
  estado: string;
};

export type Mesa = {
  id: number;
  restaurante: string;
  foto: string;
  numero: number;
  capacidad: number;
  ocupada: boolean;
  reserva: string;
  pago: number;
  estado: string;
};

export type Section = {
  key: SectionKey;
  label: string;
  icon: string;
};
