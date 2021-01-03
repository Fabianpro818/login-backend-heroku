const Sequelize = require('sequelize');     //require con S mayus 
const UserModel = require('./users');     //Se importa el modelo de la tabla users
const sequelize = new Sequelize('3mpdkFSLFA', '3mpdkFSLFA', 'xyIrj9Fwgq', {     //nombre usuario, nombre base de datos, contraseña
    host: 'remotemysql.com',
    port: '3306',
    dialect: 'mysql'
  });

  const usuario = UserModel(sequelize, Sequelize);  //Se instancia el modelo de la tabla users (sequelize con s minusc)

  sequelize.sync({force: false})        //Se sincronizan las tablas (modelo - base de datos)
    .then(()=>{                            // si la promesa se cumple entonces
    console.log('Tablas sincronizadas')
});

module.exports = {
    usuario
}