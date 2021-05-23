const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const rp = require('request-promise');

const usuarios = new Usuarios();
let procesarCola = false;
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
        const options = {
            uri: process.env.URL_API,
            method: "POST",
            json: true
        };
        rp(options).then((jsonresponse) => {
            console.log(jsonresponse);
            if (jsonresponse.conteo > 0) {
                procesar();
            } else {
                procesarCola = false;
            }
            return;
        }).catch((err) => {
            console.log('Ocurrio un error:', err);
            procesarCola = false;

        });
    }, 1500);
}