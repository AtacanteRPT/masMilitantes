module.exports = {

    principal: function(req, res) {

        Recinto.find().populate('mesas').exec(function(err, datoRecintos) {

            res.view('pagesMapa/principal', { recintos: datoRecintos })
        });


    },
    recintos: function(req, res) {

        var auxRecintos = [];
        Recinto.find().populate('mesas').populate('idZona').exec(function(err, datoRecintos) {

            datoRecintos.forEach(function(recinto) {
                if (recinto.mesas.length > 0) {
                    auxRecintos.push(recinto);
                }
            }, this);
            res.view('pagesMapa/recintos', { recintos: datoRecintos })

        });


    },
    editar: function(req, res) {
        var id = req.param('id');

        Recinto.findOne(id).exec(function(err, datoRecinto) {
            res.view('pagesMapa/editar', {
                recinto: datoRecinto,
                mensaje: ""
            });
        });

    },
    guardar: function(req, res) {
        var id = req.param('id');
        console.log('ENTRNADO A GUARDAR', req.body)
        Recinto.update(id, req.body).exec(function(err, datoRecinto) {
            if (err) { return res.serverError(err); }

            res.redirect('/mapa/editar/' + id)
        });

    },


    cargar: function(req, res) {

        var auxMesa = req.body;
        console.log('AUXMESA:', auxMesa)

        Circunscripcion.find({ nombre: auxMesa.circunscripcion }).exec(function(err, datoCircunscripcion) {
            console.log('dato Circunscripcion :', datoCircunscripcion)
            if (err) { return res.serverError(err); }
            Distrito.find({ nombre: auxMesa.distrito }).exec(function(err, datoDistrito) {
                console.log('dato distrito :', datoDistrito)
                if (err) { return res.serverError(err); }
                Zona.find({ nombre: auxMesa.zona }).exec(function(err, datoZona) {
                    console.log('dato zona :', datoZona)
                    if (err) { return res.serverError(err); }
                    Recinto.find({ nombre: auxMesa.recinto }).exec(function(err, datoRecinto) {
                        console.log('dato recinto :', datoRecinto)



                        MapaRecinto.findOrCreate({
                            idCircunscripcion: datoCircunscripcion[0].id,
                            idDistrito: datoDistrito[0].id,
                            idZona: datoZona[0].id,
                            idRecinto: datoRecinto[0].id
                        }, {
                            idCircunscripcion: datoCircunscripcion[0].id,
                            idDistrito: datoDistrito[0].id,
                            idZona: datoZona[0].id,
                            idRecinto: datoRecinto[0].id,
                            latitud: "",
                            longitud: "",
                            recinto: auxMesa.recinto,
                            zona: auxMesa.zona,
                            distrito: auxMesa.distrito,
                            circunscripcion: auxMesa.circunscripcion
                        }).exec(function(err, newOrExistingRecord, wasCreated) {
                            if (err) { return res.serverError(err); }

                            console.log('CREADO o ACTUALIZADO : ', newOrExistingRecord);
                            res.send('ya');
                        });

                    });
                });
            });
        });

    },
    cargarMesas: function(req, res) {

        var auxMesa = req.body;

        Recinto.find({ nombre: auxMesa.recinto }).exec(function(err, datoRecinto) {
            console.log('dato recinto :', datoRecinto)
            console.log('BODY', req.body)

            if (err) { return res.serverError(err); }
            auxMesa.idRecinto = datoRecinto[0].id;
            MesaRecinto.create(auxMesa).exec(function(err, creadoMesaRecinto) {
                res.send('YA DES MAPA')
            });

        });
    },
    otro: function(req, res) {
        console.log('OTRO DESDE MAPA')
        res.send('YA DESDE MAPA')
    }

};