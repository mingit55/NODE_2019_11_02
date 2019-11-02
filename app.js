/**
 * Node :: LOL 닉네임으로 전적 검색하기
 */


const req = require('request');
let originChamData = require("./champion.json");
let chamData = Object.keys(originChamData.data).map(x => originChamData.data[x]);

const summonerUrl = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';;
const name = encodeURIComponent("위대한 트린");
const key = 'RGAPI-d5ed5d04-6607-4753-b746-5935ab5722d8';

req.get(`${summonerUrl+name}?api_key=${key}`, (err, res, body) => {
    const data = JSON.parse(body);
    let accId = data.accountId;

    const matchUrl = `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/`;
    req.get(`${matchUrl+accId}?api_key=${key}`, (err, res, body) => {
        let data = JSON.parse(body).matches;
        data = data.slice(0, 10).map(x => {
            // x.champion = chamData.find( i => i.)
            x.timestamp = new Date(x.timestamp);
            return x;
        });
        console.log(data);
    });
});