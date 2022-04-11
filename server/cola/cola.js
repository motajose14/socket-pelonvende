const axios = require('axios');

let procesarCola = false;
let peticion = false;
let time = null;

function funcion() {};

function procesar() {
    procesarCola = true;
    clearTimeout(time);
    setTimeout(() => {
        if (!peticion) {
            peticion = true;
            let instance = axios.create({
                baseURL: process.env.URL_API
            });

            return instance.post().then((resp) => {
                if (resp.data.conteo > 0) {
                    procesar();
                } else {
                    time = setTimeout(() => {
                        procesar();
                    }, 120000);
                    procesarCola = false;
                }
                peticion = false;
                return true;
            }).catch((err) => {
                procesarCola = false;
                peticion = false;
                procesar();
                return false;

            });
        }
    }, 1500);
}

funcion.prototype.procesar = function() {
    procesar();
};

module.exports = new funcion();