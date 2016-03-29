var util = require('util');
var fs = require('fs');

var args = require('minimist')(process.argv.slice(2));
var sass = require('node-sass');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

var ERR_ARGS = 11;
var ERR_INPUT_FILE = 12;
var ERR_SASS = 13;

if( args._.length !== 1 ) {
  process.stderr.write( "usage: css-builder <sass file>\n" );
  process.exit( ERR_ARGS );
}

var inputFile = args._[0];
var sassResult = sass.render({
  file: inputFile,
  outputStyle: "expanded"
}, function( err, result ) {
  if( err ) {
    var message = util.format(
      "%s(%d,%d): error SASS%d: %s\n",
      err.file || inputFile,
      err.line || 0,
      err.column || 0,
      err.status,
      err.message
    );
    process.stderr.write( message );
    process.exit( ERR_SASS );
    return;
  }
  var css = result.css.toString();
  postcss([ autoprefixer, cssnano ])
    .process(css, {
      autoprefixer: {
        browsers: "Last 4 versions, Firefox ESR, IE >= 9, Safari >= 6"
      }
    })
    .then(function( result ) {
      result.warnings().forEach( function( message ) {
        process.stderr.write( message );
        process.stderr.write( "\n" );
      });
      process.stdout.write( result.css );
    });
});
