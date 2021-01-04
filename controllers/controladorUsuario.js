const { usuario } = require('../models');    //Se importa el modelo usuario desde models
var bcrypt = require('bcryptjs');   //Se importa el modulo para encriptar y desencriptar contraseñas
const jwt = require('jsonwebtoken');
const models = require('../models')

//La información del usuario viene en req.body (request body) => email y password

exports.login = async(req, res, next) =>{   //Metodo para la petición login
    try {
        const usuarioActual = await models.usuario.findOne({where: {email: req.body.email}}); //Se verifica que el email esté en la base de datos 
        if (usuarioActual)        //si el usuario existe en la base de datos
            {
                //Se verifica que las contraseñas coincidan. Se usa compareSync porque en la DB la contraseña 
                //está encriptada y la que ingresa el usario no.
                const passwordValido = bcrypt.compareSync(req.body.password, usuarioActual.password);
                if(passwordValido)      //Si el password es válido
                    {                   //se devuelve el token al usuario para ingreso
                        const token = jwt.sign({
                                id: usuarioActual.id,
                                name: usuarioActual.username,
                                email: usuarioActual.email,
                                rol: usuarioActual.rol
                            }, 'config.secret', 
                            {expiresIn: 86400,}     //Vigencia de 86400 segundos = 1 día (el tiempo es configurable)
                        );
                        res.status(200).send({      //Estatus 200 = autenticación exitosa
                            auth: true,
                            tokenReturn: token      //En la respuesta se envía el token
                          //  user: usuarioActual   //y los datos de usuarios
                        })
                    }  //del if
                else{
                    res.status(401).json({      //Estatus 401 = autenticación fallida
                        error: 'Error en el usuario y/o la contraseña'
                    })
                }
                

            }
    }
    catch(error) {
        res.status(500).json({      //Estatus 500 = error de conexión
            message: 'Error de conexión'
        })
        next(error); //Muestra el error y continua
    }
};