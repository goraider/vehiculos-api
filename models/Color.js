const { Schema, model } =  require('mongoose');

const ColorSchema =  Schema({

    nombre: {
        type: String,
        required: true
    }
});

module.exports = model( 'Color', ColorSchema );