const axios = require('axios');

let procesarCola = false;
let peticion = false;

function funcion() {};

function procesar() {
    procesarCola = true;
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
                    procesarCola = false;
                }
                peticion = false;
                console.log(resp.data);
                return true;
            }).catch((err) => {
                console.log('Error => ', err);
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