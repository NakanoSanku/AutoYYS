const { smlMove, randomClick } = require("../core/actions");
const { findImg } = require("../core/game");
const settlement = require("./settle");


module.exports = function (params) {
    let failRegion = [[663,128,755,236],
    [1003,131,1088,233],
    [667,261,751,372],
    [1002,264,1091,366],
    [670,403,751,501],
    [1008,403,1088,498],
    [667,536,751,633],
    [1005,531,1092,638]
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
    let record = { 'template': './img/突破/寮突/寮突记录.bmp', 'region': [20, 595, 181, 715] }
    var failure = { 'template': './img/突破/寮突/寮突失败.bmp' };
    let close = { 'template': './img/公用/退出.bmp', 'region': [1157, 74, 1259, 183]}
    let breakthrough = { 'template': './img/探索/探索章节选择.bmp', 'region': [200, 610, 415, 719], 'region': [1035, 543, 1273, 676] }
    let 阴阳寮 = { 'template': './img/突破/寮突/寮突.bmp', 'region': [1175, 339, 1277, 491]}
    let formula = { 'template': './img/公用/式神录.bmp', 'region': [1175, 578, 1279, 700], 'isColor': true, 'colorThreshold': 8 }
    let attack = { 'template': './img/突破/进攻.bmp'}
    params = params || {};
    let settlementArray = params.settlementArray || [[10, 120, 250, 550], [1100, 50, 1280, 720]];
    let method = params.settlementArray != undefined ? 2 : 1;
    let settlement1 = {
        'imgConfig': { 'template': './img/公用/结算一.bmp', 'region': [330, 79, 645, 351], 'isColor': true, 'threshold': 0.6 },
        'method': method,
        'settlementArray': settlementArray
    }
    let settlement2 = {
        'imgConfig': { 'template': './img/公用/结算二.bmp', 'region': [442, 358, 843, 684], 'threshold': 0.6 },
        'method': method,
        'settlementArray': settlementArray
    }
    let fail = {
        'imgConfig': { 'template': './img/公用/失败结算.bmp', 'region': [330, 79, 645, 351], 'isColor': true, 'threshold': 0.6 },
        settlementArray: [
            [10, 120, 250, 550],
            [1100, 50, 1280, 720],
        ]
    }
    let beat = { 'template': './img/突破/已突破.bmp', 'threshold': 0.6 }
    var isBeat = false
    while (true) {
        if (findImg(record)) break;
        if (findImg(breakthrough)) {
            randomClick({ region: [250, 640, 300, 690] });
        };
        findImg(阴阳寮,true);
        sleep(500);
    }
    while (true) {
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
        if (findImg(attack,true)) {
            sleep(5000);
            if (findImg(attack)) break;
        };
        settlement(fail);
        settlement(settlement1);
        settlement(settlement2);
        if (isBeat) break;
        sleep(800);
    }
    while (true) {
        if (findImg(close,true)) {
            sleep(3000);
            if (!findImg(close)) return true;
        }
    }
}