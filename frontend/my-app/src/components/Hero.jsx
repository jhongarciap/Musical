import React from "react";

function Hero() {
  return (
    <section
      style={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', // Centrado dentro del Hero
        padding: '5%',
        width: '100%',
        color: 'white',
        minHeight: '20vh', // 30% de la pantalla
        boxSizing: 'border-box',
      }}
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc2821097b6940f5fcfad49ceef8ea6eb45a591f97c6f1218c5e6150e1857abe?placeholderIfAbsent=true&apiKey=18c784e0a59f473995023f0319e731fa"
        alt=""
        style={{
          objectFit: 'cover',
          position: 'absolute',
          inset: '0',
          width: '100%',
          height: '100%',
          zIndex: '-1', // Asegura que la imagen esté detrás del texto
        }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '90%', // Hacemos que el contenido esté centrado dentro del Hero
          maxWidth: '800px', // Ajustamos el ancho máximo
          margin: '0 auto', // Centramos horizontalmente
          textAlign: 'left', // Alineado a la izquierda
        }}
      >
        <h1
          style={{
            fontSize: '35px', // Tamaño de letra grande
            fontFamily: "'Roboto Condensed', sans-serif",
            overflow: 'hidden', // Evitar el desbordamiento
            marginLeft: '-20%', // Acercar un poco al centro
            marginRight: '5%',
          }}
        >
          Explora la música que más escuchas conociendo tus estadísticas
        </h1>
        <p
          style={{
            marginTop: '0.5rem', // Reducido el margen superior
            fontSize: '20px', // Tamaño de letra pequeño
            fontFamily: "'Roboto Condensed', sans-serif",
            lineHeight: '1.5', // Separación entre líneas
            marginLeft: '-20%', // Acercar un poco al centro
            marginRight: '-5%',
          }}
        >
          Gracias a tu información con Last.Fm podrás obtener tus estadísticas, reportes y mucho más. ¡Ven y descúbrelo!
        </p>
      </div>
    </section>
  );
}

export default Hero;
