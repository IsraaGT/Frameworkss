import { Sequelize } from 'sequelize';
import db from '../db/db.js';

const UserModel = db.define('usuario', {
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    TipoUsuarioId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'usuario',
    timestamps: false
});

export default UserModel;
