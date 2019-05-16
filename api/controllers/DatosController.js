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
    datos_comparativos: async function (req, res){
        try{
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecinto = await Recinto.find().populate('mesas');
            
            res.view('pagesDatos/datosComparativos', {
                recintos: datoRecinto,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        }catch(err){
            res.sendError(err);
        }
    },
    zona: async function (req, res) {

        try {

            var idEleccion = 4;
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');


            for (var i = 0; i < datoRecintos.length; i++) {

                var auxMesas = datoRecintos[i].mesas.filter(dato => dato.idEleccion == idEleccion);
                datoRecintos[i].mesas = auxMesas;
            }
            // res.send(datoRecintos)
            res.view('pagesDatos/zona', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }

    },
    mapa: async function (req, res) {
        var paramId= req.param("id");
        console.log(paramId);
        try {
            var idEleccion2005 = paramId;
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');
            for (var i = 0; i < datoRecintos.length; i++) {

                var auxMesas = datoRecintos[i].mesas.filter(dato => dato.idEleccion == idEleccion2005);
                datoRecintos[i].mesas = auxMesas;
            }
            // res.send(datoRecintos)
            res.view('pagesDatos/mapa', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion,
                elecciones: paramId
            })
        } catch (error) {
            res.serverError(error);
        }
    },
    mapa_azul: async function (req, res) {
        var paramId= req.param("id");
        console.log(paramId);
        try {
            var idEleccion2005 = paramId;
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');
            for (var i = 0; i < datoRecintos.length; i++) {

                var auxMesas = datoRecintos[i].mesas.filter(dato => dato.idEleccion == idEleccion2005);
                datoRecintos[i].mesas = auxMesas;
            }
            // res.send(datoRecintos)
            res.view('pagesDatos/mapa_azul', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion,
                elecciones: paramId
            })
        } catch (error) {
            res.serverError(error);
        }
    },
    mapa_unico: async function (req, res) {
        
        try {
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');
            
            // res.send(datoRecintos)
            res.view('pagesDatos/mapaComparativoUnico', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }
    },
 
    mapa_curva: async function (req, res) {

        var paramId = req.param("id")
        try {
            var idEleccion = paramId;
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');


            for (var i = 0; i < datoRecintos.length; i++) {

                var auxMesas = datoRecintos[i].mesas.filter(dato => dato.idEleccion == idEleccion);
                datoRecintos[i].mesas = auxMesas;
            }
            // res.send(datoRecintos)
            res.view('pagesDatos/mapaCurva', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }

    },

    mapa_comparativo: async function (req, res) {

        try {

            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');


        // res.send(datoRecintos)
            res.view('pagesDatos/mapaComparativo', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }

    },
    mapa_comparativo_general: async function (req, res) {

        try {

            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');


        // res.send(datoRecintos)
            res.view('pagesDatos/mapaGeneralComparativo', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }

    },
    mapa_zona_curva: async function (req, res) {
        var paramId = req.param("id");
        try {

            var idEleccion = paramId;
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');


            for (var i = 0; i < datoRecintos.length; i++) {

                var auxMesas = datoRecintos[i].mesas.filter(dato => dato.idEleccion == idEleccion);
                datoRecintos[i].mesas = auxMesas;
            }
            // res.send(datoRecintos)
            res.view('pagesDatos/mapaZonaCurva', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }

    },
    mapa_distrito_curva: async function (req, res) {
        var paramId = req.param("id");
        try {

            var idEleccion = paramId;
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');


            for (var i = 0; i < datoRecintos.length; i++) {

                var auxMesas = datoRecintos[i].mesas.filter(dato => dato.idEleccion == idEleccion);
                datoRecintos[i].mesas = auxMesas;
            }
            // res.send(datoRecintos)
            res.view('pagesDatos/mapaDistritoCurva', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }

    },
    mapa_c_curva: async function (req, res) {
        var paramId = req.param("id");
        try {

            var idEleccion = paramId;
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');


            for (var i = 0; i < datoRecintos.length; i++) {

                var auxMesas = datoRecintos[i].mesas.filter(dato => dato.idEleccion == idEleccion);
                datoRecintos[i].mesas = auxMesas;
            }
            // res.send(datoRecintos)
            res.view('pagesDatos/mapaCCurva', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }

    },
    mapa_distrito: async function (req, res) {
        var paramId = req.param("id");
        try {

            var idEleccion = paramId;
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');


            for (var i = 0; i < datoRecintos.length; i++) {

                var auxMesas = datoRecintos[i].mesas.filter(dato => dato.idEleccion == idEleccion);
                datoRecintos[i].mesas = auxMesas;
            }
            // res.send(datoRecintos)
            res.view('pagesDatos/mapaDistrito', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }

    },
    mapa_c: async function (req, res) {

        var paramId = req.param("id");
        try {

            var idEleccion = paramId;
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');


            for (var i = 0; i < datoRecintos.length; i++) {

                var auxMesas = datoRecintos[i].mesas.filter(dato => dato.idEleccion == idEleccion);
                datoRecintos[i].mesas = auxMesas;
            }
            // res.send(datoRecintos)
            res.view('pagesDatos/mapaC', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }


    },
    mapa_zona: async function(req,res){
        var paramId = req.param("id");
        try {

            var idEleccion = paramId;
            var datoCircunscripcion = await Circunscripcion.find();
            var datoDistrito = await Distrito.find();
            var datoZona = await Zona.find();
            var datoRecintos = await Recinto.find().populate('mesas');


            for (var i = 0; i < datoRecintos.length; i++) {

                var auxMesas = datoRecintos[i].mesas.filter(dato => dato.idEleccion == idEleccion);
                datoRecintos[i].mesas = auxMesas;
            }
            // res.send(datoRecintos)
            res.view('pagesDatos/mapaZona', {
                recintos: datoRecintos,
                zonas: datoZona,
                distritos: datoDistrito,
                circunscripciones: datoCircunscripcion
            })
        } catch (error) {
            res.serverError(error);
        }
    },
    generarDistritos: function (req, res) {


        Circunscripcion.find().exec(function (err, datoCircunscripcion) {
            if (err) { return res.serverError(err); }
            Distrito.find().populate('zonas').exec(function (err, datoDistrito) {
                if (err) { return res.serverError(err); }
                Zona.find().exec(function (err, datoZona) {
                    var jsonLapaz = circuscripcion7.features;
                    console.log('JSONLAPAZ', jsonLapaz)
                    datoDistrito.forEach(function (distrito) {
                        // console.log('Distrito', distrito)
                        var jsonDistrito = [];
                        distrito.zonas.forEach(function (zona) {
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
    zonaPdf: function (req, res) {


        Zona.findOne(req.param('id')).exec(function (err, datoZona) {
            if (err) { return res.serverError(err); }

            console.log('dato zona :', datoZona)

            Recinto.find({ idZona: datoZona.id }).populate('mesas').exec(function (err, datoRecintos) {
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
    generarPdfZona: function (req, res) {
        var id = req.param('globalZona');
        console.log('ID ZONAA GLOBAL', id);
        pdfshift.convert('https://militantesmasipsp.com:3030/datos/zonaPdf/' + id, { "landscape": false, "use_print": false }).then(function (binary_file) {
            fs.writeFile(path.join(__dirname, '../.././assets/reportes/zona' + id + '.pdf'), binary_file, "binary", function () {

                res.redirect('/reportes/zona' + id + '.pdf')
            })
        }).catch(function ({ message, code, response, errors = null }) {


        })

        //res.send('oso'+id);
    },

};