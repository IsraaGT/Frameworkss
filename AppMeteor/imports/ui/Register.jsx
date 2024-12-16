import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const navigate = useNavigate();

  // Función para manejar el registro
  const handleRegister = () => {
    if (!nombre || !correo || !clave) {
      alert('Por favor, complete todos los campos');
      return;
    }

    // Llama al método de registro
    Meteor.call('users.register', nombre, correo, clave, (err, result) => {
      if (err) {
        alert('Error: ' + err.reason);
      } else {
        alert('Usuario registrado con éxito');
        // Iniciar sesión automáticamente después del registro
        Meteor.loginWithPassword(correo, clave, (err) => {
          if (err) {
            alert('Error en el login: ' + err.reason);
          } else {
            navigate('/home'); // Redirige a la página de inicio si el login fue exitoso
          }
        });
      }
    });
  };

  // Función para redirigir al usuario a la página de inicio de sesión
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div>
      <h2>Registrarse</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <br />
      <input
        type="email"
        placeholder="Correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Contraseña"
        value={clave}
        onChange={(e) => setClave(e.target.value)}
      />
      <br />
      <button onClick={handleRegister}>Registrar</button>

      {/* Nuevo botón para iniciar sesión */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleLogin}>¿Ya tienes cuenta? Inicia sesión</button>
      </div>
    </div>
  );
};

export default Register;
