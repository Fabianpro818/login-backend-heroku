const router = require('express').Router(); //Se importa el manejador de rutas de express
const apiRouterUser = require('./api/users');   //Se importa el manejador para las peticiones por /api/user


router.use('/user',apiRouterUser);      // .com/api/user

module.exports = router;