const express = require('express');     //Importa express
const morgan = require('morgan');     //Importa morgan
const rutasApi = require('./routes')    //Se importan las rutas. Por defecto las busca en el archivo index.js
const bodyParser = require('body-parser');  //Se importa el body parser para manejo de JSON
const cors = require('cors');       //Se importa cors

const app =express();       //instancia de express en mi app

app.use(cors());
app.use(morgan('dev'));     //se configura morgan para atender peticiones (middleware)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use((req, res, next)=>{
//     res.header("Access-control-Allow-Origin", "*");
//     res.header("Access-control-Allow-Headers", "Origin, X-requested-With, Content-Type, Accept");
//     res.header("Access-control-Allow-Methods: GET, POST, DELETE");
//     next();
// })

app.use('/api', rutasApi);

app.set('puerto', process.env.PORT || 3000);     //Se pide al sistema que asigne un puerto o se toma el 3000 si está disponible

app.listen(app.get('puerto'), ()=>{          //Se crea el servidor host en el puerto 3000. app.get('puerto') devuelve un 3000
    console.log('servidor montado');     //Se envía un mensaje por consola para verificar que está montado
})    



//app.get('/', (req, res) => {            //Se crea la primera ruta
//    res.send('Hello World');        //Se envía cadena de respuesta
//});
