const { Router } = require('express');

const { validarJWT } = require('../middlewares/validar-jwt');
const { listaCatalogos } = require('../controllers/catalogos');

const router = Router();

//para validar el token en todas las rutas
router.use( validarJWT );


router.post( '/obtener-catalogos', listaCatalogos);



module.exports = router;