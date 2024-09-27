/**
 * This code was generated by Builder.io.
 */
import React, { useState } from "react";

function Header() {
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = () => {
    // Redirige al backend para iniciar la autenticación con Last.fm
    window.location.href = 'http://localhost:3001/api/auth/lastfm';
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        width: '100%',
        backgroundColor: '#1A2779',
        position: 'fixed',
        top: '0',
        zIndex: '1000',
        boxSizing: 'border-box',
        padding: '0 1.5rem',
      }}
    >
      <a href="/" style={{ textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <img
          loading="lazy"
          src="/Images/Logo_azul_claro.svg"
          alt="Logo"
          style={{
            height: '60px',
            objectFit: 'contain',
          }}
        />
      </a>

      <button
        style={{
          height: '40px',
          padding: '0 1rem',
          borderRadius: '1rem',
          backgroundColor: 'transparent',
          color: isHovered ? '#E8B94D' : '#92DCE5', // Cambia el color del texto al pasar el mouse
          cursor: 'pointer',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'color 0.3s ease',
          fontFamily: "'Roboto Condensed', sans-serif",
          marginLeft: 'auto', // Alinea el botón a la derecha
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLogin} // Agregado el evento onClick para redirigir al backend
      >
        Salir
      </button>
    </header>
  );
}

export default Header;
