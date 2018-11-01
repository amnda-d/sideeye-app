"use strict";

import { app, BrowserWindow } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import child_process from "child_process";

const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow;
let py;

function createMainWindow() {
  const window = new BrowserWindow();

  if (isDevelopment) {
    window.webContents.openDevTools();
  }

  if (isDevelopment) {
    child_process.exec(
      `chmod +x ${path.join(__static, "apidist/api/api")}`,
      () => {
        py = child_process.execFile(path.join(__static, "apidist/api/api"));
      }
    );
  } else {
    child_process.exec(
      `chmod +x ${path.join(process.resourcesPath, "static/apidist/api/api")}`,
      () => {
        py = child_process.execFile(
          path.join(process.resourcesPath, "static/apidist/api/api")
        );
      }
    );
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true
      })
    );
  }

  window.on("closed", () => {
    py.kill("SIGTERM");
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

app.on("ready", () => {
  mainWindow = createMainWindow();
});
