const { smlMove, randomClick } = require("../base/base");
const { findImg } = require("../base/search");
const settlement = require("./settlement");
const 协作检测 = require("./协作检测");



/**
 * 探索模块
 * @param {{
 * times:次数
 * settlementArray:自定义结算
 * speed:是否启用光速模式
 * screenshotLoad:截图根路径}} params 
 */
module.exports = function (params) {
    let screenshotLoad = params.screenshotLoad || './assets/img/';
    let chapter = { 'template': screenshotLoad + '探索/探索章节选择.bmp', 'region': [1035, 543, 1273, 676], 'isClick': true }
    let exploreButton = { 'template': screenshotLoad + '探索/探索按钮.bmp', 'region': [858, 479, 1039, 598], 'isClick': true }
    let exitButton = { 'template': screenshotLoad + '探索/确认.bmp', 'region': [670, 349, 896, 460], 'isClick': true }
    let formula = { 'template': screenshotLoad + '公用/式神录.bmp', 'region': [764, 609, 861, 710] }
    let mob = { 'template': screenshotLoad + '探索/小怪.bmp', 'isClick': true }
    let boss = { 'template': screenshotLoad + '探索/大怪.bmp', 'isClick': true }
    let chest = { 'template': screenshotLoad + '探索/宝箱.bmp', 'isClick': true }
    let method = params.settlementArray != undefined ? 2 : 1;
    var settlementArray = params.settlementArray || [[10, 120, 250, 600], [1100, 50, 1280, 720]];
    let settlement1 = {
        'imgConfig': { 'template': screenshotLoad + '公用/结算.bmp', 'region': [3, 3, 165, 718] },
        'method': method,
        'settlementArray': settlementArray
    }
    var mark = 0;
    var i = 0;
    while (i < params.times) {
        chapter.isClick = false;
        if (findImg(chapter)) {
            if (!findImg(chest)) {
                chapter.isClick = true;
                if (findImg(chapter)) {
                    sleep(500);
                    console.info('选择章节');
                }
            }
        }
        if (findImg(exploreButton)) {
            sleep(500);
            console.info('进入探索');
        }
        if (findImg(formula)&&mark==0) {
            if (findImg(boss)) {
                boss.isClick = false;
                sleep(1000);
                if (!findImg(boss)) {
                    console.info('探索完成');
                    mark=1;
                }
                boss.isClick = true;
            } else if (findImg(mob)) {
                sleep(1000);
            } else {
                smlMove(random(1000, 1100), random(115, 210), random(500, 600), random(115, 210), random(400, 500));
                console.log("滑动");
            }
        }
        
        if (settlement(settlement1)) {
            i++;
            console.info(i + '次结算完成');
        };
        if (mark == 1 && findImg(formula)) {
            randomClick({ 'region': [27, 38, 65, 91] });
            mark = 0;
            sleep(1500);
        }
        if (findImg(exitButton)) sleep(1000);
        if (params.speed) sleep(800);
        协作检测()
    }
    //回
    while (true) {
        if (findImg(formula)) randomClick({ 'region': [27, 38, 65, 91] })
        协作检测()
        findImg(exitButton);
        let close = { 'template': screenshotLoad + '公用/退出.bmp', 'region': [1000, 110, 1100, 195], 'isClick': true }
        if (findImg(close)) {
            sleep(2000);
            if (!findImg(close)) return;
        };
    }
}