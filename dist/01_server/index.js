"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const router_1 = __importDefault(require("./rutas/router"));
const bodyParser = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const server = new server_1.default();
//bodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
//cors
server.app.use(cors_1.default({ origin: true, credentials: true }));
server.app.use('/', router_1.default);
server.start(() => {
    console.log("Servidor iniciado");
});
