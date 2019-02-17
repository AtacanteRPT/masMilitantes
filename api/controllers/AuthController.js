const passport = require('passport');
module.exports = {
    loguearse: function(req, res) {

        if (req.isAuthenticated()) {
            return res.redirect("/principal/index")
        }
        return res.view("login/login")
    },
    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                // return res.send({
                //     message: info.message,
                //     user
                // });
                console.log("no logueado : ", info.message)

                return res.redirect("/");
            }

            req.logIn(user, function(err) {
                if (err) {
                    console.log(err)
                }
                res.send(err);
                // return res.send({
                //     message: info.message,
                //     user
                // });
                console.log("PREGUNTANDPO logueado")


                if (req.isAuthenticated()) {
                    console.log("Redireccionando a /principal delegado", req.user)


                    res.redirect("/auth/usuarios")
                } else {

                    res.redirect("/");
                }

            });
        })(req, res);
    },
    usuarios: function(req, res) {
        switch (req.user.rol) {
            case 'delegado':
                sails.log("DELEGADO ::", req.user)

                res.redirect("/recintoDelegado/principal");
                break;
            case 'admin':
                sails.log("ADMIN ::", req.user)

                res.redirect("/mapa/principal");

                break;
            default:
                sails.log("OTRO ::", req.user)

                res.redirect("/");

                break;
        }

    },
    salir: function(req, res) {
        req.logout();
        res.redirect("/");
    },
    autentificacion: function(req, res) {
        var usuario = {
            usuario: req.user,
            autentificacion: req.isAuthenticated()
        }
        res.send(usuario)
    }

};