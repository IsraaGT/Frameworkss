import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

const Login = ({ setUser }) => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate(); // Inicializamos useNavigate

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    Meteor.call('users.login', correo, clave, (err, result) => {
      if (err) {
        alert('Error: ' + err);
      } else {
        console.log('Resultado de login:', result); // Verifica los datos que recibes
        if (result && parseInt(result.status) === 1) { // Compara el status como número
          setUser(result); // Inicia sesión con el usuario activo
          navigate('/home'); // Redirige a la página de inicio
        } else {
          alert('Cuenta inactiva o no registrada');
        }
      }
    });
  };

  // Función para redirigir a la página de registro
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
      <br />
      {/* Botón para redirigir a la página de registro */}
      <button onClick={handleRegister}>Registrarse</button>
    </div>
  );
};

export default Login;
