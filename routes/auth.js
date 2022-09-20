/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createUser, revalidateToken, loginUser } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt'); 
const router = Router();
//const router =  express.Router;


router.post(
    '/crear-usuario',
    [
        check('username', 'El nombre de usuario es Obligatorio').not().isEmpty(),
        check('email', 'El email es Obligatorio').isEmail(),
        check('password', 'El password debe de 6 a 8 caracteres').isLength( { min:6 } ),
        validarCampos

    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'El email es Obligatorio').isEmail(),
        check('password', 'El password debe de 6 a 8 caracteres').isLength( { min:6 } ),
        validarCampos

    ],
    loginUser
);

router.get( '/update-token', validarJWT, revalidateToken );

// router.get(
//     '/renew',
//     [
//         check('name', 'El nombre es Obligatorio').not().isEmpty(),
//         check('email', 'El email es Obligatorio').isEmail(),
//         check('password', 'El password debe de 6 a 8 caracteres').isLength( { min:6 } )

//     ],
//     revalidateToken
// );



module.exports = router;