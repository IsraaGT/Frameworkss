import express from "express";
import cors from "cors";
import db from "./db/db.js";

import mangaRoutes from './routes/routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', mangaRoutes)

try {
    await db.authenticate()
    console.log('Conexión existosa a la BD')
} catch (error) {
    console.log('Error en la conexion:${error} ')

}

app.get('/', (req, res) =>{
    res.send('HOLA MUNDO')
})

app.listen(8000, ()=> {
    console.log('Server activo')
})