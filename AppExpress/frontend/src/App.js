import logo from './logo.svg';
import './App.css';
import CompLogin from './manga/Login';
import CompMostrarMangas from './manga/MostrarManga';
import CompCrearManga from './manga/CrearManga';
import CompEditarManga from './manga/EditarManga';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompLogin />} />
          <Route path='/Mostrar' element={<CompMostrarMangas />} />
          <Route path='/create' element={<CompCrearManga />} />
          <Route path='/edit/:id' element={<CompEditarManga />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
