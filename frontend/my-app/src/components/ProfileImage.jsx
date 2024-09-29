import React, { useState, useEffect } from "react";
import axios from 'axios';

function ProfileImage() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://musical-umh8.onrender.com/api/auth/profile', { withCredentials: true });
        setUserData(response.data);
      } catch (err) {
        setError('Error al cargar los datos del usuario');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
          src={userData.profile_image}
          alt="Profile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{
          fontFamily: "'Roboto Condensed', sans-serif",
          fontSize: '2rem',
          color: 'black'
        }}>
          @{userData.username}
        </h1>
        {userData.is_pro && (
          <h2 style={{
            fontFamily: "'Roboto Condensed', sans-serif",
            fontSize: '1.2rem',
            color: '#E8B94D'
          }}>
            Usuario Pro
          </h2>
        )}
      </div>
    </div>
  );
}

export default ProfileImage;
