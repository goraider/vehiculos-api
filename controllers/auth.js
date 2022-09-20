const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');
//const { validationResult } = require('express-validator');



const createUser = async(request, res = response) =>{


    const { email, password } = request.body;
    
    try {

        let usuario = await Usuario.findOne({ email });

        if( usuario ){
            return res.status(400).json({
                succesfull: false,
                msg: 'El Email ya esta asignado a un Usuario!',
            });
        }

            
        usuario = new Usuario( request.body );

        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //Genera el Token
        const token = await generarJWT( usuario.id, usuario.username );

        res.status(201).json({
            succesfull:true,
            uid: usuario.id,
            username: usuario.username,
            token
        });
        
    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            succesfull: false,
            msg: 'Por favor hable con el administrador'
        });
    }



}

const loginUser = async(request, res = response) =>{
    
    const { email, password } = request.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if( !usuario ){
            return res.status(400).json({
                succesfull: false,
                msg: 'El Usuario no existe con ese Email!!!',
            });
        }

        //confirmar contraseñas
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            return res.status(400).json({
                succesfull: false,
                msg: 'Password incorrecto'
            })

        }

        //Generar Token
        const token = await generarJWT( usuario.id, usuario.username );
        
        res.json({
            succesfull:true,
            uid: usuario.id,
            username: usuario.username,
            token
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: 'Por favor hable con el administrador'
        }); 
    }




}

const revalidateToken = async(request, res = response) =>{

    const { uid, username } = request;
    // const uid = request.uid;
    // const username = request.username;

    //Generar Token
    const token = await generarJWT( uid, username );

    res.json({
        succesfull:true,
        uid,
        username,
        token
    });

}

module.exports = {
    createUser,
    loginUser,
    revalidateToken

}