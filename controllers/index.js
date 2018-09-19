// Load all the controllers available under controllers folder
const folder = './controllers';
const fs = require('fs');

fs.readdirSync(folder).forEach((file) => {
  const fileName = file.split('.')[0];
  if (fileName !== 'index') {
    exports[`${fileName}Ctrl`] = require(`./${fileName}`);
  }
});
