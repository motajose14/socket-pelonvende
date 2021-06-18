const express = require('express');
const router = express.Router();

router.get('/reiniciar', (req, res) => {
    return res.status(200).json({ ok: true });
});