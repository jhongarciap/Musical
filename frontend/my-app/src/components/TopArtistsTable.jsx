import React from "react";

const topArtists = [
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", name: "Sabrina Carpenter" },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", name: "Lana del Rey" },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", name: "Billie Eilish" },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", name: "Adele" },
  { img: "/Images/imagen_nebulosa_naranja_1.jpg", name: "Beyonce" },
];

const TopArtistsTable = () => {
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
      {/* Título */}
      <h3
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          textAlign: "left",
          marginBottom: "20px",
          color: "black",
        }}
      >
        Top Artistas
      </h3>

      {/* Tabla */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
        }}
      >
        <tbody>
          {topArtists.map((artist, index) => (
            <tr key={index}>
              <td style={{ padding: "10px" }}>
                {/* Número */}
                <div
                  style={{
                    color: "#E8B94D",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    marginBottom: "5px",
                    textAlign: "left",
                  }}
                >
                  {index + 1}
                </div>

                {/* Imagen */}
                <img
                  src={artist.img}
                  alt={artist.name}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                    margin: "0 auto",
                  }}
                />

                {/* Nombre */}
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    marginTop: "5px",
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  {artist.name}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopArtistsTable;
