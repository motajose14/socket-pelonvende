require('./config/config');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const app = express();
/* const cors = require('cors');

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions)); */


let server = http.createServer(app);

const port = process.env.PORT;

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});