"use strict";

var fs = require('fs');

function loadJson(filename) {
    let buf = fs.readFileSync(filename, 'utf-8');
    let obj = JSON.parse(buf);

    return obj;
}

function getLayer(obj, layername) {
    if (obj.hasOwnProperty('layers')) {
        let layers = obj.layers;
        for (let ii = 0; ii < layers.length; ++ii) {
            if (layers[ii].name == layername) {
                return layers[ii];
            }
        }
    }

    return undefined;
}

// init layer(w, h, data) with layer
function initLayer(layer, w, h) {
    let nl = {w: w, h: h, data: []};

    for (let y = 0; y < h; ++y) {
        for (let x = 0; x < w; ++x) {
            nl.data.push(0);
        }
    }

    for (let y = 0; y < h; ++y) {
        for (let x = 0; x < w; ++x) {
            let cur = 0;
            if (x < layer.width && y < layer.height) {
                cur = layer.data[y * layer.width + x];
            }

            nl.data[y * w + x] = cur;
        }
    }

    return nl;
}

exports.loadJson = loadJson;
exports.getLayer = getLayer;
exports.initLayer = initLayer;