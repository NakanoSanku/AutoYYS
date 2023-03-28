const { smlMove, randomClick, createPoint } = require("../base/base");
const { findImg } = require("../base/search");
const readConfig = require("../readConfig");
const settlement = require("./settlement");
const 协作检测 = require("./协作检测");

/**
 * 探索模块
 * @param {{
 * times:次数}} params
 */
module.exports = function (params) {
  let config = readConfig();
  var mark = 0;
  var i = 0;
  var smlMoveTimes = 0;
  while (i < params.times) {
    config.chapter.isClick = false;
    if (findImg(config.chapter)) {
      if (!findImg(config.chest)) {
        config.chapter.isClick = true;
        if (findImg(config.chapter)) {
          sleep(500);
          console.info("选择章节");
        }
      }
    }
    if (findImg(config.exploreButton)) {
      sleep(500);
      console.info("进入探索");
    }
    if (findImg(config.formula) && mark == 0) {
      if (findImg(config.boss)) {
        smlMoveTimes = 0;
        config.boss.isClick = false;
        sleep(1000);
        if (!findImg(config.boss)) {
          console.info("探索完成");
          mark = 1;
        }
        config.boss.isClick = true;
      } else if (findImg(config.mob)) {
        smlMoveTimes = 0;
        sleep(1000);
      } else {
        firstPoint = createPoint([1000, 115, 1100, 210]);
        lastPoint = createPoint([500, 115, 600, 210]);
        smlMove(
          firstPoint.x,
          firstPoint.y,
          lastPoint.x,
          lastPoint.y,
          random(400, 500)
        );
        smlMoveTimes++;
        if (smlMoveTimes == 5) {
          mark = 1;
          smlMoveTimes = 0;
        }
        console.log("滑动");
      }
    }
    if (settlement(config.settlement3)) {
      i++;
      console.info(i + "次结算完成");
    }
    if (mark == 1 && findImg(config.formula)) {
      randomClick({ region: [27, 38, 65, 91] });
      mark = 0;
      sleep(1500);
    }
    if (findImg(config.exitButton)) sleep(1000);
    if (config.speed) sleep(config.delayTime);
    协作检测();
  }
  //回
  while (true) {
    if (findImg(config.formula)) randomClick({ region: [27, 38, 65, 91] });
    协作检测();
    findImg(config.exitButton);
    let close = {
      template: "./assets/img/公用/退出.bmp",
      region: [1000, 110, 1100, 195],
      isClick: true,
    };
    if (findImg(close)) {
      sleep(2000);
      if (!findImg(close)) return;
    }
  }
};
