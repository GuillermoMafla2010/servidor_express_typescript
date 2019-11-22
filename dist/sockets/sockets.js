"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.desconectar = (cliente) => {
    cliente.on('disconnect', () => {
        console.log("Cliente desconectado");
    });
};
//Escuchar mensajes desde front
exports.mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
