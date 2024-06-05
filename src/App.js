
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Sobre_Nosotros from './pages/Sobre_Nosotros';
import Proyectos from './pages/Proyectos';
import Nabvar from './components/Nabvar';
import Footer from './components/Footer';
import ProjectDisplay from './pages/ProjectDisplay';
function App() {
  return (
    <div className="App">
      <Router> 
        <Nabvar />
        <Routes>
          <Route path="/" element={<Sobre_Nosotros />} />
          <Route path="/Proyectos" element={<Proyectos />} />
          <Route path="/project/:id" element={<ProjectDisplay />} />
          </Routes>
          <Footer/>
      </Router>
    </div>
  );
}

export default App;
