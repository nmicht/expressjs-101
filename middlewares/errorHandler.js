const fs = require('fs');

function eraseFiles(req) {
  // Iterate over req.file, req.files and req.fields to remove all the files
  if (req.file) {
    fs.unlink(req.file.path, () => {
      console.log('there was an error trying to erase the file');
    });
  }
}

function errorHandler(err, req, res, next) {
  // In case something fail, will be great to erase the uploaded files
  eraseFiles(req);
  console.error('Error handler', err);
  return res.status(err.status || 500).send(err);
}

module.exports = errorHandler;
