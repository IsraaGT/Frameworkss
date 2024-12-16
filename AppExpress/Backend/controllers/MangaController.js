import MangaModel from "../models/MangaModel.js";
import UserModel from "../models/UserModel.js";

//Mostrar todos los mangas
export const getAllMangas = async (req, res)=>{
try {
   const mangas = await MangaModel.findAll({
   })
   res.json(mangas)
} catch (error) {
    res.json({message: error.message})
}
}

//Mostrar un manga
export const getManga = async (req, res)=>{
    try {
       const mangas = await MangaModel.findAll({
            where:{
                id:req.params.id
            },

        })
        res.json(mangas[0])
    } catch (error) {
        res.json({message: error.message})
    }
}
//Añadir un manga
export const createManga = async (req, res)=>{
try {
   await MangaModel.create(req.body)
   res.json({"message":"Manga añadido correctamente."})
} catch (error) {
    res.json({message: error.message})

}
}

//Actualizar un manga
export const updateManga = async (req,res)=>{
    try {
      await  MangaModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({"message":"Manga actualizado correctamente."})

    } catch (error) {
        res.json({message: error.message})
    }
}

//Eliminar un manga
export const deleteManga = async (req, res)=>{
    try {
      await  MangaModel.destroy({
        where: {id: req.params.id}
        })
        res.json({"message":"Manga eliminado correctamente."})
    } catch (error) {
        res.json({message: error.message})
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario en la base de datos por su email
        const user = await UserModel.findOne({
            where: { Email: email }
        });

        // Verificar si se encontró un usuario y si la contraseña coincide
        if (user && user.Password === password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Login failed. Invalid email or password.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during login.' });
    }
};