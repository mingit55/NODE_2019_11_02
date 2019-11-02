/**
 * Electron Script
 */

const {app, BrowserWindow, ipcMain, Menu} = require("electron");

const option = {
    width: 1200,
    height: 600,
    resizable: false, // 창 크기 조절 불가능
    webPreferences: {
        nodeIntegration: true, // Chrome + Node 크롬 브라우저에서 Node를 사용할 수 있게 해줌
        nativeWindowOpen: true, // 해당 운영 체제에서 띄우는 기본 창들을 사용할 수 있게 해주는 옵션
    },
};

let win = null;


// app :: 일렉트론 객체
// 

app.on("ready", () => {
    Menu.setApplicationMenu(null);
    win = new BrowserWindow(option);
    win.loadFile("index.html");
});

ipcMain.on("openDev", () => {
    win.webContents.openDevTools();
}); 

ipcMain.on("summoner", (e, data) => {
    let s_name = data.name;
});