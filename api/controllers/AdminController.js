/**
 * CircunscripcionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {


    principal: function(req, res) {
        res.view('pagesAdmin/principal')
    }

};