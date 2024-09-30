import React, { useState } from "react";
import axios from 'axios';

function Header() {
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post('https://localhost:3001/api/auth/logout');
      console.log(response);
      if (response.status === 200) {
        // Redirige a la página principal después de cerrar sesión
        window.location.replace('https://main.d3gn7cununfdbc.amplifyapp.com'); // Asegúrate que esta URL sea la correcta
      } else {
        console.error('Error al cerrar la sesión');
      }
    } catch (error) {
      console.error('Error en la solicitud de cierre de sesión:', error);
    }
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

      {/* Botón para cerrar sesión */}
      <button
        style={{
          height: '40px',
          padding: '0 1rem',
          borderRadius: '1rem',
          backgroundColor: 'transparent',
          color: isHovered ? '#E8B94D' : '#92DCE5',
          cursor: 'pointer',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'color 0.3s ease',
          fontFamily: "'Roboto Condensed', sans-serif",
          marginLeft: 'auto',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLogout}  // Cambiado para usar handleLogout
      >
        Salir
      </button>
    </header>
  );
}

export default Header;
