/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


    //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
    //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

    /***************************************************************************
     *                                                                          *
     * Make the view located at `views/homepage.ejs` your home page.            *
     *                                                                          *
     * (Alternatively, remove this and add an `index.html` file in your         *
     * `assets` directory)                                                      *
     *                                                                          *
     ***************************************************************************/

    // 'get /': 'PublicoController.principal',
    'get /': 'DatosController.zona',

    'get /publico/buscarCedula': 'PublicoController.principal',
    'get /distrito/militantesPorDistritos/:id': 'DistritoController.militantesPorDistritos',
    'get /distrito/militantesPorZonas/:id': 'DistritoController.militantesPorZonas',
    'get /distrito/militantesPorRecintos/:id': 'DistritoController.militantesPorRecintos',
    'get /datos/zonaPdf/:id': 'DatosController.zonaPdf',
    'get /datos/generarPdfZona/:globalZona': 'DatosController.generarPdfZona',



    'get /mapa/editar/:id': 'MapaController.editar',
    'POST /mapa/guardar/:id': 'MapaController.guardar',

    'get /datos/mapa/:id': 'DatosController.mapa',
    'get /datos/mapa_curva/:id': 'DatosController.mapa_curva',

    'get /datos/mapa_zona/:id': 'DatosController.mapa_zona',
    'get /datos/mapa_distrito/:id': 'DatosController.mapa_distrito',
    'get /datos/mapa_c/:id': 'DatosController.mapa_c',

    'get /datos/mapa_zona_curva/:id': 'DatosController.mapa_zona_curva',
    'get /datos/mapa_distrito_curva/:id': 'DatosController.mapa_distrito_curva',
    'get /datos/mapa_c_curva/:id': 'DatosController.mapa_c_curva',

    // 'get /datos/mapa_azul/:id': 'DatosController.mapa_azul',


    



    // 'POST /mapa/guardar/:id': 'MapaController.guardar',

    // view: 'pages/homepage'

    /***************************************************************************
     *                                                                          *
     * More custom routes here...                                               *
     * (See https://sailsjs.com/config/routes for examples.)                    *
     *                                                                          *
     * If a request to a URL doesn't match any of the routes in this file, it   *
     * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
     * not match any of those, it is matched against static assets.             *
     *                                                                          *
     ***************************************************************************/


    //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
    //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
    //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



    //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
    //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
    //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


    //  ╔╦╗╦╔═╗╔═╗
    //  ║║║║╚═╗║
    //  ╩ ╩╩╚═╝╚═╝


};