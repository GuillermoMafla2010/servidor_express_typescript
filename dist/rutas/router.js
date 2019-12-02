"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sockets_1 = require("./../sockets/sockets");
const express_1 = require("express");
const server_1 = __importDefault(require("../clases/server"));
const router = express_1.Router();
router.get('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = { cuerpo, de };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        mensaje: "Todo esta bien"
    });
});
router.post('/mensajes/:id', (req, res) => {
    const id = req.params.id;
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        de, cuerpo
    };
    const server = server_1.default.instance;
    server.io.in(id).emit('mensaje-privado', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
//rest para verificar los id de los usuarios
router.get('/usuarios', (req, res) => {
    const server = server_1.default.instance;
    server.io.clients((err, clientes) => {
        if (err) {
            return res.json({ ok: false, err });
        }
        res.json({ ok: true, clientes });
    });
});
//Obtener los nombres de usuario
router.get('/usuarios/detalle', (req, res) => {
    res.json({
        ok: true,
        clientes: sockets_1.usuariosConectados.getLista()
    });
});
exports.default = router;
