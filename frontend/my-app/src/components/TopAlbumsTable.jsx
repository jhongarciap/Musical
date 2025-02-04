import React from "react";

const topAlbums = [
  {
    img: "/Images/imagen_nebulosa_naranja_1.jpg",
    name: "1989",
    artist: "Taylor Swift",
  },
  {
    img: "/Images/imagen_nebulosa_naranja_1.jpg",
    name: "Reputation",
    artist: "Taylor Swift",
  },
  {
    img: "/Images/imagen_nebulosa_naranja_1.jpg",
    name: "Evermore",
    artist: "Taylor Swift",
  },
  {
    img: "/Images/imagen_nebulosa_naranja_1.jpg",
    name: "Red",
    artist: "Taylor Swift",
  },
  {
    img: "/Images/imagen_nebulosa_naranja_1.jpg",
    name: "Lover",
    artist: "Taylor Swift",
  },
];

const TopAlbumsTable = () => {
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
        Top Albums
      </h3>

      {/* Fila con la imagen grande */}
      <div
        style={{
          width: "100%",
          height: "250px",
          marginBottom: "20px",
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img
          src={topAlbums[0].img}
          alt={topAlbums[0].name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "white",
            fontWeight: "bold",
            fontSize: "1.5rem",
          }}
        >
          <span
            style={{
              fontWeight: "bold",
              fontSize: "1.8rem",
            }}
          >
            {topAlbums[0].name}
          </span>
          <br />
          {topAlbums[0].artist}
        </div>
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "#E8B94D",
            fontWeight: "bold",
            fontSize: "5rem",
          }}
        >
          1
        </div>
      </div>

      {/* Fila con las imágenes pequeñas */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {/* Imagen pequeña 1 */}
        <div
          style={{
            width: "48%",
            height: "120px",
            marginBottom: "10px",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src={topAlbums[1].img}
            alt={topAlbums[1].name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
            >
              {topAlbums[1].name}
            </span>
            <br />
            {topAlbums[1].artist}
          </div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#E8B94D",
              fontWeight: "bold",
              fontSize: "2.5rem",
            }}
          >
            2
          </div>
        </div>

        {/* Imagen pequeña 2 */}
        <div
          style={{
            width: "48%",
            height: "120px",
            marginBottom: "10px",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src={topAlbums[2].img}
            alt={topAlbums[2].name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
            >
              {topAlbums[2].name}
            </span>
            <br />
            {topAlbums[2].artist}
          </div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#E8B94D",
              fontWeight: "bold",
              fontSize: "2.5rem",
            }}
          >
            3
          </div>
        </div>

        {/* Imagen pequeña 3 */}
        <div
          style={{
            width: "48%",
            height: "120px",
            marginBottom: "10px",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src={topAlbums[3].img}
            alt={topAlbums[3].name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
            >
              {topAlbums[3].name}
            </span>
            <br />
            {topAlbums[3].artist}
          </div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#E8B94D",
              fontWeight: "bold",
              fontSize: "2.5rem",
            }}
          >
            4
          </div>
        </div>

        {/* Imagen pequeña 4 */}
        <div
          style={{
            width: "48%",
            height: "120px",
            marginBottom: "10px",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <img
            src={topAlbums[4].img}
            alt={topAlbums[4].name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
            >
              {topAlbums[4].name}
            </span>
            <br />
            {topAlbums[4].artist}
          </div>
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              color: "#E8B94D",
              fontWeight: "bold",
              fontSize: "2.5rem",
            }}
          >
            5
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAlbumsTable;
