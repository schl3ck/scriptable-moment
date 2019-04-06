# [moment.js](https://github.com/moment/moment) for Scriptable

Scriptable is an iOS app in which you can write JavaScript to automate stuff.

To use moment.js:

1. Open https://raw.githubusercontent.com/schl3ck/scriptable-moment/master/import-moment.js in your browser and copy the contents
2. Paste them into a new Scriptable script
3. Run the script once and it will import moment.js to `iCloud/Scriptable/lib/moment.js` if you have iCloud enabled, otherwise to `<Scriptable documentsDirectory>/lib/moment.js`
4. Use it in your script with
	```javascript
	const moment = importModule("lib/moment");
	let date = moment();
	```

Run the script again to check for updates of the script and moment.js