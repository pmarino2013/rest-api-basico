const { response, request } = require("express");

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

const usuariosPost = (req, res = response) => {
  const body = req.body;

  res.json({
    message: "Post API - controlador",
    body,
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
