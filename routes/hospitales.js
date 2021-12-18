/* ruta /api/hospitales */


const { Router } = require('express');
const { check } = require('express-validator');
const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales');

const { validarCampos } = require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();


//rutas
router.get('/', getHospitales );

router.post(
    '/new',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearHospital
);

router.put(
    '/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarHospital
);

router.delete('/:id',validarJWT,borrarHospital);


module.exports = router;