# [moment.js](https://github.com/moment/moment) for Scriptable

Scriptable is an iOS app in which you can write JavaScript to automate stuff.

This is just a modified version of moment.js that works with the Scriptable 1.3 `importModule()` function.

To use this, download one of the files (the `*.min.js` file is just a minified version) to the Scriptable iCloud folder and rename it to `moment.js`. Then import it with

```javascript
const moment = importModule("moment.js");
```

You can also import it by downloading the file `import-moment.scriptable`, tap `Copy to Scriptable` in the iOS share dialog and then run it once inside Scriptable. It will download the minified version and save it in `lib/moment.js`. If you have iCloud enabled, you will find it in iCloud, otherwise it is only accessible with the `FileManager` API in the Scriptable `documentsDirectory`. After the import, you can delete it, or keep it to check for updates now and then.

This uses moment.js version 2.24.0
