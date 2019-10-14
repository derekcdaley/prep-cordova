[![npm version](https://raw.githubusercontent.com/derekcdaley/prep-cordova/master/npm.svg)](http://badge.fury.io/js/badge-list)

Install with `npm install prep-cordova`

## API
Use prep-cordova to consume array of plugins in package.json. Must be ran
in the directory where the package.json is located.

Example:
```
"cordovaPlugins": [
    "cordova-plugin-mfp",
    "cordova-plugin-mfp-jsonstore",
    "cordova-plugin-barcodescanner"
  ]
```

## Optional
Flag of --mfp can be set to true or false.
True makes it compatible with the IBM MobileFirst CLI
Defaults to false

Flag of --platforms can be set to true or false.
True makes it generate platforms located in config.xml
Defaults to true

Example:
```
prep-cordva --mfp=true
```