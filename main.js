var app = require("electron").app,
    BrowserWindow = require("browser-window");

app.on("window-all-closed", function() {
  // if (process.platform != "darwin") {
  app.quit();
  // }
});

//Watch dir for changes and reload on changes
require('electron-reload')(__dirname+"/js/bundle.js");

// hold a global reference of the window object,
// otherwise the window will be closed when this object is GCed
var mainWindow = null;
app.on("ready", function() {
  // create main window
  // ref. https://github.com/atom/electron/blob/master/docs/api/browser-window.md
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    center: true,
    resizable: true,
    frame: true,
    transparent: false
  });

  // hide default menubar
  // mainWindow.setMenu(null);

  // load homepage
  var homepageUrl = "file://" + __dirname + "/index.html";
  mainWindow.loadURL(homepageUrl);

  // open Chromium DevTools
  mainWindow.openDevTools();
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
});
