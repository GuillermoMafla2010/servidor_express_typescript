"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios_lista_1 = require("./../clases/usuarios-lista");
const usuario_1 = require("../clases/usuario");
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
exports.conectarCliente = (cliente) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log("Cliente desconectado");
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
//Escuchar mensajes desde front
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
//Configurar usuario para login
exports.configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        console.log('Configurando Usuario', payload.nombre);
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}`
        });
        //io.emit('mensaje-nuevo' , payload )
    });
};
exports.obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        //io.emit('mensaje-nuevo' , payload )
    });
};
