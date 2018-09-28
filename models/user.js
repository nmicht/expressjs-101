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
    data.forEach((row) => {
      response.push(new User(row));
    });
    return response;
  }

  static async get(userId) {
    const data = await db.selectOne('users', userId);
    return data.length !== 0 ? new User(data[0]) : data;
  }

  static async create({ name, email }) {
    let response = await db.insert('users', { name, email });

    const id = response.insertId;
    if (id > 0) {
      return new User({ id, name, email });
    }
    return [];
  }
}

module.exports = User;
