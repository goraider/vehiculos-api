const { Schema, model } =  require('mongoose');

const VehiculoSchema =  Schema({
    marca: {
        type: Schema.Types.ObjectId,
        ref: 'Marca',
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    color: {
        type: Schema.Types.ObjectId,
        ref: 'Color',
        required: true
    },
    fecha_ingreso: {
        type: Date,
        required: true
    },
    estado: {
        type: Boolean,
        required: true
    },
    asignado: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
});

VehiculoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;

});

module.exports = model( 'Vehiculo', VehiculoSchema );