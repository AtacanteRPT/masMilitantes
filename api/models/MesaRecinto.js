/**
 * MesaRecinto.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        nombre: {
            type: "string"
        },
        inscritos: {
            type: "string"
        },
        votosValidos: {
            type: "string"
        },
        votosBlancos: {
            type: "string"
        },
        votosNulos: {
            type: "string"
        },
        votosEmitidos: {
            type: "string"
        },
        MAS:{
            type:'string'
        },
        UN:{
            type:'string'
        },
        FREPAB:{
            type:'string'
        },
        MIP:{
            type:'string'
        },
        NRF:{
            type:'string'
        },
        MNR:{
            type:'string'
        },
        PODEMOS:{
            type:'string'
        },
        CONVERGENCIA:{
            type:'string'
        },
        PULSO:{
            type:'string'
        },
        MUSPA:{
            type:'string'
        },
        BSD:{
            type:'string'
        },
        GENTE:{
            type:'string'
        },
        AS:{
            type:'string'
        },
        PDC:{
            type:'string'
        },
        PVB_IEP:{
            type:'string'
        },
        MSM:{
            type:'string'
        },
        UD:{
            type:'string'
        },

        asistencias: {
            type: "string"
        },
        idMapaRecinto: {
            model: 'maparecinto',
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
        idEleccion: {
            model: 'eleccion',
        },

    },

};