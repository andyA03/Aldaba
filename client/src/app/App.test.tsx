import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "./App";


describe("App routing", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renderiza la pagina de Lugares para /lugares", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      {
        ok: true,
        json: async () => [],
      } as Response,
    );

    render(
      <MemoryRouter initialEntries={["/lugares"]}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Lugares Turísticos")).toBeInTheDocument();
  });
});
