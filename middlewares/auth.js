const bcrypt = require('bcrypt');

class Auth {
  register(req, res, next) {
    user = User.create(req);

    // Crear el token
    bcrypt.hash(`${user.name}${date}`, process.env.SECRET, (err, hash) => {
      Token.create({
        token,
        created_at: new Date(),
        duration: 12,
        type: 's',
        active: 1,
        user_id: user.id
      })
    });

    res.send({
      data: {
        hash
      }
    }).status(201);
  }

  login(req, res, next) {
    user = User.get(req)

    // Validar si ya hay token?
    // Create token
  }

  logout(token) {
    token.destroy()
  }

  session(token) {
    if (Token.active(token)) {
      next()
    } else {
      return next({asdfasd})
    }
  }
}
