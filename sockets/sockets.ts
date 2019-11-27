import {Socket} from "socket.io";
import socketIO from 'socket.io'

export const desconectar=( cliente: Socket)=>{

    cliente.on('disconnect',()=>{
        console.log("Cliente desconectado");
    })

}


//Escuchar mensajes desde front
export const mensaje=(cliente:Socket , io:socketIO.Server)=>{ 
                cliente.on('mensaje',(payload:{ de:string, cuerpo:string })=>{
                console.log('mensaje recibido',payload)

                io.emit('mensaje-nuevo' , payload )
    })
} 



//Configurar usuario para login
export const configurarUsuario=(cliente:Socket , io:socketIO.Server)=>{ 
    cliente.on('configurar-usuario',(payload:{ nombre:string } , callback:any)=>{
    console.log('Configurando Usuario',payload.nombre)
    callback({
        ok:true,
        mensaje:`Usuario ${payload.nombre}`
    })
    //io.emit('mensaje-nuevo' , payload )
})
} 
