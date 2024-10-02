import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el token de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      // Guardar el token en localStorage
      localStorage.setItem('token', token);

      // Redirigir al dashboard o página deseada
      navigate('/dashboard');
    } else {
      console.error("Token no encontrado");
    }
  }, [navigate]);

  return <div>Cargando...</div>;
}

export default Callback;
