/**
 * Mesa.js
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
        nulos: {
            type: 'number',
            required: false,
            allowNull: true
        },
        blancos: {
            type: 'number',
            required: false,
            allowNull: true
        },
        asistencias: {
            type: 'number',
            required: false,
            allowNull: true
        },
        idRecinto: {
            model: 'recinto'
        },
        idMilitante: {
            model: 'militante'
        },
        modificado: {
            type: 'boolean'
        }
    },

};