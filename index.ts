import Server from "./clases/server";
import router from "./rutas/router";
import bodyParser = require("body-parser");
import cors from 'cors';

const server=Server.instance


//bodyParser
server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json())
//cors
server.app.use(cors({origin:true , credentials:true}))


server.app.use('/',router);


server.start(()=>{
    console.log("Servidor iniciado")
})