const express = require('express');
const funcion = require('../cola/cola');
const router = express();

router.get('/reiniciar', (req, res, next) => {
    funcion.procesar();
    return res.status(200).json({ ok: true });
});

module.exports = router;