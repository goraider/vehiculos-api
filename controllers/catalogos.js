const { response } = require('express');
const bcrypt = require('bcryptjs');
const Color = require('../models/Marca');
const Marca = require('../models/Color');

const listaCatalogos = async (request, res = response) => {


    let catalogs = {};
    let catalogs_list = [
        {nombre:'marcas', 'model' : await Marca.find()},
        {nombre:'colores', 'model' : await Color.find()}
    ];
    let get_catalogs = catalogs_list.filter( (model) => {
        return request.body.params.some( (search) => {
            if( model.nombre === search.nombre ){

                return `${ model.nombre } : ${ model.model }`;
            }
            //return model.nombre === search.nombre `${ base } x ${ i } =  ${ base * i }\n`;;
        });

    });

    let test = JSON.parse(JSON.stringify(get_catalogs));


    console.log(catalogs);


    return res.status(200).json({
        succesfull: true,
        msg: 'Lista de Catalogos',
        data: test
    });

}

module.exports = {
    listaCatalogos,
}