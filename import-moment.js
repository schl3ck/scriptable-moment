// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: download;
// if you move the file, please adjust this, otherwise this script doesn't know where it is
const filePath = "lib/moment.js";

const remoteUrl = "https://raw.githubusercontent.com/schl3ck/scriptable-moment/master/moment-with-locales.min.js";
const changelogUrl = "https://github.com/moment/moment/blob/version/CHANGELOG.md";
let infoJson = "https://raw.githubusercontent.com/schl3ck/scriptable-moment/master/info.json";
const importScriptUrl = "https://raw.githubusercontent.com/schl3ck/scriptable-moment/master/import-moment.js";

const ownVersion = "0.2";

const regexGetVersion = /^\/\/ v([\d.]+)/;

let fm;
try {
	fm = FileManager.iCloud();
} catch (err) {
	fm = FileManager.local();
}

let completePath = fm.joinPath(fm.documentsDirectory(), filePath);

let req = new Request(infoJson);
infoJson = await req.loadJSON();

let newVersion = infoJson.script.version;

if (compVersion(newVersion, ownVersion) > 0) {
	loop:
	while (true) {
		let a = new Alert();
		a.title = `New ${Script.name()} version: ${ownVersion} ⇒ ${newVersion}`;
		a.message = infoJson.script.history.find(h => h.version === newVersion).notes;
		
		a.addCancelAction("Cancel");
		a.addAction("Install");
		a.addAction("View Changelog");
		a.addAction("Ignore");
		
		let res = await a.presentAlert();
		switch (res) {
			case -1: return;
			case 0:
				req = new Request(importScriptUrl);
				res = await req.loadString();
				if (req.response.statusCode >= 400 || res.length < 300) {
					let a = new Alert();
					a.title = "Error";
					a.message = "There was an error while downloading the script:\n" + JSON.stringify(req.response, null, 4);
					a.presentAlert();
					return;
				}
				fm.writeString(fm.joinPath(fm.documentsDirectory(), Script.name() + ".js"), res);
				return;
			case 1:
				let wv = new WebView();
				wv.loadHTML(`<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="initial-scale=1, width=device-width">
<style>
body {
	font-family: -apple-system;
}
</style>
</head>
<body>
	${infoJson.script.history.map(h => {
		return `<h2>v${h.version} - ${h.date}</h2>
<p>${h.notes}</p>`;
	}).join("\n")}
</body>
</html>`);
				await wv.present();
				break;
			case 2: break loop;
		}
	}
}
return

if (fm.fileExists(completePath)) {
	let localFile = fm.readString(completePath);
	let currentVersion = localFile.match(regexGetVersion)[1];

	newVersion = infoJson.moment.version;
	
	if (compVersion(currentVersion, newVersion)) {
		loop:
		while (true) {
			let a = new Alert();
			a.title = "New moment.js version found!";
			a.message = `${currentVersion.join(".")} ⇒ ${newVersion.join(".")}`;
			a.addCancelAction("Don't update");
			a.addAction("Update");
			a.addAction("Show Changelog");
			
			let res = await a.presentSheet();
			switch(res) {
				case -1: return;
				case 0: break loop;
				case 1:
					await Safari.openInApp(changelogUrl.replace("version", newVersion));
					break;
			}
		}
	} else {
		let a = new Alert();
		a.title = "You're up to date!";
		a.addCancelAction("Great!");
		a.presentAlert();
		return;
	}
} else {
	let folders = filePath.split('/');
	let filename = folders.pop();
	folders = fm.joinPath(fm.documentsDirectory(), folders.join('/'));
	
	if (!fm.fileExists(folders))
		fm.createDirectory(folders, true);
}

req = new Request(remoteUrl);
let remoteFile = await req.loadString();

fm.writeString(completePath, remoteFile);

let a = new Alert();
a.title = "Downloaded and saved file to:";
a.message = filePath;
a.addCancelAction("OK");
a.presentAlert();


function compVersion(a, b) {
	a = a.split(".").map(i => parseInt(i));
	b = b.split(".").map(i => parseInt(i));
	
	while (a.length < 3)
		a.push(0);
	while (b.length < 3)
		b.push(0);
	
	for (let i = 0; i < a.length; i++) {
		if (a[i] < b[i]) return -1;
		if (a[i] > b[i]) return 1;
	}
	return 0;
}

