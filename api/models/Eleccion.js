module.exports = {

    attributes: {

        nombre: {
            type: 'string'
        },
        fecha: {
            type: 'ref',
            columnType: 'date',
            required: false
        },
        tipo: {
            type: 'string'
        }

    },

};