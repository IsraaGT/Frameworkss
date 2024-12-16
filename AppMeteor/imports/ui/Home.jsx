import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { useNavigate } from 'react-router-dom';

const Home = ({ user, setUser }) => {
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [usuarioEliminar, setUsuarioEliminar] = useState('');
  const navigate = useNavigate();

  // Obtener la información del usuario al cargar el componente
  useEffect(() => {
    if (user?.id) {
      console.log(`Llamando a users.getUserById con ID: ${user.id}`);
      Meteor.call('users.getUserById', user.id, (err, result) => {
        if (err) {
          console.error('Error al obtener la información del usuario:', err);
        } else {
          console.log('Información del usuario obtenida:', result);
          setUser(result); // Actualiza el estado con el usuario
        }
      });
    }
  }, [user?.id]);

  // Manejar el cambio de nombre del usuario
  const handleChangeName = () => {
    if (!nuevoNombre) {
      alert('Por favor, ingrese un nuevo nombre');
      return;
    }

    Meteor.call('users.updateName', user.id, nuevoNombre, (err) => {
      if (err) {
        alert('Error al actualizar el nombre: ' + err.reason);
      } else {
        alert('Nombre actualizado con éxito');
        setNuevoNombre('');
        // Refrescar los datos del usuario
        Meteor.call('users.getUserById', user.id, (err, result) => {
          if (!err) setUser(result);
        });
      }
    });
  };

  // Manejar la eliminación de usuario (cambiar el status a 0)
  const handleDeleteUser = () => {
    if (!usuarioEliminar) {
      alert('Por favor, ingrese el ID del usuario a eliminar');
      return;
    }

    Meteor.call('users.deleteAccount', usuarioEliminar, (err) => {
      if (err) {
        alert('Error al desactivar el usuario: ' + err.reason);
      } else {
        alert('Usuario desactivado con éxito');
        setUsuarioEliminar('');
      }
    });
  };

  // Redirigir a la página de registro
  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>Bienvenido, {user?.nombre || 'Usuario'}!</h1>
      {console.log('Estado del usuario:', user)}

  

      {/* Sección para cambiar el nombre */}
      <div style={{ marginTop: '20px' }}>
        <h3>Cambiar Nombre</h3>
        <input
          type="text"
          placeholder="Nuevo nombre"
          value={nuevoNombre}
          onChange={(e) => setNuevoNombre(e.target.value)}
        />
        <button onClick={handleChangeName}>Actualizar Nombre</button>
      </div>

      {/* Sección para eliminar un usuario (cambiar status a 0) */}
      <div style={{ marginTop: '20px' }}>
        <h3>Eliminar Usuario</h3>
        <input
          type="text"
          placeholder="Nombre del usuario a eliminar"
          value={usuarioEliminar}
          onChange={(e) => setUsuarioEliminar(e.target.value)}
        />
        <button onClick={handleDeleteUser}>Eliminar Usuario</button>
      </div>

      {/* Botón para cerrar sesión */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={() => {
            setUser(null);
            navigate('/login');
          }}
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Home;
