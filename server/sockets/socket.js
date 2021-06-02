const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const rp = require('request-promise');
const axios = require('axios');

const usuarios = new Usuarios();
let procesarCola = false;
let peticion = false;
procesar();
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
        if (!procesarCola) {
            procesar();
            callback();
        }
    });
});

function procesar() {
    procesarCola = true;
    setTimeout(() => {
        if (!peticion) {
            peticion = true;
            let instance = axios.create({
                baseURL: process.env.URL_API
            });

            return instance.post().then((resp) => {
                peticion = false;
                if (resp.data.conteo > 0) {
                    procesar();
                } else {
                    procesarCola = false;
                }
                console.log(resp.data);
                return true;
            }).catch((err) => {
                console.log('Error => ', err);
                procesarCola = false;
                peticion = false;
                return false;

            });
        }
    }, 1000);
}