/**
 * Node :: LOL 닉네임으로 전적 검색하기
 */

const req = require('request');
const champData = require("./champion.json");

class LolApi {
    constructor(){
        this.key = 'RGAPI-ca1d58de-a10f-4961-bbff-9525d5610eb4';
    }

    
    loadRecord(name){
        return new Promise(resolve => {
            const summonerUrl = 'https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/';

            req.get(`${summonerUrl+name}?api_key=${this.key}`, (err, res, body) => {
                const udata = JSON.parse(body);

                if(!udata.accountId){
                    resolve(false);
                    return;
                }

                let accId = udata.accountId;

                const matchUrl = `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/`;
                req.get(`${matchUrl+accId}?api_key=${this.key}`, (err, res, body) => {
                    let data = JSON.parse(body).matches;
                    console.log(data);
                    // .slice(0, 10)
                    data = data.map(x => {
                        x.champion = champData[x.champion];
                        return x;
                    });
                    resolve({"summoner": udata,"record": data});
                });
            });
        });
    }
}

module.exports = LolApi;