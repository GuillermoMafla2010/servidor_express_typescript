

import { UsuariosLista } from './../clases/usuarios-lista';
import {Socket} from "socket.io";
import socketIO from 'socket.io'
import {Usuario} from '../clases/usuario';


export const usuariosConectados= new UsuariosLista();

export const conectarCliente=(cliente:Socket)=>{
    const usuario= new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
}

export const desconectar=( cliente: Socket , io:SocketIO.Server)=>{

    cliente.on('disconnect',()=>{
        console.log("Cliente desconectado");
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos',usuariosConectados.getLista())
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
    usuariosConectados.actualizarNombre(cliente.id,payload.nombre)
    io.emit('usuarios-activos',usuariosConectados.getLista());
    callback({
        ok:true,
        mensaje:`Usuario ${payload.nombre}`
    })
    //io.emit('mensaje-nuevo' , payload )
})
} 


export const obtenerUsuarios=(cliente:Socket , io:socketIO.Server)=>{ 
    cliente.on('obtener-usuarios',()=>{
    
    io.emit('usuarios-activos',usuariosConectados.getLista());
    
    //io.emit('mensaje-nuevo' , payload )
})
} 