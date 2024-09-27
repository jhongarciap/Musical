import React from "react";

function ProfileImage() {
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
          top: '75px', // Ajustar para que la mitad quede fuera de la imagen de fondo
          transform: 'translateX(-50%)',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          overflow: 'hidden',
        }}
      >
        <img
          src="/Images/tay.jpg"
          alt="Profile"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Nombre de usuario */}
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h1 style={{
          fontFamily: "'Roboto Condensed', sans-serif", // Aplicación de la fuente
          fontSize: '2rem', // Ajuste de tamaño del texto
          color: 'black'
        }}>
          @Username
        </h1>
      </div>
    </div>
  );
}

export default ProfileImage;
