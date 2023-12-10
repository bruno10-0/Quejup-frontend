import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registrar from './pages/Registrar';
import Ingresar from './pages/Ingresar';
import Publicacion from './components/Publicacion';
import Principal from './pages/Principal'
import Perfil from './pages/Perfil';
import Queja from './pages/Queja';
import { ConfirarEmail } from './pages/confirarEmail';
import {PaginaNoEncontrada} from './pages/paginaNoEncontrada'
import {ValidatedMessage} from './pages/CuentaValidada'
import { Mapa } from './components/Mapa';
//import Bienvenida from './pages/Bienvenida'
import RutaProtegida from "./rutaProtegida"
import {Bienvenida} from './pages/home';
import { AuthProvider } from './context/authContext'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<Bienvenida/>} />
          <Route path="/ingresar" element={<Ingresar />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/confirmarEmail" element={<ConfirarEmail />} />
          <Route path="/CuentaValidada" element={<ValidatedMessage />} />
          <Route path="*" element={<PaginaNoEncontrada/>} />

          <Route element={<RutaProtegida/>}>
            <Route path="/inicio" element={<Principal />} />
            <Route path="/queja" element={<Queja />} />
            <Route path="/publicacion" element={<Publicacion />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/mapa" element={<Mapa />} />
          </Route>

         
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);
