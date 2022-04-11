const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const axios = require('axios');
const funcion = require('../cola/cola');

const usuarios = new Usuarios();
funcion.procesar();
io.on('connection', (client) => {
    client.emit('new:connection', {});
    client.on('new:connection', (data, callback) => {
        usuarios.agregarUsuario(client.id, data.user);
        client.join(data.user);
        callback(data);
    });

    client.on('disconnect', () => {
        usuarios.borrarUsuario(client.id);
    });

    client.on('new:resetTime', (data, callback) => {
        client.broadcast.to(data).emit('new:resetTime');
        callback();
    });

    client.on('new:logout', (data, callback) => {
        client.broadcast.to(data).emit('new:logout');
        callback({ ok: true });
    });

    client.on('new:procesar_cola', (data, callback) => {
        funcion.procesar();
        callback();
    });
});
