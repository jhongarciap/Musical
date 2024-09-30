import React, { useState } from "react";

function Header() {
  const [isHovered, setIsHovered] = useState(false);

  const handleLogin = () => {
    // Redirige al backend para iniciar la autenticación con Last.fm
    window.location.href = 'https://backmusical.onrender.com/api/auth/lastfm';
  };
  
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
      {/* Envolviendo la imagen en un enlace para redirigir */}
      <a href="/" style={{ textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4ef9abeb93c26e786aa1e21b897530320d828dc2090ca32a64176378c96d4988?placeholderIfAbsent=true&apiKey=18c784e0a59f473995023f0319e731fa"
          alt="Logo"
          style={{
            height: '60px',
            objectFit: 'contain',
          }}
        />
      </a>

      {/* Botón de iniciar sesión con Last.fm */}
      <button
        style={{
          height: '40px',
          padding: '0 1rem',
          borderRadius: '1rem',
          backgroundColor: isHovered ? '#E8B94D' : '#D3D3D3', // Cambia el fondo al pasar el cursor
          cursor: 'pointer',
          border: 'none',
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'background-color 0.3s ease',
          fontFamily: "'Roboto Condensed', sans-serif", // Añadir la fuente aquí
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLogin}  // Redirigir al backend al hacer clic
      >
        Ingresa con Last.fm
        {/* Imagen SVG a la derecha del texto */}
        <img
          src="/Images/last-fm.svg" // Ruta de la imagen SVG
          alt="Last.fm logo"
          style={{
            height: "20px",
            objectFit: "contain",
            filter: isHovered
              ? "invert(48%) sepia(94%) saturate(1822%) hue-rotate(148deg) brightness(95%) contrast(90%)" // Color cuando se pasa el cursor (hover)
              : "invert(67%) sepia(93%) saturate(591%) hue-rotate(5deg) brightness(99%) contrast(92%)", // Color inicial (#E8B94D)
            transition: "filter 0.3s ease",
          }}
        />
      </button>
    </header>
  );
}

export default Header;
