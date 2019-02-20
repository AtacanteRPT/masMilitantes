module.exports = {

  principal: function(req, res) {

    res.redirect('/');
    //   Circunscripcion.find().exec(function(err, datoCircunscripcion) {
    //       console.log('dato Circunscripcion :', datoCircunscripcion)
    //       if (err) { return res.serverError(err); }
    //       Distrito.find().exec(function(err, datoDistrito) {
    //           console.log('dato distrito :', datoDistrito)
    //           if (err) { return res.serverError(err); }
    //           Zona.find().exec(function(err, datoZona) {
    //               console.log('dato zona :', datoZona)

    //               Recinto.find().populate('mesas').exec(function(err, datoRecintos) {

    //                   res.view('pagesDatos/principal', {
    //                       recintos: datoRecintos,
    //                       zonas: datoZona,
    //                       distritos: datoDistrito,
    //                       circunscripciones: datoCircunscripcion
    //                   })
    //               });

    //           });
    //       });
    //   });

  },


  zona: function(req, res) {


    Circunscripcion.find().exec(function(err, datoCircunscripcion) {
        console.log('dato Circunscripcion :', datoCircunscripcion)
        if (err) { return res.serverError(err); }
        Distrito.find().exec(function(err, datoDistrito) {
            console.log('dato distrito :', datoDistrito)
            if (err) { return res.serverError(err); }
            Zona.find().exec(function(err, datoZona) {
                console.log('dato zona :', datoZona)

                Recinto.find().populate('mesas').exec(function(err, datoRecintos) {

                    res.view('pagesDatos/zona', {
                        recintos: datoRecintos,
                        zonas: datoZona,
                        distritos: datoDistrito,
                        circunscripciones: datoCircunscripcion
                    })
                });

            });
        });
    });

},



};
