import { SERVER_PORT } from './../global/enviroment';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/sockets'
//SERVER_PORT


export default class Server{

    public static _instance:Server;

    public app:express.Application;
    public port: number;
    public io:socketIO.Server;
    private httpServer: http.Server

    constructor(){
        this.app=express();
        this.port=SERVER_PORT;
        this.httpServer=new http.Server(this.app)
        this.io=socketIO(this.httpServer)

        this.escucharSockets();
    }

    public static get instance(){
        return this._instance || (this._instance=new this());
    }


    //Funcion que esta pendiente de los mensajes de salida y de entrada de algun socket.
    private escucharSockets(){
        console.log("Escuchando conexiones");

        this.io.on("connection",cliente=>{
           //Conectar cliente

           socket.conectarCliente(cliente)


         //Escuchando mensaje
         socket.mensaje(cliente , this.io);

        //Desconectar
        socket.desconectar(cliente);

        //Configurar Usuario
        socket.configurarUsuario(cliente , this.io);

       
           
        })
    }


    start(callback:any){
        this.httpServer.listen(this.port , callback);
    }
}