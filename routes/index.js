var express = require('express');
var router = express.Router();

/* Página de inicio */
router.get('/', (req, res, next) => {
  return res.status(200).json({ message: 'CASTOR API v1.0' });
});

module.exports = router;
