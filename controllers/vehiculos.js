const { response } = require('express');
const Vehiculo = require('../models/Vehiculo');



const listaVehiculos = async(request, res = response) => {

    //const { test } = request.body;
    const vehiculos = await Vehiculo.find()
                                .populate({
                                    path:'user',
                                    select:'username email'
                               })
                                .populate('marca')
                                .populate('color');
    const total = await Vehiculo.countDocuments();                                

    return res.status(200).json({

        succesfull: true,
        msg: 'Listado de Vehículo',
        vehiculos,
        total

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
            msg: 'Vehículo Creado'
            
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            succesfull: false,
            msg: 'Hablar con el administrador',
        });
        
    }
}

const obtenerVehiculo = async(request, res = response) =>{

    const vehiculoId = request.params.id;
    
    try {

        let vehiculo = await Vehiculo.findById( vehiculoId )
        .populate({
            path:'user',
            select:'username email'
       })
        .populate('marca')
        .populate('color');

        if( !vehiculo ){
            return res.status(400).json({
                succesfull: false,
                msg: 'El Vehículo no Existe con este ID!',
            });
        }

        if( vehiculo ){
            res.status(200).json({
                succesfull:true,
                vehiculo: vehiculo,
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

const actualizarVehiculo = async(request, res = response) => {

    const vehiculoId = request.params.id;
    const uid      = request.uid;

    try {

        const vehiculo = await Vehiculo.findById( vehiculoId );

        if( !vehiculo ) {
            res.status(404).json({
                succesfull: false,
                msg: 'El Vehículo no existe con este ID'
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

    
    // res.status(200).json({

    //     succesfull: true,
    //     vehiculoId
        
    // });

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
                msg: 'El Vehículo no existe con este ID'
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
    obtenerVehiculo,
    crearVehiculo,
    actualizarVehiculo,
    eliminarVehiculo,

};