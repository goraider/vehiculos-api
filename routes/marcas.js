const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { listadoDeMarcas, crearMarca, obtenerMarca, actualizarMarca, eliminarMarca } = require('../controllers/marcas');

const router = Router();

//valida el token en todas las rutas
router.use( validarJWT );

router.get( '/listado-marcas', listadoDeMarcas );

router.put( '/obtener-marca/:id', obtenerMarca );

router.post(
    '/crear-marca',
    [
        check('nombre', 'El nombre de la Marca es Obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearMarca
);

router.put( '/actualizar-marca/:id', actualizarMarca );

router.delete( '/eliminar-marca/:id', eliminarMarca );



module.exports = router;