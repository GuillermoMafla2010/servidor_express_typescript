import { Usuario } from './usuario';
export class UsuariosLista{
    private lista:Usuario[]=[];

    constructor(){}

    //Agregar un usuario
    public agregar (usuario:Usuario){
        this.lista.push(usuario)
        console.log(this.lista)
        return usuario
    }


    //Actualizar un usuario
    public actualizarNombre(id:string , nombre:string){
        for (let usuario of this.lista){
            if(usuario.id===id){
                usuario.nombre=nombre
                break;
            }
        }
        console.log("------Usuario Actualizado----------------")
        console.log(this.lista);
    }


    //Obtener lista de usuarios
    public getLista(){
        return this.lista.filter(usuario=>usuario.nombre!=='sin-nombre');
    }


    //Obtener un usuario en especifico
    public getUsuario(id:string){
        return this.lista.find(usuario=>{
            return usuario.id===id
        })
    }


    //Obtener todos los usuarios de una sala
    public getUsuariosEnSala(sala:string){
        return this.lista.filter(usuario=>{
            return usuario.sala === sala
        })
    }


    //Borrar Usuario
    public borrarUsuario(id:string){
        const tempUsuario=this.getUsuario(id);
        this.lista=this.lista.filter(usuario=>{
            return usuario.id!==id;
        })

        
        console.log(this.lista)
        return tempUsuario;
    }
}