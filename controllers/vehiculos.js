const { response } = require('express');
const { ObjectId } = require('mongoose').Types;
const mongoose = require('mongoose');
const Vehiculo = require('../models/Vehiculo');

    //buscar por una letra en especcifico(se pueden omitir o espeficificar valores de regreso)
    //const records = await Vehiculo.find({modelo:{$regex:/^2/}},{modelo:1,_id:0})

const buscarMarcas = async( marca_id , res ) => {

    console.log(marca_id);
    const id = mongoose.Types.ObjectId(marca_id);
    const data = await Vehiculo.find({ marca: id })
                        .populate({
                            path:'user',
                            select:'username email'
                        })
                        .populate('marca')
                        .populate('color');

    const total = await Vehiculo.countDocuments();  
    
    return res.status(200).json({
        succesfull: true,
        msg: '¡Filtro Aplicado!',
        data: data,
        total
    });

}

const buscarColores = async( color_id , res ) => {

    console.log(color_id);
    const id = mongoose.Types.ObjectId(color_id);
    const data = await Vehiculo.find({ color: id })
                        .populate({
                            path:'user',
                            select:'username email'
                        })
                        .populate('marca')
                        .populate('color');

    const total = await Vehiculo.countDocuments();  
    
    return res.status(200).json({
        succesfull: true,
        msg: '¡Se encontraron '+data.length+' Coincidencias de Colores de Vehículos!',
        data: data,
        total
    });

}

const buscarEstados = async( estado , res ) => {

    console.log(estado);
    const data = await Vehiculo.find({ estado: estado })
                        .populate({
                            path:'user',
                            select:'username email'
                        })
                        .populate('marca')
                        .populate('color');

    const total = await Vehiculo.countDocuments();  
    
    return res.status(200).json({
        succesfull: true,
        msg: '¡Se encontraron '+data.length+' Coincidencias de Colores de Vehículos!',
        data: data,
        total
    });

}

const buscarAsignado = async( asignado , res ) => {

    console.log(asignado);
    const data = await Vehiculo.find({ asignado: asignado })
                        .populate({
                            path:'user',
                            select:'username email'
                        })
                        .populate('marca')
                        .populate('color');

    const total = await Vehiculo.countDocuments();  
    
    return res.status(200).json({
        succesfull: true,
        msg: '¡Se encontraron '+data.length+' Coincidencias de Colores de Vehículos!',
        data: data,
        total
    });

}

const buscarModelo = async( modelo , res ) => {

    const regex = new RegExp( modelo, 'i' );
    const data = await Vehiculo.find({ modelo: regex })
                        .populate({
                            path:'user',
                            select:'username email'
                        })
                        .populate('marca')
                        .populate('color');

    const total = await Vehiculo.countDocuments();  
    
    return res.status(200).json({
        succesfull: true,
        msg: '¡Se encontraron '+data.length+' Coincidencias de Colores de Vehículos!',
        data: data,
        total
    });

}

const buscarFechaIngreso = async( fecha_inicio, fecha_fin , res ) => {

    const inicio = new Date(fecha_inicio);
    const fin = new Date(fecha_fin);

    const data = await Vehiculo.find({
        fecha_ingreso: {
            $gte: inicio, 
            $lt: fin
        }
        }).populate({
            path:'user',
            select:'username email'
        })
        .populate('marca')
        .populate('color');

    const total = await Vehiculo.countDocuments();  
    
    return res.status(200).json({
        succesfull: true,
        msg: '¡Se encontraron '+data.length+' Coincidencias de Colores de Vehículos!',
        data: data,
        total
    });

}


const listaVehiculos = async(req = request, res = response) => {

    
    const { marca, color, estado, asignado, modelo, fecha_inicio, fecha_fin } = req.query;
    const esMarcaID = ObjectId.isValid(marca);
    const esColorID = ObjectId.isValid(color);


    //const { modelo } = req.query;

    // const { marca } = req.query;
    // const { color } = req.query;

    // const esMarcaID = ObjectId.isValid(marca);
    // const esColorID = ObjectId.isValid(color);

    //const { test } = request.body;

    if( esMarcaID ){
        buscarMarcas(marca, res);
    }else if( esColorID ){
        buscarColores(color, res);
    }else if( estado ){
        buscarEstados(estado, res);
    }else if( asignado ){
        buscarAsignado(asignado, res)
    }else if( modelo ){
        buscarModelo( modelo, res )
    }else if(fecha_inicio, fecha_fin ){
        buscarFechaIngreso(fecha_inicio, fecha_fin, res)
    }
    else{
        const data = await Vehiculo.find()
        .populate({
            path:'user',
            select:'username email'
       })
        .populate('marca')
        .populate('color');
        const total = await Vehiculo.countDocuments();                                

        return res.status(200).json({
            succesfull: true,
            msg: '¡Vehículos en Línea!',
            data,
            total
        });

    }



        // switch (req.query) {

        //     case (marca):
        //         console.log("en marca", marca);
        //         const esMarcaID = ObjectId.isValid(marca);
        //         buscarMarcas(esMarcaID, res);
        //     break;
        //     case (color):
        //         const esColorID = ObjectId.isValid(color);
        //         buscarColores(esColorID, res);
        //     break;
    
        //     default:
        //         const data = await Vehiculo.find()
        //         .populate({
        //             path:'user',
        //             select:'username email'
        //        })
        //         .populate('marca')
        //         .populate('color');
        //         const total = await Vehiculo.countDocuments();                                
        
        //         return res.status(200).json({
        //             succesfull: true,
        //             msg: '¡Vehículos en Línea!',
        //             data,
        //             total
        //         });
        // }



    // if( esMarcaID ){

    //     console.log(esMarcaID);
    //     const id = mongoose.Types.ObjectId(marca);
    //     const data = await Vehiculo.find({ marca: id })
    //                         .populate({
    //                             path:'user',
    //                             select:'username email'
    //                         })
    //                         .populate('marca')
    //                         .populate('color');

    //     const total = await Vehiculo.countDocuments();  
        
    //     return res.status(200).json({
    //         succesfull: true,
    //         msg: '¡Filtro Aplicado!',
    //         data: data,
    //         total
    //         //valida si viene null y si sipues dar un array vacio
    //         //vehiculos: ( data ) ? [ data ] : []
    //     });

    // }else{
    //     const data = await Vehiculo.find()
    //     .populate({
    //         path:'user',
    //         select:'username email'
    //    })
    //     .populate('marca')
    //     .populate('color');
    //     const total = await Vehiculo.countDocuments();                                

    //     return res.status(200).json({
    //         succesfull: true,
    //         msg: '¡Vehículos en Línea!',
    //         data,
    //         total
    //     });
    // }

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