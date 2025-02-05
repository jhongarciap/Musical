import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentActivityTable = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentActivity = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtener el token JWT

      const response = await axios.get("https://backmusical.onrender.com/api/scrobbles/recent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setActivity(response.data);
    } catch (error) {
      console.error("Error al obtener la actividad reciente:", error);
      setError("No se pudo cargar la actividad reciente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  if (loading) {
    return <div>Cargando actividad reciente...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

      {activity.length === 0 ? (
        <p>No hay actividad reciente.</p>
      ) : (
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
                <td style={{ paddingRight: "16px" }}>
                  <img
                    src={song.albumCover || "/Images/default-cover.jpg"}
                    alt={song.albumName || "Álbum"}
                    style={{
                      width: "35px",
                      height: "35px",
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "8px",
                    }}
                  />
                </td>

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
      )}
    </div>
  );
};

export default RecentActivityTable;
