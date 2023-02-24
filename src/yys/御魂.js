const { findImg } = require("../base/search");
const settlement = require("./settlement");
const 协作检测 = require("./协作检测");
const debug = require("../debug");

/**
 * 
 * @param {{
 * times:次数
 * leader:是否为队长
 * speed:是否启用光速模式
 * settlementArray:自定义结算
 * screenshotLoad:截图根路径}} params 
 */
module.exports = function (params) {
    let delayTime = params.delayTime || 800;
    let screenshotLoad = params.screenshotLoad || './assets/img/';
    let challenge = { 'template': screenshotLoad + '御魂/挑战.bmp', 'isClick': true, 'isColor': true, 'region': [1129, 568, 1279, 719] };
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
        if (params.leader) findImg(challenge);
        if (settlement(settlement1)) {
            i++;
            start = Date.now();
            console.log('当前第' + i + '次结算');
        }
        if (params.speed) sleep(delayTime);
        协作检测()
    }
}
