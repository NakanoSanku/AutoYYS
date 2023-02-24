const { findImg } = require("../base/search");
const settlement = require("./settlement");
const 协作检测 = require("./协作检测");
const debug = require("../debug");

/**
 * 
 * @param {{
 * times:次数
 * speed:是否启用光速模式
 * settlementArray:自定义结算
 * screenshotLoad:截图根路径}} params 
 */
module.exports = function (params) {
    let screenshotLoad = params.screenshotLoad || './assets/img/';
    let challenge = { 'template': screenshotLoad + '业原火/业原火.bmp', 'isClick': true, 'region': [1060, 520, 1279, 719] };
    let settlementArray = params.settlementArray || [[10, 120, 250, 550], [1100, 50, 1280, 720]];
    let method = params.settlementArray != undefined ? 2 : 1;
    let settlement1 = {
        'imgConfig': { 'template': screenshotLoad + '公用/结算.bmp', 'region': [3, 3, 165, 718] },
        'method': method,
        'settlementArray': settlementArray
    }
    let times = params.times || 0;
    let i = 0;
    let start = Date.now();
    while (i < times) {
        debug({ start });
        findImg(challenge);
        if (settlement(settlement1)) {
            i++;
            start = Date.now();
            console.log('当前第' + i + '次结算');
        }
        if (params.speed) sleep(800);
        协作检测()
    }
}
