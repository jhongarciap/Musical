import React from "react";
import { SocialIcon } from "react-social-icons"; // Importando el componente SocialIcon

const song = {
  img: "/Images/imagen_nebulosa_naranja_1.jpg",
  title: "Coincidence",
  artist: "Sabrina Carpenter",
  url: "https://musical-tawny.vercel.app", // URL de la canción o página de tu aplicación
};

const ShareSong = () => {
  // Funciones para compartir en cada red social
  const shareOnWhatsApp = () => {
    const message = `Musical me ha dicho que ${song.title} de ${song.artist} es mi canción favorita ¡Qué genial es esto! Conócela con solo un clic: ${song.url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareOnFacebook = () => {
    const message = `Musical me ha dicho que ${song.title} de ${song.artist} es mi canción favorita ¡Qué genial es esto! Conócela con solo un clic: ${song.url}`;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(song.url)}&quote=${encodeURIComponent(message)}`, "_blank");
  };

  const shareOnX = () => {
    const message = `Musical me ha dicho que ${song.title} de ${song.artist} es mi canción favorita ¡Qué genial es esto! Conócela con solo un clic: ${song.url}`;
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(song.url)}`, "_blank");
  };

  return (
    <div
      style={{
        backgroundColor: "#FAFAFA",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        margin: "auto",
        fontFamily: "Roboto Condensed, sans-serif",
      }}
    >
      <h3
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: "2rem",
          marginBottom: "16px",
          textAlign: "center", // Título centrado
        }}
      >
        Comparte tu canción favorita
      </h3>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {/* Botones para compartir (como íconos) */}
        <button
          onClick={shareOnWhatsApp}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <SocialIcon
            url="https://wa.me/"
            style={{ width: 35, height: 35 }}
            bgColor="#25D366"
            fgColor="#fff"
          />
        </button>

        <button
          onClick={shareOnFacebook}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <SocialIcon
            url="https://www.facebook.com/sharer/sharer.php"
            style={{ width: 35, height: 35 }}
            bgColor="#1877F2"
            fgColor="#fff"
          />
        </button>

        <button
          onClick={shareOnX}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <SocialIcon
            url="https://x.com/intent/tweet"
            style={{ width: 35, height: 35 }}
            bgColor="#1DA1F2"
            fgColor="#fff"
          />
        </button>
      </div>
    </div>
  );
};

export default ShareSong;
