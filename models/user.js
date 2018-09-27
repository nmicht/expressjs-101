const db = require('../db');

class User {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static async getAll() {
    let data = await db.selectAll('users');
    let response = [];
    data.forEach((r) => {
      response.push(new User(r));
    });
    return response;
  }
}

module.exports = User;
