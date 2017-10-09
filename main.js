#!/usr/bin/env node

var fs = require('fs');
var xml2js = require('xml2js');
var exec = require('child_process').execSync;
var pjson = require(process.cwd() + '/package.json');
var configxml = process.cwd() + '/config.xml';
var plugins = pjson.cordovaPlugins;
var parser = new xml2js.Parser();
var prefix = "";
var needPlatform = true;

prefix = (process.argv[2] == '--mfp=true' ||
    process.argv[3] == '--mfp=true') ? "mfp " : "";

needPlatform = (process.argv[2] == '--platforms=true' ||
    process.argv[3] == '--platforms=true');

var installPlatforms = function (callback) {
    fs.readFile(configxml, function (err, data) {
        parser.parseString(data, function (err, result) {
            result.widget.platform.forEach(function (value) {
                var cmd = prefix + "cordova platform add " + value.$.name;
                exec(cmd, { stdio: 'inherit' });
            });
            setTimeout(function () {
                callback();
            }, 200);
        });
    });
}

var installPlugins = function () {
    plugins.forEach(function (value) {
        var matches = value.match(/\d+/g);
        if (matches != null) {
            prefix = '';
        }
        var cmd = prefix + "cordova plugin add " + value;
        exec(cmd, { stdio: 'inherit' });
    });
}

if (needPlatform) {
    var cleanCmd = "rimraf platforms && rimraf plugins && mkdirp platforms && mkdirp plugins";
    exec(cleanCmd, { stdio: 'inherit' });
    installPlatforms(function () { installPlugins(); });
} else {
    var cleanCmd = "rimraf plugins && mkdirp plugins";
    exec(cleanCmd, { stdio: 'inherit' });
    installPlugins();
}