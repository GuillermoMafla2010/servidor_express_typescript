import { SERVER_PORT } from './../global/enviroment';
import express from 'express';
//SERVER_PORT


export default class Server{

    public app:express.Application;
    public port: number;

    constructor(){
        this.app=express();
        this.port=SERVER_PORT;
    }


    start(callback:any){
        this.app.listen(this.port , callback);
    }
}