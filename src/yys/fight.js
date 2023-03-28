const { findImg } = require("../base/search");
const readConfig = require("../readConfig");
const settlement = require("./settlement");
const 协作检测 = require("./协作检测");
/**
 *
 * @param {{
 * mode: 模式
 * times:次数
 * leader:是否为御魂队长
 * configPath:配置文件地址}} params
 */
module.exports = function (params) {
  let config = readConfig();
  let times = params.times || 0;
  let i = 0;
  function settlementDouble() {
    settlement(config.settlement2); //结算二
    if (settlement(config.settlement1)) {
      i++;
      console.log("当前第" + i + "次结算");
    } //结算一
  }
  function settlementOnce() {
    if (settlement(config.settlement3)) {
      i++;
      console.log("当前第" + i + "次结算");
    }
  }
  while (i < times) {
    if (params.leader | (params.mode != "soul"))
      findImg(eval("config." + params.mode));
    if ((params.mode == "soul") | (params.mode == "fire")) {
      settlementOnce();
    } else if (params.mode == "spirit") {
      settlementDouble();
    }
    if (config.speed) sleep(config.delayTime);
    协作检测();
  }
};
