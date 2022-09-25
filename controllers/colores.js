const { response } = require('express');
const Color  = require('../models/Color');

const listadoDeColores = async(req = reques, res = response) => {

    const { query } = req.query;

    if( query ){
        const regex = new RegExp( query, 'i' );
        const colores = await Color.find({ nombre: regex });
        const total = await Color.countDocuments();

        return res.status(200).json({
            succesfull: true,
            msg: 'Listado de las Colores',
            colores,
            total
        });

        
    }else{

        const pageSize = 10;
        const currentPage = 1;

        const colores = await Color.find()
                            .skip(pageSize * (currentPage - 1))
                            .limit(pageSize);

        const total = await Color.countDocuments();

        return res.status(200).json({
            succesfull: true,
            msg: 'Listado de Colores',
            colores,
            total,
        });
    }

}

const crearColor = async(request, res = response) => {

    console.log( request.body );
    const color = new Color( request.body );

    try {

       color.user = request.uid;
       const colorGuardado = await color.save();

        res.status(200).json({
            succesfull: true,
            vehiculo: colorGuardado,
            msg: 'Se ha Creado el Color'
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: 'Hablar con el administrador',
        });
    }



}

const obtenerColor = async(request, res = response) =>{

    const colorId = request.params.id;
    
    try {

        let color = await Color.findById( colorId );

        if( !color ){
            return res.status(400).json({
                succesfull: false,
                msg: 'El Color no Existe con este ID!',
            });
        }

        if( color ){
            res.status(200).json({
                succesfull:true,
                color: color,
            });
        }

    } catch (error) {
        
        console.log(error);

        res.status(500).json({
            succesfull: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const actualizarColor = async(request, res = response) => {

    const colorId = request.params.id;

    try {

        const color = await Color.findById( colorId );

        if( !color ) {
            res.status(404).json({
                succesfull: false,
                msg: 'El Color no existe con este ID'
            });
        }else{
            
            const nuevoColor = {
                ...request.body
            }
    
            const colorctualizado = await Color.findByIdAndUpdate( colorId, nuevoColor, {new: true} );
    
            res.status(200).json({
                succesfull: true,
                marca: colorctualizado,
                msg: 'El color se editó con Éxito'
            });
        }

        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: "Hable con el administrador"
        });
        
    }

}

const eliminarColor = async(request, res = response) =>{

    const colorId = request.params.id;

    try {

        const color = await Color.findById( colorId );

        if( !color ) {

            return res.status(404).json({
                succesfull: false,
                msg: 'El Color no existe con este ID'
            });
        }

        await Color.findByIdAndDelete( colorId );

        res.status(200).json({
            succesfull: true,
            msg: 'Color Eliminado'
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: "Hable con el administrador"
        });
        
    }
}

module.exports = {
    listadoDeColores,
    crearColor,
    obtenerColor,
    actualizarColor,
    eliminarColor
};