const fs = require('fs');
const sharp = require('sharp');

module.exports = (filepath, width, output) => {
  const resize = sharp().resize(width);
  console.log(output);

  fs
    .createReadStream(filepath)
    .pipe(resize)
    .pipe(fs.createWriteStream(output));
};
