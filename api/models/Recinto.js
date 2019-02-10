/**
 * Recinto.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        nombre: {
            type: 'string',
            required: false,
            allowNull: true
        },
        latitud: {
            type: 'string',
            required: false,
            allowNull: true
        },
        longitud: {
            type: 'string',
            required: false,
            allowNull: true
        },
        mesa: {
            type: 'string',
            required: false,
            allowNull: true
        },
        mesaDelegado: {
            type: 'string',
            required: false,
            allowNull: true
        },
        idZona: {
            model: 'Zona'
        },
        mesas: {
            collection: 'mesarecinto',
            via: 'idRecinto'
        }
        //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
        //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
        //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


        //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
        //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
        //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


        //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
        //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
        //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    },

};