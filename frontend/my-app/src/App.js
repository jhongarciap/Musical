import './App.css';
import MainLayout from './components/MainLayout.jsx';
import MyComponent from './components/MyComponent.jsx';
import Callback from './components/Callback.jsx'; // Importa Callback
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />} /> {/* Página de inicio */}
          <Route path="/callback" element={<Callback />} /> {/* Componente de Callback */}
          <Route path="/dashboard" element={<MyComponent />} /> {/* Página después del login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

