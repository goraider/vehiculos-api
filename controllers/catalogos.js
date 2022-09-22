const { response } = require('express');
const bcrypt = require('bcryptjs');
const Color = require('../models/Marca');
const Marca = require('../models/Color');

const listaCatalogos = (request, res = response) => {

    let catalogos = [];

    console.log(request.body.params);


    request.body.params.forEach(element => {

    const catalogo = element.nombre.find();
     console.log(catalogo);
   });




    // const usuarios = await Usuario.find()
    //                     .skip(pageSize * (currentPage - 1))
    //                     .limit(pageSize);

    // const total = await Usuario.countDocuments();

    return res.status(200).json({
        succesfull: true,
        msg: 'Lista de Catalogos',
    });

}

module.exports = {
    listaCatalogos,
}