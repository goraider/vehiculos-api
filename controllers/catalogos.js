const { response } = require('express');

const Color = require('../models/Color');
const Marca = require('../models/Marca');

const listaCatalogos = async (request, res = response) => {

    const marcas = await  Marca.find();
    const colores = await Color.find();

    let catalogs_list = [
        {nombre:'marcas', modelo: marcas},
        {nombre:'colores', modelo: colores}
    ];
    
    let get_catalogs = catalogs_list.filter( (model) => {
        return request.body.params.some( (search) => {
            return model.nombre === search.nombre
        });
    });

    const set_catalogs = Object.fromEntries(
        get_catalogs.map(items => [items.nombre, items.modelo])
    );


    let data = JSON.parse(JSON.stringify(set_catalogs));


    return res.status(200).json({
        succesfull: true,
        msg: 'Lista de Catalogos',
        data
    });

}

module.exports = {
    listaCatalogos,
}