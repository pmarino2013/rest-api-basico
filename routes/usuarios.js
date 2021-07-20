const { Router } = require("express");
const { check } = require("express-validator"); //importo para hacer validaciones

//llamo middlewares que valida campos
const { validarCampos } = require("../middlewares/validar-campos");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe ser de más de 6 caracteres").isLength({
      min: 6,
    }),
    check("email", "El correo no es válido").isEmail(), //midlleware: guarda el error en caso de que no cumpla con ser un email
    check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarCampos, //valido los campos
  ],

  usuariosPost
);

router.delete("/", usuariosDelete);

module.exports = router;
