/**
 * Militante.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

      latitud: { type: 'string' },
      longitud: { type: 'string' },
      idCircunscripcion:{model:'circunscripcion'},
      idDistrito: { model:'distrito' },
      idZona: { model:'zona' },
      idRecinto: { model:'recinto' },

      circunscripcion: {
          type: 'string'
      },
      recinto: {
          type: 'string'
      },
      mesa: {
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
      },
      direccion: {
          type: 'string'
      }

  },

};