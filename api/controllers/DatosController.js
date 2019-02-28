var fs = require('fs');
var path = require('path')

var conversion = require("phantom-html-to-pdf")();
const pdfshift = require('pdfshift')('5b92826913fe4316b72dfaff2fe1c536');



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
    mapa: function(req, res) {


        Circunscripcion.find().exec(function(err, datoCircunscripcion) {
            console.log('dato Circunscripcion :', datoCircunscripcion)
            if (err) { return res.serverError(err); }
            Distrito.find().exec(function(err, datoDistrito) {
                console.log('dato distrito :', datoDistrito)
                if (err) { return res.serverError(err); }
                Zona.find().exec(function(err, datoZona) {
                    console.log('dato zona :', datoZona)

                    Recinto.find().populate('mesas').exec(function(err, datoRecintos) {

                        res.view('pagesDatos/mapa', {
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
    mapa2: function(req, res) {


        Circunscripcion.find().exec(function(err, datoCircunscripcion) {
            console.log('dato Circunscripcion :', datoCircunscripcion)
            if (err) { return res.serverError(err); }
            Distrito.find().exec(function(err, datoDistrito) {
                console.log('dato distrito :', datoDistrito)
                if (err) { return res.serverError(err); }
                Zona.find().exec(function(err, datoZona) {
                    console.log('dato zona :', datoZona)

                    Recinto.find().populate('mesas').exec(function(err, datoRecintos) {

                        res.view('pagesDatos/mapa2', {
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
    mapa3: function(req, res) {


        Circunscripcion.find().exec(function(err, datoCircunscripcion) {
            console.log('dato Circunscripcion :', datoCircunscripcion)
            if (err) { return res.serverError(err); }
            Distrito.find().exec(function(err, datoDistrito) {
                console.log('dato distrito :', datoDistrito)
                if (err) { return res.serverError(err); }
                Zona.find().exec(function(err, datoZona) {
                    console.log('dato zona :', datoZona)

                    Recinto.find().populate('mesas').exec(function(err, datoRecintos) {

                        res.view('pagesDatos/mapa3', {
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
    mapa4: function(req, res) {


        Circunscripcion.find().exec(function(err, datoCircunscripcion) {
            console.log('dato Circunscripcion :', datoCircunscripcion)
            if (err) { return res.serverError(err); }
            Distrito.find().exec(function(err, datoDistrito) {
                console.log('dato distrito :', datoDistrito)
                if (err) { return res.serverError(err); }
                Zona.find().exec(function(err, datoZona) {
                    console.log('dato zona :', datoZona)

                    Recinto.find().populate('mesas').exec(function(err, datoRecintos) {

                        res.view('pagesDatos/mapa5', {
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
    mapa5: function(req, res) {


        Circunscripcion.find().exec(function(err, datoCircunscripcion) {
            console.log('dato Circunscripcion :', datoCircunscripcion)
            if (err) { return res.serverError(err); }
            Distrito.find().exec(function(err, datoDistrito) {
                console.log('dato distrito :', datoDistrito)
                if (err) { return res.serverError(err); }
                Zona.find().exec(function(err, datoZona) {
                    console.log('dato zona :', datoZona)

                    Recinto.find().populate('mesas').exec(function(err, datoRecintos) {

                        res.view('pagesDatos/mapa5', {
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


    generarDistritos: function(req, res) {


        Circunscripcion.find().exec(function(err, datoCircunscripcion) {
            if (err) { return res.serverError(err); }
            Distrito.find().populate('zonas').exec(function(err, datoDistrito) {
                if (err) { return res.serverError(err); }
                Zona.find().exec(function(err, datoZona) {
                    var jsonLapaz = circuscripcion7.features;
                    console.log('JSONLAPAZ', jsonLapaz)
                    datoDistrito.forEach(function(distrito) {
                        // console.log('Distrito', distrito)
                        var jsonDistrito = [];
                        distrito.zonas.forEach(function(zona) {
                            var auxZona = jsonLapaz.filter(dato => {
                                // console.log('DATO JSON LAPAZ-',dato)
                                return dato.properties.zona === zona.nombre
                            });

                            console.log('AUZ ZONA', auxZona)
                            if (auxZona.length > 0) {

                                jsonDistrito.push(auxZona[0]);
                            }
                        });

                        if (jsonDistrito.length > 0) {
                            var auxJson = {
                                "type": "FeatureCollection",
                                "features": jsonDistrito
                            }

                            console.log('JSON DISTRITO', jsonDistrito)
                            fs.writeFile(distrito.nombre + '-generado.json', JSON.stringify(auxJson), (err) => {
                                if (err) throw err;
                                console.log('The file has been saved!');
                            })
                        }
                    });



                });
            });
        });

        res.send('NADA')
    },
    zonaPdf: function(req, res) {


        Zona.findOne(req.param('id')).exec(function(err, datoZona) {
            if (err) { return res.serverError(err); }

            console.log('dato zona :', datoZona)

            Recinto.find({ idZona: datoZona.id }).populate('mesas').exec(function(err, datoRecintos) {
                if (err) { return res.serverError(err); }
                console.log('DATOS RECINTOS', datoRecintos)
                res.view('pagesDatos/zonaPdf', {
                    layout: 'layouts/layoutPdf',
                    recintos: datoRecintos,
                    zonas: datoZona
                })
            });

        });

    },
    generarPdfZona: function(req, res) {
        var id = req.param('globalZona');
        console.log('ID ZONAA GLOBAL', id);
        pdfshift.convert('https://militantesmasipsp.com/datos/zonaPdf/' + id, { "landscape": false, "use_print": false }).then(function(binary_file) {
            fs.writeFile(path.join(__dirname, '../.././assets/reportes/zona' + id + '.pdf'), binary_file, "binary", function() {

                res.redirect('/reportes/zona' + id + '.pdf')
            })
        }).catch(function({ message, code, response, errors = null }) {


        })

        //res.send('oso'+id);
    },

};