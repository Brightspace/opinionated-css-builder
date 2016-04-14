var sass = require('node-sass');
var postcss = require('postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

exports.processFile = function( inputFile, callback ) {
  sass.render({
    file: inputFile,
    outputStyle: "expanded"
  }, function( err, result ) {
    if( err ) {
      callback([{
        file: err.file || inputFile,
        line: err.line || 0,
        column: err.column || 0,
        code: "SASS" + err.status,
        message: err.message
      }]);
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
        callback( null, {
          css: result.css
        } );
        return;
      });
  });
};
