import db from "../db/db.js";
import { DataTypes } from "sequelize";

const MangaModel = db.define('mangas', {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AutorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    GeneroId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    FechaDPublicacion: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false 
});

export default MangaModel;
