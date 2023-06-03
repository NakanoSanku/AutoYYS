const { randomClick } = require("../core/actions");
const { findImg } = require("../core/game");
const { enlargeRegion } = require("../core/utils");
const settle = require("./settle");



module.exports = function () {
  const w = device.width > device.height ? device.width : device.height;
  const h = device.width > device.height ? device.height : device.width;
  const filePath = "./yys.json";
  if (storages.create("todoList").get("configPath") && storages.create("todoList").get("configPath") !== "") {
    filePath = storages.create("todoList").get("configPath")
  }
  let json = JSON.parse(files.read(filePath));
  const Breach = json.breach;
  let numberOfFailures = 0;
  let numberOfVictory = 0;
  let index = 0;
  let res = true;
  let p = null;
  while (true) {
    p = findImg(json.presonBreakthrough, true);
    if (p) {
      json.presonBreakthrough.region =
        json.presonBreakthrough.region || enlargeRegion(p, w, h);
      sleep(500);
      break;
    }
    p = findImg(json.breakthrough, true);
    if (p) {
      json.breakthrough.region =
        json.breakthrough.region || enlargeRegion(p, w, h);
    }
    sleep(500);
  }
  console.info("突破界面");
  while (true) {
    if ((numberOfVictory < 3 && numberOfFailures > 0) || numberOfFailures > 4) {
      while (true) {
        p = findImg(json.refresh, true);
        if (p) {
          json.refresh.region = json.refresh.region || enlargeRegion(p, w, h);
          console.info("刷新");
        }
        p = findImg(json.confirmRefresh, true);
        if (p) {
          json.confirmRefresh.region =
            json.confirmRefresh.region || enlargeRegion(p, w, h);
          sleep(2000);
          if (!findImg(json.confirmRefresh)) {
            sleep(1000);
            break;
          }
        }
      }
      numberOfVictory = 0;
      numberOfFailures = 0;
      console.info("重置");
    }
    p = findImg(json.tupo_formula);
    if (p) {
      json.tupo_formula.region =
        json.tupo_formula.region || enlargeRegion(p, w, h);
      if (res) {
        for (index = 0; index < Breach.length; index++) {
          json.beat.region = Breach[index];
          if (findImg(json.beat)) numberOfVictory++;
        }
        //自动初始化已突破数量
        console.info("当前已突破个数" + numberOfVictory);
        res = false;
      }
      for (index = 0; index < Breach.length; index++) {
        json.beat.region = Breach[index];
        if (!findImg(json.beat)) {
          randomClick({ region: Breach[index] });
          sleep(500);
          break;
        }
      }
    }
    if (numberOfVictory == 8 && numberOfFailures < 4) {
      p = findImg(json.tupo_exit, true);
      if (p){
        json.tupo_exit.region = json.tupo_exit.region || enlargeRegion(p, w, h);
        sleep(500)
      }
      p = findImg(json.exitConfirm, true);
      if (p) {
        json.exitConfirm.region =
          json.exitConfirm.region || enlargeRegion(p, w, h);
        sleep(2000);
      }
    }
    if (numberOfVictory == 9) {
      numberOfVictory = 0;
      numberOfFailures = 0;
      console.info("重置");
    }
    p = findImg(json.attack, true);
    if (p) {
      sleep(3000);
      if (findImg(json.attack)) break;
    }
    if (!(numberOfVictory == 8 && numberOfFailures < 4)) {
      p = findImg(json.ready, true);
      if (p) json.ready.region = json.ready.region || enlargeRegion(p, w, h);
    }
    p = settle(json.settleWin);
    if (p) {
      json.settleWin.imgConfig.region =
        json.settleWin.imgConfig.region || enlargeRegion(p, w, h);
      numberOfVictory++;
    }
    p = settle(json.settleReward);
    if (p) {
      json.settleReward.imgConfig.region =
        json.settleReward.imgConfig.region || enlargeRegion(p, w, h);
    }
    p = settle(json.settleFail);
    if (p) {
      json.settleFail.imgConfig.region =
        json.settleFail.imgConfig.region || enlargeRegion(p, w, h);
      numberOfFailures++;
    }
    sleep(500);
  }
  while (true) {
    p = findImg(json.tupo_close, true);
    if (p) {
      json.tupo_close.region = json.tupo_close.region || enlargeRegion(p, w, h);
      sleep(3000);
      if (!findImg(json.tupo_close)) {
        files.write(filePath, JSON.stringify(json), "utf-8");
        return numberOfVictory;
      }
    }
    sleep(500);
  }
};
