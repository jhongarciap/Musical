import React from "react";

function Footer() {
  return (
    <footer
      style={{
        display: 'flex',
        justifyContent: 'space-between', // Distribuye elementos entre izquierda y centro
        alignItems: 'center', // Centrar verticalmente
        padding: '1.5rem 4rem',
        backgroundColor: 'black',
        color: 'white',
        width: '100%',
        boxSizing: 'border-box',
        position: 'fixed', // Hacer el footer fijo
        bottom: '0', // Siempre en la parte inferior
        left: '0',
        zIndex: '100', // Asegurarse de que el footer esté sobre el contenido
      }}
    >
      {/* Nombres alineados a la izquierda */}
      <div style={{ textAlign: 'left' }}>
        <p style={{ margin: '0', fontFamily: "'Roboto Condensed', sans-serif" }}>
          Jhon Alejandro García Pareja
          <br />
          Davi Tovar Zurita
        </p>
      </div>

      {/* Proyecto de clase centrado */}
      <p style={{ margin: '0', textAlign: 'center', flexGrow: 1, fontFamily: "'Roboto Condensed', sans-serif" }}>
        Proyecto de clase
      </p>

      {/* Imagen alineada a la derecha */}
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ff153322f312db0f814b78145bcceb441be0d29fc97ce36b63c3dee6cf29820?placeholderIfAbsent=true&apiKey=18c784e0a59f473995023f0319e731fa"
        alt="Project logo"
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
          width: '200px',
        }}
      />
    </footer>
  );
}

export default Footer;
