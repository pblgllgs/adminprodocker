/* ruta /api/login */

const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT } = require("../middleware/validar-jwt");
const { login, googleSign, renewToken } = require("../controllers/auth");

const { validarCampos } = require("../middleware/validar-campos");

const router = Router();

//rutas
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
  ],
  login
);

router.post(
  "/google",
  [
    check("token", "El token de google es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  googleSign
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
