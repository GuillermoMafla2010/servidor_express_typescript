import { usuariosConectados } from './../sockets/sockets';
import {Router , Request , Response} from "express";
import Server from "../clases/server";


const router=Router();



router.get('/mensajes',(req:Request,res:Response)=>{

    const cuerpo=req.body.cuerpo;
    const de = req.body.de;
    const payload={cuerpo,de};

    const server=Server.instance;
    server.io.emit('mensaje-nuevo',payload)
    res.json({
        ok:true,
        mensaje:"Todo esta bien"
    })
})


router.post('/mensajes/:id',(req:Request,res:Response)=>{
    
    const id=req.params.id
    const cuerpo=req.body.cuerpo;
    const de=req.body.de

    const payload={
        de , cuerpo
    }
    const server=Server.instance;

    server.io.in(id).emit( 'mensaje-privado' ,payload);

    res.json({
        ok:true,
        cuerpo,
        de,
        id
    })
})

//rest para verificar los id de los usuarios
router.get('/usuarios',(req:Request , res:Response)=>{
    const server = Server.instance;

    server.io.clients((err:any, clientes:any)=>{
        if(err){
            return res.json({ok:false , err})
        }

        res.json({ok:true , clientes});
    })
})


//Obtener los nombres de usuario
router.get('/usuarios/detalle',(req:Request, res:Response)=>{
    

    res.json({
        ok:true,
        clientes: usuariosConectados.getLista()
    })
})

export default router;