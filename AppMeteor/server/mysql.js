import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: '', 
  database: 'practica' 
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado como id ' + connection.threadId);
});

export default connection;
