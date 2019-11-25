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

