const fs = require('fs');

let contenido = fs.readFileSync('texto.txt', 'utf8');
console.log(contenido);