import { Meteor } from 'meteor/meteor';
import connection from './mysql';

console.log('Métodos cargados en el servidor');

Meteor.methods({

'users.getUserById'(userId) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT id, nombre FROM usuario WHERE id = ? AND status = 1';
    console.log(`Consultando usuario con ID: ${userId}`);
    connection.execute(query, [userId], (err, results) => {
      if (err) {
        console.error('Error en la consulta:', err);
        reject(new Meteor.Error('Error en la base de datos', err));
      } else if (results.length === 0) {
        console.log('No se encontró el usuario');
        reject(new Meteor.Error('Usuario no encontrado'));
      } else {
        console.log('Usuario encontrado:', results[0]);
        resolve(results[0]); // Devuelve el usuario con el campo 'nombre'
      }
    });
  });
},

  // Registrar un nuevo usuario
  'users.register'(nombre, correo, clave) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO usuario (nombre, correo, clave, status) VALUES (?, ?, ?, ?)';
      connection.execute(query, [nombre, correo, clave, 1], (err, result) => {
        if (err) {
          reject(new Meteor.Error('Error en la base de datos', err));
        } else {
          resolve(result.insertId); 
        }
      });
    });
  },

 
  'users.login'(correo, clave) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM usuario WHERE correo = ? AND clave = ? AND status = 1';
      connection.execute(query, [correo, clave], (err, results) => {
        if (err) {
          console.log('Error en la consulta:', err);
          reject(new Meteor.Error('Error en la base de datos'));
        }
        if (results.length === 0) {
          console.log('No se encontró el usuario o la contraseña no es correcta');
          reject(new Meteor.Error('Cuenta inactiva o no registrada'));
        } else {
          console.log('Usuario encontrado:', results[0]);
          resolve(results[0]); 
        }
      });
    });
  },

  // Actualizar el nombre de usuario
  'users.updateName'(userId, nuevoNombre) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE usuario SET nombre = ? WHERE id = ?';
      connection.execute(query, [nuevoNombre, userId], (err, result) => {
        if (err) {
          reject(new Meteor.Error('Error al actualizar el nombre', err));
        } else {
          resolve(result);
        }
      });
    });
  },

  // Desactivar la cuenta del usuario 
  'users.deleteAccount'(userId) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE usuario SET status = 0 WHERE nombre = ?';
      connection.execute(query, [userId], (err, result) => {
        if (err) {
          reject(new Meteor.Error('Error al desactivar la cuenta', err));
        } else {
          resolve(result);
        }
      });
    });
  },

 
});
