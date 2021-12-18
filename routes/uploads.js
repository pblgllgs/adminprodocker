const { Router } = require('express');

const expressFileUpload = require('express-fileupload');

const  {fileUploads,retornaImagen}  = require('../controllers/uploads');

const { validarJWT } = require('../middleware/validar-jwt');

const router = Router();

router.use(expressFileUpload());

//rutas
router.put('/:tipo/:id',validarJWT,fileUploads);
router.get('/:tipo/:foto',retornaImagen);


module.exports = router;