const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario"); //Traer modelo de usuario

const usuariosGet = (req = request, res = response) => {
  //usando query
  const { q, apikey, limit, page = 1 } = req.query;

  res.json({
    message: "Get API - controlador",
    q,
    apikey,
    limit,
    page,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, email, password, rol } = req.body; //desestructuro solo lo que necesito guardar obligatoriamente

  const usuario = new Usuario({ nombre, email, password, rol });
  //Encriptar contraseña
  const salt = bcrypt.genSaltSync(); //numero de veces que se aplicará encriptación
  usuario.password = bcrypt.hashSync(password, salt); //encriptación de contraseña

  //Guardar en DB
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    message: "Put API - controlador",
    id,
  });
};

const usuariosDelete = (req, res = response) => {
  res.json({
    message: "Delete API - controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
