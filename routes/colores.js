const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { listadoDeColores, crearColor, actualizarColor, eliminarColor } = require('../controllers/colores');

const router = Router();

//valida el token en todas las rutas
router.use( validarJWT );

router.get( '/listado-colores', listadoDeColores );

router.post(
    '/crear-color',
    [
        check('nombre', 'El nombre del Color es Obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearColor
);

router.put( '/actualizar-color/:id', actualizarColor );

router.delete( '/eliminar-color/:id', eliminarColor );

module.exports = router;