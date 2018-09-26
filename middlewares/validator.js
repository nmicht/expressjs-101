class Validator {
  static get regex() {
    return {
      word: /[a-zA-ZñÑ ]{3,}/,
      email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    };
  }

  static word(data) {
    return (Validator.regex.word.test(data));
  }

  static required(data) {
    return data !== undefined && data !== null;
  }

  static email(data) {
    return (Validator.regex.email.test(data));
  }

  static validate(req, res, next, rules) {
    for (let part in rules) {
      for (let field in rules[part]) {
        let validators = rules[part][field].split(',');
        validators.forEach((f) => {
          if (!Validator[f](req[part][field] || '')) {
            return next('error');
          }
        });
      }
    }
    return next();
  }
}

module.exports = Validator;
