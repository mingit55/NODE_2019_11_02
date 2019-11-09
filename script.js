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
    
    nameInput.addEventListener("keydown", e => {
        if(e.keyCode === 13) {
            searchBtn.click();
        }
    });

    searchBtn.addEventListener("click", () => {
        let str = encodeURI(nameInput.value);
        ipcRenderer.send("summoner", { name: str });
    });

    
});

ipcRenderer.on("data", (e, data) => {
    if(data === false) return alert("해당 소환사가 존재하지 않습니다.");

    const summonerBox = document.querySelector("#summoner");
    summonerBox.innerHTML = summonerTemplate(data.summoner);
    summonerBox.style.display = "flex";

    const recordBox = document.querySelector("#record");
    recordBox.style.display = "flex";

    recordBox.innerHTML = "";
    data.record.forEach(x => {
        let elem = document.createElement("div");
        elem.classList.add("item");
        elem.innerHTML= recordTemplate(x);
        recordBox.append(elem);
    });
});

function summonerTemplate(s){
    return  `<div class="image">
                <img src="profileicon/0.png" alt="profile-Icon">
            </div>
            <div class="info">
                <p>소환사 명 : <span class="name">${s.name}</span></p>
                <p>소환사 레벨 : <span class="level">${s.summonerLevel}</span></p>
                <p>최종 갱신일 : <span class="update">${parseYmd(new Date(s.revisionDate))}</span></p>
            </div>`;
}


function recordTemplate(x){
    return `<img src="${x.champion.image}" alt="Zed" width="100" height="100">
                <div class="info">
                    <span class="platform">${x.platformId}</span>
                    <div>
                        <span class="role">${x.role}</span>
                        <span class="lane">${x.lane}</span>
                        <span class="champion">${decodeURI(x.champion.name)}</span>
                    </div>
                    <div>
                        <span class="season">${x.season}시즌</span><br>
                        <span class="timestamp">${parseYmd(new Date(x.timestamp))}</span>
                    </div>
                </div>`;
}

function parseYmd(date){
    let month = date.getMonth();
    let day = date.getDate();

    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    month = month + 1 < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    return `${date.getFullYear()}년 ${month}월 ${day}일 ${hour}:${min}:${sec}`;
}

