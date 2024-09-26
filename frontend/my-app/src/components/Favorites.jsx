import React from "react";

function Favorites() {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#1A2779', // Color de fondo azul (el mismo del header)
        padding: '0', // Elimina el padding para que no haya espacio
        color: 'white', // El texto será blanco
        marginBottom: '0', // Elimina cualquier margen en la parte inferior
      }}
    >
      {/* Contenedor para el semicírculo 2 (mostrando solo el semicírculo inferior) */}
      <div style={{
        overflow: 'hidden', // Oculta el exceso de la imagen
        height: '150px', // Altura del contenedor para el semicírculo
        width: '100%', // Ancho completo para ocupar el espacio
        position: 'relative', // Permite que la imagen se posicione
        margin: '0', // Elimina el margen
      }}>
        <img
          loading="lazy"
          src="/Images/2.png" // Imagen del semicírculo
          alt="Favorites_3"
          style={{
            width: '25%', 
            height: 'auto', // Mantiene la proporción de la imagen
            position: 'absolute', // Mantiene la imagen dentro del contenedor
            bottom: '0', // Alinea la imagen a la parte inferior del contenedor
            right: '0', // Alinea a la derecha
            borderRadius: '0 0 100% 100%', // Ajusta el radio para mostrar solo el semicírculo inferior
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <h2
        style={{
          marginTop: '0', // Elimina el margen superior
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
        alt="Favorites_1"
        style={{
          marginTop: '2.5rem', // mt-10
          marginLeft: '1.75rem', // ml-7
          maxWidth: '100%',
          width: '1000px',
          aspectRatio: '4.2',
          transition: 'width 0.3s ease', // Transición suave
        }}
        onMouseEnter={(e) => e.currentTarget.style.width = '1200px'} // Cambia el tamaño a 1200px cuando pasas el cursor
        onMouseLeave={(e) => e.currentTarget.style.width = '1000px'} // Vuelve al tamaño original al quitar el cursor
      />
      
      {/* Contenedor para el semicírculo 1 */}
      <div style={{
        overflow: 'hidden', // Oculta el exceso de la imagen
        height: '150px', // Altura del contenedor para el semicírculo
        width: '100%', // Ancho completo para ocupar el espacio
        position: 'relative', // Permite que la imagen se posicione
        marginTop: 'auto', // Alinea la imagen al final del contenedor
      }}>
        <img
          loading="lazy"
          src="/Images/1.png" // Imagen del semicírculo
          alt="Favorites_2"
          style={{
            width: '25%', 
            height: 'auto', // Mantiene la proporción de la imagen
            position: 'absolute', // Mantiene la imagen dentro del contenedor
            top: '0', // Alinea la imagen a la parte superior del contenedor
            left: '0', // Alinea a la izquierda
            borderRadius: '100% 100% 0 0', // Ajusta el radio para mostrar solo el semicírculo superior
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      
    </section>
  );
}

export default Favorites;
