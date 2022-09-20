const { response } = require('express');
const Vehiculo = require('../models/Vehiculo');



const listaVehiculos = async(request, res = response) => {

    //const { test } = request.body;
    const vehiculos = await Vehiculo.find()
                                .populate('user');

    return res.status(200).json({

        succesfull: true,
        msg: 'Listado de Vehiculos',
        vehiculos

    });

}

const crearVehiculo = async(request, res = response) => {

    console.log( request.body );
    //const { vehiculo } = request.body;
    const vehiculo = new Vehiculo( request.body );

    try {

        vehiculo.user = request.uid;

       const vehiculoGuardado = await vehiculo.save();

        res.status(200).json({

            succesfull: true,
            vehiculo: vehiculoGuardado,
            msg: 'Vehiculo Creado'
            
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: 'Hablar con el administrador',
        });
        
    }



}

const actualizarVehiculo = async(request, res = response) => {

    const vehiculoId = request.params.id;
    const uid      = request.uid;

    try {

        const vehiculo = await Vehiculo.findById( vehiculoId );

        if( !vehiculo ) {
            res.status(404).json({
                succesfull: false,
                msg: 'El Vehiculo no existe con este ID'
            });
        }

        if( vehiculo.user.toString() !== uid ){

            return res.status(401).json({
                succesfull: false,
                msg: 'No tiene privilegios de editar este Vehiculo'
            });
        }

        const nuevoVehiculo = {
            ...request.body,
            user:uid
        }

        const vehiculoActualizado = await Vehiculo.findByIdAndUpdate( vehiculoId, nuevoVehiculo, {new: true} );

        res.status(200).json({
            succesfull: true,
            vehiculo: vehiculoActualizado
        });
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: "Hable con el administrador"
        });
        
    }

    
    res.status(200).json({

        succesfull: true,
        vehiculoId
        
    });

}

const eliminarVehiculo = async(request, res = response) =>{

    const vehiculoId = request.params.id;
    const uid        = request.uid;

    console.log(uid);
    try {

        const vehiculo = await Vehiculo.findById( vehiculoId );

        if( !vehiculo ) {

            return res.status(404).json({
                succesfull: false,
                msg: 'El Vehiculo no existe con este ID'
            });
        }

        if( vehiculo.user.toString() !== uid ){

            return res.status(401).json({
                succesfull: false,
                msg: 'No tiene privilegios de Eliminar este Vehiculo'
            });
        }


        await Vehiculo.findByIdAndDelete( vehiculoId );

        res.status(200).json({
            succesfull: true,
            msg: 'Vehiculo Eliminado'
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

    listaVehiculos,
    crearVehiculo,
    actualizarVehiculo,
    eliminarVehiculo,

};