import React from "react";

const songs = [
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "Coincidence", artist: "Sabrina Carpenter", plays: 100 },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "How to disappear", artist: "Lana del Rey", plays: 95 },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "WILDFLOWER", artist: "Billie Eilish", plays: 90 },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "Make You Feel My Love", artist: "Adele", plays: 85 },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "Haunted", artist: "Beyonce", plays: 80 },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", title: "Love on the Brain", artist: "Rihanna", plays: 75 },
];

const ScrobblesTable = () => {
  return (
    <div
      style={{
        backgroundColor: "#FAFAFA",
        padding: "24px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        margin: "auto",
        border: "0px solid #D9D9D9",
        fontFamily: "Roboto Condensed, sans-serif",
        maxWidth: "100%",
      }}
    >
      {/* Título Scrobbles */}
      <h3
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: "20px",
          color: "black",
        }}
      >
        Scrobbles
      </h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {songs.map((song, index) => (
            <tr
              key={index}
              style={{
                borderBottom: "1px solid #D9D9D9",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DEDEDE")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              {/* Número */}
              <td
                style={{
                  color: "#E8B94D",
                  fontSize: "2rem",
                  fontWeight: "bold",
                  paddingRight: "16px",
                  width: "40px",
                  textAlign: "center",
                }}
              >
                {index + 1}
              </td>

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
                    borderRadius: "8px",
                  }}
                />
              </td>

              {/* Título y Artista */}
              <td style={{ paddingRight: "16px", maxWidth: "188px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                <div
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={song.title}
                >
                  {song.title}
                </div>
                <div
                  style={{
                    color: "black",
                    fontSize: "1rem",
                    fontWeight: "normal",
                  }}
                >
                  {song.artist}
                </div>
              </td>

              {/* Veces escuchadas */}
              <td
                style={{
                  textAlign: "right",
                  fontWeight: "bold",
                  color: "#C2C0C0",
                  fontSize: "1.5rem",
                }}
              >
                #{song.plays}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScrobblesTable;
