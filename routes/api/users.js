//Manejador de todas las peticiones de la ruta /api

const router = require('express').Router();     //Se importa el router de express
const { usuario } = require('../../models');    //Se importa el modelo usuario desde models
const controladorUsuario = require('../../controllers/controladorUsuario.js');  //Se importa el controlador usuario
var bcrypt = require('bcryptjs');   //Se importa el modulo para encriptar y desencriptar contraseñas

//api/user/
router.get('/', async (req, res)=>{
    const user = await usuario.findAll();   //Se devuelven todos los registros de la tabla usuario
    res.status(200).json(user);             //La respuesta va en formato JSON
});

//api/user/register
router.post('/register', async (req, res)=>{
    req.body.password = await bcrypt.hashSync(req.body.password, 10);    //Se encripta la contraseña (10 ciclos de encript)
    const user = await usuario.create(req.body);    //Se registra el nuevo usuario en la DB
    res.status(200).json(user);     //Se responde con un JSON con los datos de nuevo usuario
})

//api/user/login
router.post('/login', controladorUsuario.login);       //en este caso la logica está en un controlador
                                                    //en los anteriores está aquí mismo

module.exports = router;        //Se exporta el router