const express = require('express');
const router = express.Router();
const request = require('request');

/* Página de inicio */
router.get('/', (req, res, next) => {
  return res.status(200).json({ message: 'CASTOR API v1.0' });
});

/* Obtiene toda la lista de recorridos desde el Transantiago */
router.get('/transantiago', (req, res, next) => {
  let opciones = {
    method: 'GET',
    url: 'http://www.transantiago.cl/restservice/rest/getservicios/all',
    json: true
  };
  request(opciones, (err, resp, body) => {
    if (err) {
      reject(err);
    }
    return res.status(200).json(body);
  });
});

module.exports = router;
