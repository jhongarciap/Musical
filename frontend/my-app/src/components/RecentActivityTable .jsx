import React from "react";

const activity = [
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "Coincidence", artist: "Sabrina Carpenter" },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "How to disappear", artist: "Lana del Rey" },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "WILDFLOWER", artist: "Billie Eilish" },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "Make You Feel My Love", artist: "Adele" },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "Haunted", artist: "Beyonce" },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "Love on the Brain", artist: "Rihanna" },
];

const RecentActivityTable = () => {
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
        maxWidth: "100%",
      }}
    >
      {/* Título Actividad Reciente */}
      <h3
        style={{
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "left",
            marginBottom: "20px",
            color: "black",
        }}
      >
        Actividad Reciente
      </h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {activity.map((song, index) => (
            <tr
              key={index}
              style={{
                borderBottom: "1px solid #D9D9D9",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DEDEDE")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {/* Imagen */}
              <td style={{ paddingRight: "16px" }}>
                <img
                  src={song.img}
                  alt={song.title}
                  style={{
                    width: "35px",
                    height: "35px",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "8px", // cuadrado con bordes redondeados
                  }}
                />
              </td>

              {/* Título de la Canción */}
              <td
                style={{
                  paddingRight: "16px",
                  maxWidth: "188px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
                title={song.title}
              >
                {song.title}
              </td>

              {/* Nombre del Artista */}
              <td
                style={{
                  paddingRight: "16px",
                  maxWidth: "188px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "normal",
                  fontSize: "1rem",
                }}
              >
                {song.artist}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivityTable;
