const { smlMove, randomClick } = require("../base/base");
const { findImg } = require("../base/search");
const settlement = require("./settlement");
const 协作检测 = require("./协作检测");

module.exports = function (params) {
    let failRegion = [[673, 123, 758, 203],
    [1003, 122, 1100, 209],
    [664, 259, 763, 340],
    [1000, 260, 1102, 339],
    [667, 394, 764, 474],
    [1002, 395, 1107, 482],
    [668, 532, 763, 612],
    [1010, 529, 1111, 615]
    ];
    let clickRegion = [[513, 140, 743, 262],
    [856, 141, 1080, 259],
    [511, 276, 742, 394],
    [851, 276, 1079, 397],
    [512, 412, 742, 531],
    [849, 412, 1079, 531],
    [510, 547, 742, 643],
    [848, 546, 1082, 647]
    ];
    let record = { 'template': './assets/img/突破/寮突/寮突记录.bmp', 'region': [20, 595, 181, 715] }
    var failure = { 'template': './assets/img/突破/寮突/寮突失败.bmp' };
    let close = { 'template': './assets/img/公用/退出.bmp', 'region': [1157, 74, 1259, 183], 'isClick': true }
    let breakthrough = { 'template': './assets/img/探索/探索章节选择.bmp', 'region': [200, 610, 415, 719], 'region': [1035, 543, 1273, 676] }
    let 阴阳寮 = { 'template': './assets/img/突破/寮突/寮突.bmp', 'region': [1175, 339, 1277, 491], 'isClick': true }
    let formula = { 'template': './assets/img/公用/式神录.bmp', 'region': [1175, 578, 1279, 700], 'isColor': true, 'colorThreshold': 8 }
    let attack = { 'template': './assets/img/突破/进攻.bmp', 'isClick': true }
    params = params || {};
    let settlementArray = params.settlementArray || [[10, 120, 250, 550], [1100, 50, 1280, 720]];
    let method = params.settlementArray != undefined ? 2 : 1;
    let settlement1 = {
        'imgConfig': { 'template': './assets/img/公用/结算一.bmp', 'region': [330, 79, 645, 351], 'isColor': true, 'threshold': 0.6 },
        'method': method,
        'settlementArray': settlementArray
    }
    let settlement2 = {
        'imgConfig': { 'template': './assets/img/公用/结算二.bmp', 'region': [442, 358, 843, 684], 'threshold': 0.6 },
        'method': method,
        'settlementArray': settlementArray
    }
    let fail = {
        'imgConfig': { 'template': './assets/img/公用/失败结算.bmp', 'region': [330, 79, 645, 351], 'isColor': true, 'threshold': 0.6 },
        'method': method,
        'settlementArray': settlementArray
    }
    let beat = { 'template': './assets/img/突破/已突破.bmp', 'threshold': 0.6 }
    var isBeat = false
    while (true) {
        if (findImg(record)) break;
        if (findImg(breakthrough)) {
            randomClick({ region: [250, 640, 300, 690] });
        };
        findImg(阴阳寮);
        sleep(500);
    }
    while (true) {
        协作检测();
        if (findImg(formula)) {
            sleep(500);
            for (let index = 0; index < failRegion.length; index++) {
                failure.region = failRegion[index];
                if (!findImg(failure)) {
                    beat.region = failRegion[index];
                    isBeat = findImg(beat);
                    if (isBeat) break;
                    randomClick({ 'region': clickRegion[index] });
                    sleep(500);
                    break;
                }
                if (index == (failRegion.length - 1)) {
                    smlMove(749, 642, 746, 225, 750);
                }
            }
        }
        if (findImg(attack)) {
            sleep(5000);
            attack.isClick = false;
            if (findImg(attack)) break;
            attack.isClick = true;
        };
        settlement(fail);
        settlement(settlement1);
        settlement(settlement2);
        if (isBeat) break;
        sleep(800);
    }
    while (true) {
        协作检测();
        if (findImg(close)) {
            sleep(3000);
            if (!findImg(close)) return true;
        }
    }
}