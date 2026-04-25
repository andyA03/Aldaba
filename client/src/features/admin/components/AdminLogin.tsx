import { useState, type FormEvent } from "react";

type LoginScreenProps = {
  onLogin: () => void;
};

export default function AdminLogin({ onLogin }: LoginScreenProps) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (user === "admin" && pass === "admin123") {
      onLogin();
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-dot" />
          <div className="login-brand">Aldaba</div>
        </div>
        <div className="login-subtitle">Panel de Administración</div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label>Usuario</label>
            <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="admin" autoComplete="username" />
          </div>
          <div className="login-field">
            <label>Contraseña</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" autoComplete="current-password" />
          </div>
          {error && <div className="login-error">{error}</div>}
          <button type="submit" className="login-btn">Iniciar sesión</button>
        </form>
        <div className="login-hint">Usuario: <b>admin</b> · Contraseña: <b>admin123</b></div>
      </div>
    </div>
  );
}
