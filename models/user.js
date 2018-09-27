const db = require('../db');

class User {
  constructor({ id, name, email }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static async getAll() {
    const data = await db.selectAll('users');
    const response = [];
    data.forEach((r) => {
      response.push(new User(r));
    });
    return response;
  }

  static async get(userId) {
    const data = await db.selectOne('users', userId);
    return data.length !== 0 ? new User(data[0]) : data;
  }
}

module.exports = User;
