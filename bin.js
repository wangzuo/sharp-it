#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const mkdirp = require('mkdirp');
const pkg = require('./package.json');
const resize = require('./resize');
const cwd = process.cwd();

program
  .version(pkg.version)
  .usage('[options] <file ...>')
  .option(
    '--width <n>',
    '@1x image width',
    val => (val ? parseInt(val, 10) : 100)
  )
  .option('--ios', 'ios mode')
  .option('--android', 'android mode');

program.parse(process.argv);

const width = program.width;
const files = program.args;

for (const file of files) {
  const ext = path.extname(file);
  const filename = path.basename(file, ext);
  const filepath = path.join(cwd, file);

  if (program.ios) {
    const output = path.join(cwd, 'ios');
    mkdirp.sync(output);
    resize(filepath, width, path.join(output, `${filename}${ext}`));
    resize(filepath, width * 2, path.join(output, `${filename}@2x${ext}`));
    resize(filepath, width * 3, path.join(output, `${filename}@3x${ext}`));
  }
}
