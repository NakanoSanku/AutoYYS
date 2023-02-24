const { findImg } = require("../base/search");
const readJson = require("../readJson");
const settlement = require("./settlement");
const 协作检测 = require("./协作检测");
/**
 * 
 * @param {{
 * configPath:
 * method
 * settlementArray}} params 
 */
module.exports = function (params) {
    let configPath = params.configPath || './src/config/活动.json';
    let config = readJson(configPath);
    config.settlement.method = params.method || config.settlement.method;
    if (config.settlement.method == 2) config.settlement.settlementArray = params.settlementArray || config.settlement.settlementArray;
    let i = 0;
    while (i < config.times) {
        if (findImg(config.challenge)) sleep(2000);
        if (settlement(config.settlement)) {
            i++;
            console.log('当前第' + i + '次结算');
        }
        协作检测();
    }
} 