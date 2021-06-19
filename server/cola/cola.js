const axios = require('axios');

let procesarCola = false;
let peticion = false;
let count = 0;

function funcion() {};

funcion.prototype.procesar = function(desde) {
    console.log('Corriendo desde =>', desde);
    console.log('valor de count =>', count);
    count += 1;
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
};

module.exports = new funcion();