import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentActivityTable = () => {
  // Estado para guardar la actividad reciente
  const [activity, setActivity] = useState([]);

  // Función para obtener la actividad reciente del backend
  const fetchRecentActivity = async () => {
    try {
      const response = await axios.get('/api/scrobbles/recent'); // Asegúrate de tener esta ruta en el backend
      setActivity(response.data); // Suponiendo que el backend devuelve los scrobbles recientes
    } catch (error) {
      console.error("Error al obtener la actividad reciente:", error);
    }
  };

  // Usamos useEffect para obtener los datos al cargar el componente
  useEffect(() => {
    fetchRecentActivity();
  }, []);

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
              {/* Imagen del Álbum */}
              <td style={{ paddingRight: "16px" }}>
                <img
                  src={song.albumCover} // Usando la portada del álbum obtenida desde el backend
                  alt={song.albumName}
                  style={{
                    width: "35px",
                    height: "35px",
                    objectFit: "cover",
                    display: "block",
                    borderRadius: "8px",
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
