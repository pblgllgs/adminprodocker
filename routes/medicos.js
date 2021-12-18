/* ruta /api/medicos */

const { Router } = require('express');
const { check } = require('express-validator');
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
} = require('../controllers/medicos');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

//rutas
router.get('/',validarJWT ,getMedicos );

router.post(
    '/new',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('hospital','El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put(
    '/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('hospital','El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
);

router.delete('/:id',validarJWT,borrarMedico);

router.get('/:id',validarJWT,getMedicoById);

module.exports = router;