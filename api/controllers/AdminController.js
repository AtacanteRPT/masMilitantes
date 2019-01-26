/**
 * CircunscripcionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    principal: function(req, res) {

        var resultados = {
            validos: 0,
            blancos: 0,
            nulos: 0,
            asistencias: 0
        };
        Circunscripcion.find().exec(function(err, datoCircunscripciones) {
            if (err) { return res.serverError(err); }
            sails.log("DatoCricunscripcion")
            Distrito.find().exec(function(err, datoDistritos) {
                if (err) { return res.serverError(err); }
                sails.log("DatoDistritos")

                Zona.find().exec(function(err, datoZonas) {
                    if (err) { return res.serverError(err); }
                    sails.log("atoZonas")

                    Recinto.find().exec(function(err, datoRecintos) {

                        if (err) { return res.serverError(err); }
                        sails.log("DatosRecintos")

                        Mesa.find().exec(function(err, datoMesas) {
                            if (err) { return res.serverError(err); }
                            async.each(datoMesas, function(mesa, cb) {


                                resultados.validos = resultados.validos + mesa.asistenciasBocaUrna
                                resultados.blancos = resultados.blancos + mesa.blancosBocaUrna
                                resultados.nulos = resultados.nulos + mesa.nulosBocaUrna
                                resultados.asistencias = resultados.asistencias + mesa.asistencias
                                cb();

                            }, function(error) {
                                res.view('pagesAdmin/principal', {
                                    circunscripciones: datoCircunscripciones,
                                    distritos: datoDistritos,
                                    zonas: datoZonas,
                                    recintos: datoRecintos,
                                    resultados: resultados
                                })
                            })
                        })


                    })


                })
            })
        })
    },

    generarListaUsuario: function(req, res) {
        var lista = [{
            usuario: 'USUARIO',
            password: 'CONTRASEÑA - PASSWORD'
        }]
        stringify(listaPrincipal, function(err, output) {
            fs.writeFile("lista_Usuario_Delegados", output, 'utf8', function(err) {
                if (err) {
                    console.log('Some error occured - file either not saved or corrupted file saved.');
                } else {
                    console.log('It\'s saved!');
                }
            });
        });
    },

    actualizarDireccion: function(req, res) {
        var contador = 0;
        Militante.update({ cedula: req.param('cedula') }, {
            direccion: req.param('direccion'),
            celular: req.param('celular'),
            circunscripcion: req.param('circunscripcion')
        }).exec(function(err, datoMIlitat) {
            sails.log('Se actualizo militante', contador++)
            res.send("todo posi")
        })
    },

    actualizarZona: function(req, res) {

        var cedula = req.param('cedula')
        var materno = req.param('materno')
        Militante.update({ cedula: cedula, materno: materno }, {
            idRecinto: 177
        }).exec(function(err, datoMilitante) {
            res.send('MILITANTE ACTUALIZADO ZONA')
        });
    },

    actualizarRecinto: function(req, res) {

        var cedula = req.param('cedula')
        var materno = req.param('materno')
        Militante.update({ cedula: cedula, materno: materno }, {
            idRecinto: 178
        }).exec(function(err, datoMilitante) {
            res.send('MILITANTE ACTUALIZADO ZONA')
        });
    }

};