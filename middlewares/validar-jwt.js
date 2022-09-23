const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res =  response, next ) => {

    // x-token headers
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            succesfull:true,
            msg: 'No hay token en la petición'
        });
    }

        try {
            //const payload = jwt.verify
            const { uid, name } = jwt.verify(
                token,
                process.env.SECRET_JWT_SEED
            );

            req.uid = uid;
            req.name = name;

            
            
        } catch (error) {

            return res.status(401).json({
                succesfull:false,
                msg: 'Token no valido'
            });
            
        }

    console.log(token);

    next();

}

module.exports = {
    validarJWT
}