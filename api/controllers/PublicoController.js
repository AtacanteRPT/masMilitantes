module.exports = {

    buscarCedula: function(req, res) {

        Militante.find({ cedula: req.param('cedula'), paterno: req.param('paterno'), materno: req.param('materno') }).populate('idDelegado').exec(function(err, datoMilitante) {
            if (err) { return res.serverError(err); }
            sails.log("militante buscado", datoMilitante[0])

            if (datoMilitante.length > 0) {
                return res.view('pages/homepage', {
                    militante: datoMilitante,
                    mensaje: ""
                });
            } else {
                return res.view('pages/homepage', {
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