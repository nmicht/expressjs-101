const { Token } = require('../models');

class Auth {
  constructor() {
    this.salt = process.env.SALT;

    // Binding this to not loose context on router
    this.haveSession = this.haveSession.bind(this);
  }

  haveSession(req, res, next) {
    const token = this.getHeaderToken(req.headers.authorization);
    this.token = Token.get(token);
    if (this.isActive()) {
      // Add to the request a session object with user and all session information
      //
      // req.session = {
      //   token: this,
      //   user: User.get(this.token.userId),
      // }
      next();
    } else {
      next({
        status: 403,
        message: 'You need to be logged',
      });
    }
  }

  havePermissions(req, res, next) {
    // Validate if the user can do this action
    // hint: can take the route to make sure about which is the action
    //
    // req.session.user.canDo('edit')
  }

  getHeaderToken(bearer = '') {
    return bearer.split(' ')[1];
  }

  isActive() {
    // Compare the current datetime with the one from the token and the expiration
    // in case is out of the time scope, return false and deactivate the Token
    //
    // const now = new Date();
    // if(now + this.token.expires > this.token.created + this.token.expires) {
    //   this.token.deactive();
    //   return false;
    // } else {
    //   return true;
    // }
    if (this.token) {
      return true;
    }
    return false;
  }
}

module.exports = new Auth();
