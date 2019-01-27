/**
 * RecintoDelegadoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var recintosDobles = [

    {
        id: 29,
        nombre: 'Colegio Holanda (Chamoco Chico)',
        codigo: 1
    },

    {
        id: 62,
        nombre: 'Colegio Italia (Alto Mariscal)',
        codigo: 2
    },
    {
        id: 38,
        nombre: 'Colegio Max Toledo (Callampaya)',
        codigo: 3
    },
    {
        id: 80,
        nombre: 'Colegio Villarroel (Gran Poder)',
        codigo: 4
    },
    {
        id: 40,
        nombre: 'Unidad Educativa Fabril 18 de Mayo (Callampaya)',
        codigo: 5
    },
    {
        id: 54,
        nombre: 'Esc. Club De Leones (Bajo Mariscal)',
        codigo: 6
    },
    {
        id: 3,
        nombre: 'Tecnico Ayacucho (Miraflores Alto)',
        codigo: 7
    },
    {
        id: 97,
        nombre: 'Instituto Americano (Sopocachi Bajo 21)',
        codigo: 8
    },
    {
        id: 112,
        nombre: 'Escuela Republica de Japon(Tacagua)',
        codigo: 9
    },
    {
        id: 23,
        nombre: 'Escuela Pedro Poveda (Villa Armonia)',
        codigo: 10
    },
    {
        id: 11,
        nombre: 'Colegio Ave Maria (Villa Fatima)',
        codigo: 11
    },






    {
        id: 178,
        nombre: 'Colegio Holanda (El Tejar)',
        codigo: 1
    },
    {
        id: 179,
        nombre: 'Colegio Italia (Bajo Mariscal)',
        codigo: 2
    },
    {
        id: 180,
        nombre: 'Colegio Max Toledo (Bajo Mariscal)',
        codigo: 3
    },
    {
        id: 181,
        nombre: 'Colegio Villarroel (Rosario)',
        codigo: 4
    },
    {
        id: 182,
        nombre: 'Unidad Educativa Fabril 18 de Mayo (Pura Pura)',
        codigo: 5
    },
    {
        id: 183,
        nombre: 'Esc. Club De Leones (El Tejar)',
        codigo: 6
    },
    {
        id: 184,
        nombre: 'Tecnico Ayacucho (San Juan)',
        codigo: 7
    },
    {
        id: 185,
        nombre: 'Instituto Americano (Bello Horizonte)',
        codigo: 8
    },
    {
        id: 186,
        nombre: 'Escuela Republica de Japon (Tembladerani 19)',
        codigo: 9
    }, {
        id: 187,
        nombre: 'Escuela Pedro Poveda (IV Centenario)',
        codigo: 10
    },
    {
        id: 188,
        nombre: 'Colegio Ave Maria (Villa la Merced)',
        codigo: 11
    }
]
module.exports = {

    principal: function(req, res) {
        // sails.log("Usuario Maestro", req.user);


        Militante.findOne(req.user.idMilitante).populate('idRecintoDelegado').populate('idMesa').exec((err, datoMilitanteDelegado) => {
            if (err) { return res.serverError(err); }
            sails.log("Recindo del Delegado", datoMilitanteDelegado)

            var auxRecinto = recintosDobles.filter(dato => dato.id == datoMilitanteDelegado.idRecintoDelegado.id)
            console.log('AUX RECINTOS', auxRecinto)
            if (auxRecinto.length == 1 && !datoMilitanteDelegado.idMesa.confirmado) {
                var doble = recintosDobles.filter(dato => dato.codigo == auxRecinto[0].codigo);
                console.log('DOBLE', doble);

                res.redirect('/recintoDelegado/seleccionZona')
                    // res.view('pagesDelegado/zona', {
                    //     delegado: datoMilitanteDelegado,
                    //     militantes: [],
                    //     mesaDelegado: datoMilitanteDelegado.idMesa,
                    //     doble: doble
                    // })

            } else {
                Militante.find({ idRecinto: datoMilitanteDelegado.idRecintoDelegado.id, mesa: datoMilitanteDelegado.mesaDelegado }).exec(function(err, datoMilitantes) {
                    if (err) { return res.serverError(err); }
                    sails.log("delegado MESA")
                    res.view('pagesDelegado/principal', {
                        delegado: datoMilitanteDelegado,
                        militantes: datoMilitantes,
                        mesaDelegado: datoMilitanteDelegado.idMesa,
                        doble: []
                    })
                });
            }




        })

    },
    random: function(req, res) {
        res.send(req.body)
    },

    seleccionZona: function(req, res) {

        Militante.findOne(req.user.idMilitante).populate('idRecintoDelegado').populate('idMesa').exec((err, datoMilitanteDelegado) => {
            if (err) { return res.serverError(err); }

            var auxRecinto = recintosDobles.filter(dato => dato.id == datoMilitanteDelegado.idRecintoDelegado.id)
            var doble = recintosDobles.filter(dato => dato.codigo == auxRecinto[0].codigo);

            if (auxRecinto.length == 1 && !datoMilitanteDelegado.idMesa.confirmado) {
                Recinto.findOne(doble[0].id).populate('idZona').exec(function(err, datoRecinto1) {

                    Recinto.findOne(doble[1].id).populate('idZona').exec(function(err, datoRecinto2) {

                        res.view('pagesDelegado/zona', {
                            recinto1: datoRecinto1,
                            zona1: datoRecinto1.idZona,
                            recinto2: datoRecinto2,
                            zona2: datoRecinto2.idZona
                        })

                    })

                })
            } else {
                res.redirect('/recintoDelegado/principal')
            }



        });

    },
    actualizarZona: function(req, res) {

        Militante.findOne(req.user.idMilitante).populate('idRecintoDelegado').populate('idMesa').exec((err, datoMilitanteDelegado) => {
            if (err) { return res.serverError(err); }

            Mesa.update(datoMilitanteDelegado.idMesa.id, { confirmado: true }).exec(function(err, datoMesa) {
                Militante.update(req.user.idMilitante, { idRecintoDelegado: req.param('seleccionRecinto') }).exec(function(err, datoMil) {
                    res.redirect('/recintoDelegado/principal')

                })
            })


        });


    },
    actualizarMesasDelegados: function(req, res) {
        async.each(recintosDobles, function(recinto, cb) {
            console.log('RECINTO', recinto)
            Mesa.update({ idRecinto: recinto.id }, { confirmado: false }).exec(function(err, daotMesas) {
                cb()
            })

        }, function(error) {
            res.send('MESAS ACTUALIZADAS')
        });
    }

};