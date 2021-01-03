/********  Modelo de la tabla users ***************
La tabla users tiene los siguientes campos:
id: integer (clave primaria)
usarname: string
email: string
password: string
rol: string
*/
const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, type)=>{
    return sequelize.define('user', {
        // Se definen los atributos del modelo
        id: {
            type: DataTypes.INTEGER,        //tambien se puede type.INTEGER
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        username: type.STRING,
        email: type.STRING,
        password: type.STRING,
        rol: type.STRING
 
      }, {
        // Other model options go here
      });

}