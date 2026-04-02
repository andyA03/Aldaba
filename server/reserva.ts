// Ejemplo de clase Experto para backend (TypeScript)
// Archivo: server/reserva.ts

import { type User } from "@shared/schema";

export interface Servicio {
  id: string;
  nombre: string;
  precioPorPersona: number;
}

export interface ReservaData {
  id: string;
  usuario: User;
  servicio: Servicio;
  fechaInicio: Date;
  fechaFin: Date;
  cantidadPersonas: number;
}

export class Reserva {
  private data: ReservaData;

  constructor(data: ReservaData) {
    this.data = data;
  }

  // El experto conoce toda la lógica relevante
  esValida(): boolean {
    // Por ejemplo, la fecha de inicio debe ser anterior a la de fin
    return this.data.fechaInicio < this.data.fechaFin && this.data.cantidadPersonas > 0;
  }

  calcularCostoTotal(): number {
    const dias = Math.ceil((this.data.fechaFin.getTime() - this.data.fechaInicio.getTime()) / (1000 * 60 * 60 * 24));
    return dias * this.data.cantidadPersonas * this.data.servicio.precioPorPersona;
  }

  getResumen(): string {
    return `Reserva para ${this.data.usuario.username} en ${this.data.servicio.nombre} del ${this.data.fechaInicio.toDateString()} al ${this.data.fechaFin.toDateString()} para ${this.data.cantidadPersonas} personas. Total: $${this.calcularCostoTotal()}`;
  }
}
