const jwt = require("jsonwebtoken");
const { request, response } = require("express");

const validarJWT = (req = request, res = response, next) => {
  const token = req.header("x-token");
  //   console.log(token);
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    console.log(payload);
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = {
  validarJWT,
};
