"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    //Agregar un usuario
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    //Actualizar un usuario
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log("------Usuario Actualizado----------------");
        console.log(this.lista);
    }
    //Obtener lista de usuarios
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    //Obtener un usuario en especifico
    getUsuario(id) {
        return this.lista.find(usuario => {
            return usuario.id === id;
        });
    }
    //Obtener todos los usuarios de una sala
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => {
            return usuario.sala === sala;
        });
    }
    //Borrar Usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => {
            return usuario.id !== id;
        });
        console.log(this.lista);
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
