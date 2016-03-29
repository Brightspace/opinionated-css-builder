Opinionated CSS Builder
=======================

[![Build Status](https://travis-ci.org/Brightspace/opinionated-css-builder.svg?branch=master)](https://travis-ci.org/Brightspace/opinionated-css-builder)

A packaged combination of css build tools

Usage
-----

`
opinionated-css-builder myfile.sass > output.css
`

Details
-------

opinionated-css-builder performs the following operations on your input file:

- node-sass {outputStyle: "expanded"}
- postcss
  - autoprefixer { browsers: "Last 4 versions, Firefox ESR, IE >= 9, Safari >= 6" }
  - cssnano
