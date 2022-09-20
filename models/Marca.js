const { Schema, model } =  require('mongoose');

const MarcaSchema =  Schema({

    nombre: {
        type: String,
        required: true
    }
});

MarcaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;

});

module.exports = model( 'Marca', MarcaSchema );