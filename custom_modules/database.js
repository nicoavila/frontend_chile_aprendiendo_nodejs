const JsonDB = require('node-json-db');
const faker = require('faker');
const uuidv4 = require('uuid/v4');

const db = new JsonDB("usuarios", true, true);

module.exports = {
  //Obtiene todos los usuarios
  getUsuarios: () => {
    return db.getData('/usuarios');
  },

  //Obtiene un usuario en particular
  getUsuario: (id) => {
    return db.getData('/usuarios/' + id);
  },

  //Crea un nuevo usuario
  createUsuario: (data) => {
    let id = uuidv4();
    db.push('/usuarios/' + id, data);
    return id;
  },

  //Edita un usuario
  editUsuario: (id, data) => {
    db.push('/usuarios/' + id, data, false);
    return data;
  },

  //Elimina un usuario
  deleteUsuario: (id) => {
    return db.delete('/usuarios/' + id);
  },

  //Obtiene una lista de N usuarios generados con Faker
  getRandomUsuarios: (cantidad = 100) => {
    let usuarios = [];
    for (let i = 0; i < 100; i++) {
      usuarios.push({
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        edad: Math.floor(Math.random() * ((100 - 1) + 1)) + 1,
        direccion: faker.address.streetAddress(),
        activo: true
      });
    }
    return usuarios;
  }
}
