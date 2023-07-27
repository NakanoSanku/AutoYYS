const { findImg } = require("../core/game");
const { enlargeRegion } = require("../core/utils");
const settle = require("./settle");

/**
 *
 * @param {str} mode
 * @param {int} times
 * @param {{
 * delayTime:int,
 * isSpeed:boolean,
 * leader:boolean
 * }} params
 * - mode 模式选择 "御魂" "御灵" "业原火"
 * - times 次数
 * - params 可选参数
 *   - delayTime:延迟 默认800ms
 *   - isSpeed:是否启用延迟 默认true
 *
 *   - leader:是否为御魂队长 默认false
 */
module.exports = function (mode, times, params) {
  let filePath = "./yys.json";
  if (storages.create("todoList").get("configPath") && storages.create("todoList").get("configPath") !== "") {
    filePath = storages.create("todoList").get("configPath")
  }
  let json = JSON.parse(files.read(filePath));
  const delayTime = params.delayTime || 800;
  const isSpeed = params.isSpeed || true;
  const leader = params.leader || false;
  const w = device.width > device.height ? device.width : device.height;
  const h = device.width > device.height ? device.height : device.width;
  json.settleView.imgConfig.region = [0, 0, Math.ceil(w / 6), h];
  let i = 0;
  while (i < times) {
    //战斗按钮
    if (leader || mode !== "御魂") {
      let p = findImg(eval("json." + mode), true);
      if (p) {
        eval("json." + mode).region =
          eval("json." + mode).region || enlargeRegion(p, w, h);
      }
    }
    //结算
    if (mode === "御魂" || mode === "业原火") {
      let p = settle(json.settleView);
      if (p) {
        i++;
        console.info(`${++i}次结算完成`);
      }
    } else if (mode === "御灵") {
      let p = settle(json.settleWin);
      if (p)
        json.settleWin.imgConfig.region =
          json.settleWin.imgConfig.region || enlargeRegion(p, w, h);
      p = settle(json.settleReward);
      if (p) {
        console.info(`${++i}次结算完成`);
        json.settleReward.imgConfig.region =
          json.settleReward.imgConfig.region || enlargeRegion(p, w, h);
      }
    }
    if (isSpeed) sleep(delayTime);
  }
  //写入配置文件
  files.write(filePath, JSON.stringify(json), "utf-8");
};