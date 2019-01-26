module.exports = {

    buscarCedula: function(req, res) {

        // Militante.find({ cedula: req.param('cedula'), paterno: req.param('paterno'), materno: req.param('materno') }).populate('idDelegado').exec(function(err, datoMilitante) {
        //     if (err) { return res.serverError(err); }
        //     sails.log("militante buscado", datoMilitante[0])

        //     if (datoMilitante.length > 0) {
        //         return res.view('pages/homepage', {
        //             militante: datoMilitante,
        //             mensaje: ""
        //         });
        //     } else {
        //         return res.view('pages/homepage', {
        //             militante: datoMilitante,
        //             mensaje: "No es militante"
        //         });
        //     }


        // })

        Militante.find({ cedula: req.param('cedula'), paterno: req.param('paterno'), materno: req.param('materno') }).populate('idDelegado').exec(function(err, datoMilitante) {
            if (err) { return res.serverError(err); }


            sails.log("militante buscado", datoMilitante[0])

            if (datoMilitante.length > 0) {
                if (datoMilitante[0].idDelegado.tipo != 'No') {

                    Recinto.findOne(datoMilitante[0].idRecintoDelegado).populate('idZona').exec(function(err, datoRecinto) {
                        if (err) { return res.serverError(err); }

                        Zona.findOne(datoRecinto.idZona.id).populate('idDistrito').exec(function(err, datoZona) {
                            if (err) { return res.serverError(err); }

                            return res.view('pages/homepage', {
                                zonaDelegado: datoZona.nombre,
                                distritoDelegado: datoZona.idDistrito.nombre,
                                tipoDelegado: datoMilitante[0].idDelegado.tipo,
                                militante: datoMilitante,
                                mensaje: ""
                            });
                        })
                    })
                } else {
                console.log("++++++++++++++NO ES DELEGADO+++++++++++++")
                    return res.view('pages/homepage', {
                        zonaDelegado: '',
                        distritoDelegado: '',
                        tipoDelegado: '',
                        militante: datoMilitante,
                        mensaje: ""
                    });
                }
            } else {
                return res.view('pages/homepage', {
                    zonaDelegado: '',
                    distritoDelegado: '',
                    tipoDelegado: '',
                    militante: datoMilitante,
                    mensaje: "No es militante"
                });
            }


        })
    },
    principal: function(req, res) {

        return res.view('pages/homepage', {
            militante: [],
            mensaje: ""
        });
    }
}