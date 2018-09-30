const mysql = require('mysql');

class DB {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    this.connection.connect((err) => {
      if (err) {
        console.error('error connecting', err.stack);
        throw err;
      }
    });
  }

  selectAll(table) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM ??', [table], (error, results) => {
        if (error) return reject(this.processError(error));
        return resolve(results);
      });
    });
  }

  selectOne(table, id) {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM ?? WHERE id = ?', [table, id], (error, results) => {
        if (error) return reject(this.processError(error));
        return resolve(results);
      });
    });
  }

  insert(table, resource) {
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO ?? SET ?', [table, resource], (error, results) => {
        if (error) return reject(this.processError(error));
        return resolve(results);
      });
    });
  }

  disconnect() {
    this.connection.end();
  }

  destroy() {
    this.connection.destroy();
  }

  processError(err) {
    const error = {};
    let data;

    switch (err.code) {
      case 'ER_DUP_ENTRY':
        data = this.getDataFromErrorMsg(err.sqlMessage);
        error.duplicated = {
          message: `The ${data.field} ${data.data} already exists on the system`,
          field: data.field,
          sql: err.sql,
        };
        break;
      default:
        error.error = {
          message: err.sqlMessage,
          sql: err.sql,
        };
    }

    return error;
  }

  getDataFromErrorMsg(message) {
    const data = unescape(message).match(/'([^']+)'/g);
    return {
      field: data[1].slice(1, -1),
      data: data[0].slice(1, -1),
    };
  }
}

module.exports = new DB();
