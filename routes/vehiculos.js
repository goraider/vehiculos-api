const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } =  require('../helpers/isDate');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { listaVehiculos, obtenerVehiculo, crearVehiculo, actualizarVehiculo, eliminarVehiculo } = require('../controllers/vehiculos');

const router = Router();

//para validar el token en todas las rutas
router.use( validarJWT );

router.get( '/listado-vehiculos', listaVehiculos );

router.put( '/obtener-vehiculo/:id', obtenerVehiculo );

router.post(
    '/crear-vehiculo',
    [
        check('marca', 'Debe de asignar la Marca al Vehículo').not().isEmpty(),
        check('modelo', 'El Modelo es Obligatorio').not().isEmpty(),
        check('modelo', 'El Color es Obligatorio').not().isEmpty(),
        check('fecha_ingreso', 'La Fecha de Ingreso es Obligatoria').custom( isDate ),
        check('estado', 'El Estado no es correcto').toBoolean(),
        check('asignado', 'El Estado no es correcto').toBoolean(),
        validarCampos
    ],
    crearVehiculo
);

router.put( '/actualizar-vehiculo/:id', actualizarVehiculo );

router.delete( '/eliminar-vehiculo/:id', eliminarVehiculo );



module.exports = router;