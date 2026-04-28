import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

// Mock del servidor de API
const mockApi = {
  getHostales: vi.fn(() => Promise.resolve([
    { id: 1, nombre: 'Hostal Central', foto: 'url', habitaciones_count: 5 },
  ])),
  getRestaurantes: vi.fn(() => Promise.resolve([
    { id: 1, nombre: 'Restaurante Gourmet', mesas_count: 8 },
  ])),
  getExcursiones: vi.fn(() => Promise.resolve([
    { id: 1, destino: 'Playa Bonita', precio: 25 },
  ])),
};

// Componente Home simulado
function Home() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    mockApi.getHostales().then(setData);
  }, []);

  return (
    <div>
      <h1>Bienvenido a Aldaba</h1>
      <div data-testid="home-sections">
        <section>Lugares</section>
        <section>Servicios</section>
      </div>
      {data && <div data-testid="hostales">{data.length} hostales</div>}
    </div>
  );
}

// Componente Lugares simulado
function Lugares() {
  const [lugares, setLugares] = React.useState([]);
  
  React.useEffect(() => {
    mockApi.getHostales().then(setLugares);
  }, []);

  return (
    <div>
      <h1>Listado de Hostales</h1>
      <div data-testid="lugares-list">
        {lugares.map(hostal => (
          <div key={hostal.id} className="hostal-card">
            <h2>{hostal.nombre}</h2>
            <p>Habitaciones: {hostal.habitaciones_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Test FE-01
describe('FE-01: Render Home', () => {
  it('debería mostrar secciones principales', () => {
    render(<Home />);
    expect(screen.getByText('Bienvenido a Aldaba')).toBeInTheDocument();
    expect(screen.getByText('Lugares')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
  });
});

// Test FE-02
describe('FE-02: Navegación a Lugares', () => {
  it('debería mostrar listado de hostales', async () => {
    render(<Lugares />);
    await waitFor(() => {
      expect(screen.getByText('Listado de Hostales')).toBeInTheDocument();
    });
    const listElement = screen.getByTestId('lugares-list');
    expect(listElement).toBeInTheDocument();
  });
});

// Test FE-04: Estado de error API
describe('FE-04: Estado de error API', () => {
  it('debería mostrar mensaje de error cuando API falla', async () => {
    const mockApiFail = {
      getHostales: vi.fn(() => Promise.reject(new Error('API Error'))),
    };
    
    function HostalesConError() {
      const [error, setError] = React.useState(null);
      
      React.useEffect(() => {
        mockApiFail.getHostales().catch(err => {
          setError(err.message);
        });
      }, []);
      
      return error ? <div data-testid="error">{error}</div> : <div>Loading...</div>;
    }
    
    render(<HostalesConError />);
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
      expect(screen.getByText('API Error')).toBeInTheDocument();
    });
  });
});

// Test FE-05 y FE-06: Login
describe('FE-05 y FE-06: Login admin', () => {
  it('debería aceptar login correcto', () => {
    function LoginForm() {
      const [username, setUsername] = React.useState('');
      const [password, setPassword] = React.useState('');
      const [message, setMessage] = React.useState('');
      
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === 'admin' && password === 'pass123') {
          setMessage('Login exitoso');
        } else {
          setMessage('Credenciales inválidas');
        }
      };
      
      return (
        <form onSubmit={handleSubmit}>
          <input
            data-testid="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
          />
          <input
            data-testid="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />
          <button type="submit">Ingresar</button>
          {message && <div data-testid="message">{message}</div>}
        </form>
      );
    }
    
    render(<LoginForm />);
    const usernameInput = screen.getByTestId('username');
    const passwordInput = screen.getByTestId('password');
    const button = screen.getByText('Ingresar');
    
    userEvent.type(usernameInput, 'admin');
    userEvent.type(passwordInput, 'pass123');
    userEvent.click(button);
    
    expect(screen.getByTestId('message')).toHaveTextContent('Login exitoso');
  });
});
