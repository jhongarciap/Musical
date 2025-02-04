import React from "react";

const genres = [
  { genre: "Pop", id: 1 },
  { genre: "Rock", id: 2 },
  { genre: "Jazz", id: 3 },
];

const GenresTable = () => {
  // Función para obtener el color según el número
  const getColor = (id) => {
    if (id === 1) return "#E8B94D"; // Dorado para el número 1
    if (id === 2) return "#EFCF85"; // Amarillo claro para el número 2
    if (id === 3) return "#EDDAAD"; // Color más suave para el número 3
    return "#000"; // Color predeterminado en caso de otros valores
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
      {/* Título de la sección alineado a la izquierda */}
      <h3
        style={{
          color: "black",
          fontWeight: "bold",
          fontSize: "2rem",
          marginBottom: "16px",
          textAlign: "left", // Alineación a la izquierda
        }}
      >
        Top Géneros
      </h3>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          <tr>
            {genres.map((genre, index) => (
              <td
                key={index}
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  color: "black",
                  padding: "16px",
                  transition: "background-color 0.3s ease",
                  cursor: "pointer",
                  borderRadius: "8px",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#DEDEDE")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span style={{ fontWeight: "bold" }}>{genre.genre}</span>
                <span
                  style={{
                    backgroundColor: getColor(genre.id), // Usamos la función getColor
                    color: "white",
                    borderRadius: "50%",
                    padding: "8px",
                    marginLeft: "8px",
                    fontSize: "1.2rem",
                    display: "inline-block",
                    minWidth: "35px",
                    textAlign: "center",
                  }}
                >
                  ★ {genre.id}
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GenresTable;
