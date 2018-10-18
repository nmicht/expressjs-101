class Token {
  constructor(id, token, userId, type, createdAt, expires, active) {
    this.id = id;
    this.token = token;
    this.userId = userId;
    this.type = type;
    this.createdAt = createdAt;
    this.expires = expires;
    this.active = active;
  }

  deactive() {
    this.active = false;
    // Go to the database and deactivate the token changing the active field
    // you can erase the row on the db, but most likely is a process for each N time
    //
    // db.update();
  }

  static get(token) {
    // Go to the database and get the token that matches with the one here
    //
    // db.get();

    return new Token(1, token, 1, 's', '2018-10-18', 15, 1);
  }
}

module.exports = Token;
