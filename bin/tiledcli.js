#!/usr/bin/env node

"use strict";

var fs = require('fs');
var process = require('process');
var glob = require('glob');
var async = require('async');
var tiled = require('../src/tiled')
//var basecmd = require('../src/basecmd');
//var oss = require('../src/oss');
//var cdn = require('../src/cdn');
var argv = require('yargs')
    .option('width', {
        alias : 'width',
        demand: false,
        describe: 'width',
        type: 'int'
    })
    .option('height', {
        alias : 'height',
        demand: false,
        describe: 'height',
        type: 'int'
    })
    .option('layername', {
        alias : 'layername',
        demand: false,
        describe: 'layername',
        type: 'string'
    })
    //.option('bucket', {
    //    alias : 'bucket',
    //    demand: false,
    //    describe: 'bucket',
    //    type: 'string'
    //})
    //.option('osspath', {
    //    alias : 'osspath',
    //    demand: false,
    //    describe: 'oss path',
    //    type: 'string'
    //})
    //.option('endpoint', {
    //    alias : 'endpoint',
    //    demand: false,
    //    describe: 'endpoint',
    //    type: 'string'
    //})
    //.option('islocal', {
    //    alias : 'islocal',
    //    demand: false,
    //    describe: 'islocal',
    //    type: 'boolean'
    //})
    //.option('cdn', {
    //    alias : 'cdn',
    //    demand: false,
    //    describe: 'cdn url',
    //    type: 'string'
    //})
    .usage('Usage: tiledcli src-filename dest-filename ')
    .example('tiledcli src-filename dest-filename --layername=mask --width=100 --height=100', 'tiledcli src-filename dest-filename --layername=mask --width=100 --height=100')
    .help('h')
    .alias('h', 'help')
    .epilog('copyright 2015')
    .argv;

var basearr = argv._;
if (basearr == undefined || basearr.length < 2) {
    console.log('Usage: tiledcli src-filename dest-filename --layername=mask --width=100 --height=100');

    process.exit(1);
}

let srcfile = basearr[0];
let destfile = basearr[1];

let obj = tiled.loadJson(srcfile);
if (obj == undefined) {
    console.log('src-file is fail!');

    process.exit(1);
}

if (!argv.hasOwnProperty('layername')) {
    console.log('layername is fail!');

    process.exit(1);
}

let w = 0;
let h = 0;

if (argv.hasOwnProperty('width')) {
    w = argv.width;
}
else {
    w = tiled.width;
}

if (argv.hasOwnProperty('height')) {
    h = argv.height;
}
else {
    h = tiled.height;
}


let layer = tiled.getLayer(obj, argv.layername);
if (layer == undefined) {
    console.log('err!');

    process.exit(1);
}

let curlayer = tiled.initLayer(layer, w, h);

fs.writeFileSync(destfile, JSON.stringify(curlayer));

//var buf = fs.readFileSync(basearr[0], 'utf-8');
//eval(buf);
//
//proj.procProj(projparam);