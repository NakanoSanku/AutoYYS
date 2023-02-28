const { findImg } = require("../base/search");
const debug = require("../debug");
const settlement = require("./settlement");
const 协作检测 = require("./协作检测");
/**
 *
 * @param {{
 * times:次数
 * speed:是否启用光速模式
 * screenshotLoad:截图根路径
 * settlementArray:自定义结算}} params
 */
module.exports = function (params) {
  let delayTime = params.delayTime || 800;
  let screenshotLoad = params.screenshotLoad || "./assets/img/";
  let challenge = {
    template: screenshotLoad + "活动/活动.bmp",
    isClick: true,
    region: [800, 400, 1279, 719],
  };
  let settlementArray = params.settlementArray || [
    [10, 120, 250, 550],
    [1100, 50, 1280, 720],
  ];
  let method = params.settlementArray != undefined ? 2 : 1;
  let settlement1 = {
    imgConfig: {
      template: screenshotLoad + "公用/结算一.bmp",
      region: [330, 79, 645, 351],
    },
    method: method,
    settlementArray: settlementArray,
  };
  let settlement2 = {
    imgConfig: {
      template: screenshotLoad + "公用/结算二.bmp",
      region: [442, 358, 843, 684],
    },
    method: method,
    settlementArray: settlementArray,
  };
  let times = params.times || 0;
  let i = 0;
  let start = Date.now();
  while (i < times) {
    debug({ start });
    findImg(challenge);
    settlement(settlement2); //结算二
    if (settlement(settlement1)) {
      i++;
      start = Date.now();
      console.log("当前第" + i + "次结算");
    } //结算一
    if (params.speed) sleep(delayTime);
    协作检测();
  }
};
