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
        nulosBocaUrna: {
            type: 'number',
            required: false,
            allowNull: true
        },
        blancosBocaUrna: {
            type: 'number',
            required: false,
            allowNull: true
        },
        asistenciasBocaUrna: {
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
        modificable: {
            type: 'boolean'
        }
    },

};