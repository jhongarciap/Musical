import React, { useState, useEffect } from "react";
import axios from 'axios';

function ProfileImage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para saber si los datos están cargando
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Hacer una solicitud al backend para obtener la información del perfil
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://backmusical.onrender.com/api/auth/profile', { withCredentials: true });
        console.log(response.data);
        setUserData(response.data); // Guardar los datos del usuario en el estado
      } catch (err) {
        setError('Error al cargar los datos del usuario');
      } finally {
        setLoading(false); // Cambiar el estado de carga
      }
    };

    fetchUserData();
  }, []); // El arreglo vacío asegura que esto solo ocurra al montar el componente

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga
  }

  if (error) {
    return <div>{error}</div>; // Mostrar mensaje de error si algo falla
  }

  // Renderizar el perfil del usuario si los datos han sido cargados
  return (
    <div style={{ position: 'relative', width: '100%', height: '300px', backgroundColor: 'white' }}>
      {/* Imagen de fondo */}
      <div style={{ position: 'relative', height: '150px', overflow: 'hidden' }}>
        <img
          src="/Images/degradado 1.jpg"
          alt="Background"
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Imagen de perfil superpuesta */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '75px',
          transform: 'translateX(-50%)',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img
          src={userData.profile_image} // Usar la imagen de perfil del usuario
          alt="Profile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Nombre de usuario y estado Pro */}
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{
          fontFamily: "'Roboto Condensed', sans-serif",
          fontSize: '2rem',
          color: 'black'
        }}>
          @{userData.username} {/* Mostrar el nombre del usuario */}
        </h1>
        {userData.is_pro && (
          <h2 style={{
            fontFamily: "'Roboto Condensed', sans-serif",
            fontSize: '1.2rem',
            color: '#E8B94D'
          }}>
            Usuario Pro {/* Mostrar si el usuario es Pro */}
          </h2>
        )}
      </div>
    </div>
  );
}

export default ProfileImage;
