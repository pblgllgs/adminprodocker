/* ruta /api/usuarios */

const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  cambiaEstadoUsuario,
} = require("../controllers/usuarios");
const { validarCampos } = require("../middleware/validar-campos");
const { validarJWT, validarROLE,validarROLEPropio } = require("../middleware/validar-jwt");

const router = Router();

//rutas
router.get(
    "/", 
    [
        validarJWT, validarROLE
    ],
    getUsuarios);

router.post(
  "/new",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    validarCampos,
  ],
  crearUsuario
);

router.put(
  "/:id",
  [
    validarJWT,
    validarROLEPropio,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El role es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete(
    "/:id", 
    [
        validarJWT, validarROLE
    ], 
    borrarUsuario);

router.post(
    "/:id",
    [
        validarJWT, validarROLE
    ], 
    cambiaEstadoUsuario);

module.exports = router;
