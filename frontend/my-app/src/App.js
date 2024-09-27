import './App.css';
import MainLayout from './components/MainLayout.jsx';
import MyComponent from './components/MyComponent.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />} /> {/* Página de inicio */}
          <Route path="/dashboard" element={<MyComponent />} /> {/* Página después del login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
