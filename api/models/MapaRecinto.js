/**
 * Mapa.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        latitud: {
            type: 'string'
        },
        longitud: {
            type: 'string'
        },
        idRecinto: {
            model: 'recinto',
        },
        idZona: {
            model: 'zona',
        },
        idDistrito: {
            model: 'distrito',
        },
        idCircunscripcion: {
            model: 'circunscripcion',
        },
        recinto: {
            type: 'string'
        },
        zona: {
            type: 'string'
        },
        distrito: {
            type: 'string'
        },
        circunscripcion: {
            type: 'string'
        },

    },

};