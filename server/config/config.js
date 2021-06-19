/**
 * Puerto
 */

process.env.PORT = process.env.PORT || 3000;

/**
 * Entorno
 */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * Url API
 */

let url_api;

if (process.env.NODE_ENV === 'dev') {
    url_api = 'https://sys.pelonvende.com/api/runQueue';
} else {
    url_api = 'https://sys.pelonvende.com/api/runQueue';
}

process.env.URL_API = url_api;