import {Sequelize} from 'sequelize'

const db = new Sequelize('bibliotecamanga', 'root', '',{
    host: 'localhost',
    dialect: 'mysql'
  


}) 

export default db