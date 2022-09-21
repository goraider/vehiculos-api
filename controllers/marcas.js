const { response } = require('express');
const Marca  = require('../models/Marca');



const listadoDeMarcas = async(request, res = response) => {

    const pageSize = 10;
    const currentPage = 1;
    const per_page = 20;

    const marcas = await Marca.find()
                        .skip(pageSize * (currentPage - 1))
                        .limit(pageSize);

    const total = await Marca.countDocuments();

    return res.status(200).json({
        succesfull: true,
        msg: 'Listado de las Marcas',
        marcas,
        total,
        per_page
    });

}

const crearMarca = async(request, res = response) => {

    console.log( request.body );
    const marca = new Marca( request.body );

    try {

       marca.user = request.uid;
       const marcaGuardada = await marca.save();

        res.status(200).json({
            succesfull: true,
            vehiculo: marcaGuardada,
            msg: 'Se ha Creado la Marca'
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: 'Hablar con el administrador',
        });
    }



}

const actualizarMarca = async(request, res = response) => {

    const marcaId = request.params.id;

    try {

        const marca = await Marca.findById( marcaId );

        if( !marca ) {
            res.status(404).json({
                succesfull: false,
                msg: 'La Marca no existe con este ID'
            });
        }else{
            
            const nuevaMarca = {
                ...request.body
            }
    
            const marcaActualizada = await Marca.findByIdAndUpdate( marcaId, nuevaMarca, {new: true} );
    
            res.status(200).json({
                succesfull: true,
                marca: marcaActualizada,
                msg: 'La Marca se editó con Éxito'
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

const eliminarMarca = async(request, res = response) =>{

    const marcaId = request.params.id;

    try {

        const marca = await Marca.findById( marcaId );

        if( !marca ) {

            return res.status(404).json({
                succesfull: false,
                msg: 'La Marca no existe con este ID'
            });
        }

        await Marca.findByIdAndDelete( marcaId );

        res.status(200).json({
            succesfull: true,
            msg: 'Marca Eliminada'
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
    listadoDeMarcas,
    crearMarca,
    actualizarMarca,
    eliminarMarca
};