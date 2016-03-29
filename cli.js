#!/usr/bin/env node

var util = require('util');
var minimist = require('minimist');
var builder = require('./index.js');

var args = minimist( process.argv.slice(2) );

var EXIT_SUCCESS = 0;
var EXIT_ERR_ARGS = 11;
var EXIT_ERR_PROCESSING = 12;

if( args._.length !== 1 ) {
  process.stderr.write( "usage: opinionated-css-builder <sass file>\n" );
  process.exit( EXIT_ERR_ARGS );
}

var inputFile = args._[0];

builder.processFile( inputFile, function( errors, result ) {
  if( errors ) {
    errors.forEach( function( err ) {
      var message = util.format(
        "%s(%d,%d): error %s: %s\n",
        err.file || inputFile,
        err.line || 0,
        err.column || 0,
        err.code,
        err.message
      );
      process.stderr.write( message );
    } );
    process.exit( EXIT_ERR_PROCESSING );
    return;
  }
  process.stdout.write( result.css );
  process.exit( EXIT_SUCCESS );
} );