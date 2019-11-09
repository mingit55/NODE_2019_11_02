
const fs = require("fs"); // Node.js의 파일 시스템 약자


/* 비동기적 방법 */
// fs.readFile("champ.json", "utf8", (err, data) => {
//     console.log(data);
// });

/* 동기적 방법 */
let json = JSON.parse(fs.readFileSync("old_champion.json", "utf-8")).data;
let champList = {};
Object.keys(json).forEach(x => {
    champList[json[x].key] = {"id": json[x].id, "name": encodeURI(json[x].name), "image": "champion/" + json[x].image.full};
});


fs.writeFileSync("champion.json", JSON.stringify(champList), "utf8");