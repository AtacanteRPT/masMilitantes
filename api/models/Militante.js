/**
 * Militante.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {

        paterno: { type: 'string' },
        materno: { type: 'string' },
        nombre: { type: 'string', required: true, },
        voto: { type: 'boolean' },

        cedula: { type: 'string' },
        celular: { type: 'string' },
        telefono: { type: 'string' },
        idVoto: {
            model: "voto"
        },
        idDelegado: {
            model: "delegado"
        },
        idRecinto: {
            model: 'recinto',
        },
        idMesa: {
            model: 'mesa',
        },
        idRecintoDelegado: {
            model: 'recinto',
        },





        institucion: {
            type: 'string'
        },
        recinto: {
            type: 'string'
        },
        recintoDelegado: {
            type: 'string'
        },
        mesa: {
            type: 'string'
        },
        mesaDelegado: {
            type: 'string'
        },
        distrito: {
            type: 'string'
        },
        zona: {
            type: 'string'
        },
        circunscripcion: {
            type: 'string'
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