import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchLugares } from "./aldabaApi";


describe("aldabaApi", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("mapea la respuesta del endpoint de lugares a la estructura de UI", async () => {
    const mockPayload = [
      {
        id: 1,
        slug: "plaza-mayor",
        nombre: "Plaza Mayor",
        categoria: "Patrimonio",
        categoria_color: "#1B4F8A",
        foto: "https://example.com/plaza.jpg",
        foto_hero: "https://example.com/plaza-hero.jpg",
        resumen: "Centro historico",
        descripcion: "Descripcion",
        horario: "24h",
        entrada: "Gratuita",
        ubicacion: "Trinidad",
        distancia: "0 km",
        consejos: "Lleva agua",
      },
    ];

    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      {
        ok: true,
        json: async () => mockPayload,
      } as Response,
    );

    const lugares = await fetchLugares();

    expect(lugares).toHaveLength(1);
    expect(lugares[0]).toMatchObject({
      slug: "plaza-mayor",
      nombre: "Plaza Mayor",
      categoriaColor: "#1B4F8A",
      fotoHero: "https://example.com/plaza-hero.jpg",
    });
  });

  it("lanza error si la API devuelve status no exitoso", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      {
        ok: false,
        status: 500,
        json: async () => ({}),
      } as Response,
    );

    await expect(fetchLugares()).rejects.toThrow("Request failed for /api/lugares/: 500");
  });
});
