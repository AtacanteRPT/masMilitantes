
var fs = require('fs');
var path = require('path')

var conversion = require("phantom-html-to-pdf")();
const pdfshift = require('pdfshift')('5b92826913fe4316b72dfaff2fe1c536');

module.exports = {

    principal: function (req, res) {

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


    zona: function (req, res) {


        Circunscripcion.find().exec(function (err, datoCircunscripcion) {
            console.log('dato Circunscripcion :', datoCircunscripcion)
            if (err) { return res.serverError(err); }
            Distrito.find().exec(function (err, datoDistrito) {
                console.log('dato distrito :', datoDistrito)
                if (err) { return res.serverError(err); }
                Zona.find().exec(function (err, datoZona) {
                    console.log('dato zona :', datoZona)

                    Recinto.find().populate('mesas').exec(function (err, datoRecintos) {

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
    zonaPdf: function (req, res) {


        Zona.findOne(req.param('id')).exec(function (err, datoZona) {
            if (err) { return res.serverError(err); }

            console.log('dato zona :', datoZona)

            Recinto.find({idZona:datoZona.id}).populate('mesas').exec(function (err, datoRecintos) {
                if (err) { return res.serverError(err); }
                console.log('DATOS RECINTOS',datoRecintos)
                res.view('pagesDatos/zonaPdf', {
                    layout: 'layouts/layoutPdf',
                    recintos: datoRecintos,
                    zonas: datoZona
                })
            });

        });

    },
    generarPdfZona: function (req, res) {
        var id = req.param('globalZona');

        pdfshift.convert('https://militantesmasipsp.com/datos/zonaPdf/' + id, { "landscape": false, "use_print": false }).then(function (binary_file) {
            fs.writeFile(path.join(__dirname, '../.././assets/reportes/zona.pdf'), binary_file, "binary", function () { })
        }).catch(function ({ message, code, response, errors = null }) { })
        res.redirect('/reportes/zona.pdf')
    },

};
