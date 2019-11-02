const {ipcRenderer} = require("electron");

// ipcRenderer => Chrome의 통신장치
// ipcMain => Electron의 통신장치


window.addEventListener("keydown", e => {
    if(e.ctrlKey && e.key.toLowerCase() == "q") {
        ipcRenderer.send("openDev");
    }
});

window.addEventListener("load", () => {
    const nameInput = document.querySelector("#txtName");
    const searchBtn = document.querySelector("#search");
    
    searchBtn.addEventListener("click", () => {
        let str = nameInput.value;
        ipcRenderer.send("summoner", { name: str });
    });
});