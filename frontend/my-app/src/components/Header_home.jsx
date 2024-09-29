import React, { useState } from "react";
import axios from 'axios';

function Header() {
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axios.post('https://musical-umh8.onrender.com/api/auth/logout', { withCredentials: true });
      if (response.status === 200) {
        window.location.href = '/'; // Redirige a la página principal
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
          transition: 'color 0.3s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleLogout}  // Cambiado para usar la API correcta
      >
        Salir
      </button>
    </header>
  );
}

export default Header;
