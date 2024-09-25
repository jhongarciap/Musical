import React from "react";

function Favorites() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#1A2779', // Color de fondo azul (el mismo del header)
        padding: '2rem', // Añadido para dar un poco de espacio alrededor del contenido
        paddingBottom: '200px', // Añadido un padding inferior de 25px
        color: 'white', // El texto será blanco
        marginBottom: '0', // Elimina cualquier margen en la parte inferior
      }}
    >
      <h2
        style={{
          marginTop: '3rem', // mt-12
          marginLeft: '1.75rem', // ml-7
          fontSize: '2.5rem', // text-4xl
          fontWeight: '800', // font-extrabold
          color: 'white', // Asegurarse de que el texto sea blanco
          fontFamily: "'Roboto Condensed', sans-serif",
        }}
      >
        Tus Favoritos
      </h2>
      <p
        style={{
          marginTop: '0rem', // mt-5
          marginLeft: '1.75rem', // ml-7
          fontSize: '1.5rem', // text-2xl
          textAlign: 'center',
          color: 'white', // Asegurarse de que el texto sea blanco
          fontFamily: "'Roboto Condensed', sans-serif",
        }}
      >
        Sabemos que el cambio de mood es muy importante, por esto para nosotros
        es muy importante
        <br />
        que conozcas tus favoritos del momento
      </p>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c3118c4a6e893607a14f120b69461de44c27020af3b4996595391ee7d73ecac?placeholderIfAbsent=true&apiKey=18c784e0a59f473995023f0319e731fa"
        alt="Favorites visualization"
        style={{
          marginTop: '2.5rem', // mt-10
          marginLeft: '1.75rem', // ml-7
          maxWidth: '100%',
          width: '882px',
          aspectRatio: '4.2',
        }}
      />
    </section>
  );
}

export default Favorites;
