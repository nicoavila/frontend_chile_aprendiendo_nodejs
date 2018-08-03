const express = require('express');
const database = require('../custom_modules/database');
const router = express.Router();

/* Obtiene toda la colección de usuarios */
router.get('/', (req, res, next) => {
  let resultado = {};
  resultado = database.getUsuarios();

  let usuarios = [];
  //Recorre el objeto para convertirlo a un array
  for (let id in resultado) {
    let row = {};
    row[id] = resultado[id];
    
    usuarios.push(row);
  }
  return res.status(200).json({
    code: 200,
    data: usuarios
  })
});

/* Obtiene un usuario dentro de la colección de usuarios */
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  try {
    return res.status(200).json({
      code: 200,
      data: database.getUsuario(id)
    });
  } catch(error) {
    let respuesta = {
      code: null,
      message: null
    };
    switch (error.id) {
      case 5:
        respuesta.code = 404;
        respuesta.message = 'Usuario no encontrado'
      break;

      default:
        respuesta.code = 500;
        respuesta.message = 'Error al obtener el registro'
      break;
    }
    return res.status(respuesta.code).json(respuesta);
  }
});

/* Crea un nuevo usuario en la base de datos */
router.post('/', (req, res, next) => {
  let nombre = req.body.nombre;
  let apellido = req.body.apellido;
  let edad = req.body.edad;
  let direccion = req.body.direccion;

  if (nombre != undefined || apellido != undefined || edad != undefined || direccion != undefined) {
    let nuevoUsuario = {
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      direccion: direccion
    }
    try {
      let lastInsertId = database.createUsuario(nuevoUsuario);
      return res.status(201).json({
        code: 201,
        message: 'Registro guardado exitosamente',
        data: nuevoUsuario,
        id: lastInsertId
      });
    } catch(error) {
      console.log(error);
      return res.status(500).json({
        code: 500,
        message: 'Error al guardar el registro'
      });
    }
  } else {
    res.status(400).json({
      code: 400,
      message: 'Petición mal formada. Faltan algunos datos obligatorios'
    })
  }
});

/* Edita un usuario en la base de datos */
router.put('/:id', (req, res, next) => {
  //Obtiene el registro del usuario
  let id = req.params.id;
  try {
    let registro = database.getUsuario(id);
    //Crea el objeto con los datos desde el Body
    let updateData = {}
    for(let attr in req.body) {
      updateData[attr] = req.body[attr];
    }
    //Actualiza
    try {
      database.editUsuario(id, updateData);
      return res.status(200).json({
        code: 200,
        message: 'Registro editado exitosamente'
      });
    } catch(error) {
      return res.status(500).json({
        code: 500,
        message: 'Error al actualizar el registro'
      });
    }
  } catch(error) {
    let respuesta = {
      code: null,
      message: null
    };
    switch (error.id) {
      case 5:
        respuesta.code = 404;
        respuesta.message = 'Usuario no encontrado'
      break;

      default:
        respuesta.code = 500;
        respuesta.message = 'Error al obtener el registro'
      break;
    }
    return res.status(respuesta.code).json(respuesta);
  }
});

/* Elimina un usuario desde la base de datos */
router.delete('/:id', (req, res, next) => {
  //Obtiene el registro del usuario
  let id = req.params.id;
  try {
    let registro = database.getUsuario(id);
    //Elimina
    try {
      database.deleteUsuario(id);
      return res.status(200).json({
        code: 200,
        message: 'Registro eliminado exitosamente'
      });
    } catch(error) {
      return res.status(500).json({
        code: 500,
        message: 'Error al borrar el registro'
      });
    }
  } catch(error) {
    let respuesta = {
      code: null,
      message: null
    };
    switch (error.id) {
      case 5:
        respuesta.code = 404;
        respuesta.message = 'Usuario no encontrado'
      break;

      default:
        respuesta.code = 500;
        respuesta.message = 'Error al obtener el registro'
      break;
    }
    return res.status(respuesta.code).json(respuesta);
  }
});

module.exports = router;
