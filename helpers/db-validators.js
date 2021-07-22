//Validar los roles segun lo que tenga en la colección roles
const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está definido en la BD`);
  }
};

const emailExiste = async (email = "") => {
  //Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El email ${email} ya se encuentra registrado`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
};
