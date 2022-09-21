const { Schema, model } =  require('mongoose');

const ColorSchema =  Schema({

    nombre: {
        type: String,
        required: true
    }
});

ColorSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;

});

module.exports = model( 'Color', ColorSchema );