const { DataTypes, Model } = require('sequelize');
// const db = require('./db');
import db = require('./db');
const User = require('./models/User');

async function atualizaDb() {
    await User.sync({ force: true });
    await User.create({
        name: "Luca",
        password: "1234",
        email: "teste@gmail.com"
    });

    let logado = await User.locateUser('teste@gmail.com', '1234');
    console.log(logado.toJSON());
}

atualizaDb();