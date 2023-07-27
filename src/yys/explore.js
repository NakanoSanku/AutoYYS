const { smlMove } = require("../core/actions");
const { findImg } = require("../core/game");
const { generateRandomPoint, enlargeRegion } = require("../core/utils");
const settle = require("./settle");

/**
 * 探索模块
 * @param {{
 * times:次数
 * settlementArray:自定义结算
 * speed:是否启用光速模式
 * screenshotLoad:截图根路径}} params
 */
module.exports = function (times, speed, delayTime) {
  const filePath = "./yys.json";
  if (storages.create("todoList").get("configPath") && storages.create("todoList").get("configPath") !== "") {
    filePath = storages.create("todoList").get("configPath")
  }
  let json = JSON.parse(files.read(filePath));
  let mark = 0;
  let i = 0;
  let p = null;
  const w = device.width > device.height ? device.width : device.height;
  const h = device.width > device.height ? device.height : device.width;
  json.settleView.imgConfig.region = [0, 0, Math.ceil(w / 6), h];
  let smlMoveTimes = 0;
  console.log(w, h);
  while (i < times) {
    //探索章节选择并检测宝箱
    p = findImg(json.chapter);
    if (p && !findImg(json.chest, true) && findImg(json.chapter, true)) {
      json.chapter.region = json.chapter.region || enlargeRegion(p, w, h);
      sleep(500);
      console.info("选择章节");
    }
    //探索按钮检测
    p = findImg(json.exploreButton, true);
    if (p) {
      json.exploreButton.region =
        json.exploreButton.region || enlargeRegion(p, w, h);
      sleep(500);
      console.info("进入探索");
    }
    //探索打怪检测式神录
    p = findImg(json.formula);
    if (p && mark == 0) {
      //检测boss
      json.formula.region = json.formula.region || enlargeRegion(p, w, h);
      if (findImg(json.boss, true)) {
        smlMoveTimes = 0;
        sleep(1000);
        if (!findImg(json.boss)) {
          console.info("探索完成");
          mark = 1;
        }
        //检测小怪
      } else if (findImg(json.mob, true)) {
        smlMoveTimes = 0;
        sleep(1000);
        //滑动
      } else {
        firstPoint = generateRandomPoint([
          Math.floor((25 / 32) * w),
          Math.floor((1 / 6) * h),
          Math.ceil((55 / 64) * w),
          Math.ceil((1 / 6) * h),
        ]);
        lastPoint = generateRandomPoint([
          Math.floor((25 / 64) * w),
          Math.floor((1 / 8) * h),
          Math.ceil((15 / 32) * w),
          Math.ceil((21 / 128) * h),
        ]);
        smlMove(
          firstPoint.x,
          firstPoint.y,
          lastPoint.x,
          lastPoint.y,
          random(350, 400)
        );
        smlMoveTimes++;
        if (smlMoveTimes == 5) {
          mark = 1;
          smlMoveTimes = 0;
        }
        console.info("滑动");
      }
    }
    //检测结算
    if (settle(json.settleView)) console.info(`${++i}次结算完成`);
    //退出探索
    if (mark == 1) {
      if (findImg(json.exit, true)) {
        mark = 0;
        sleep(1500);
      }
    }
    p = findImg(json.exitButton, true);
    if (p) {
      json.exitButton.region = json.exitButton.region || enlargeRegion(p, w, h);
      sleep(1000);
    }
    if (speed) sleep(delayTime);
  }
  //回
  let j = 0;
  while (true) {
    findImg(json.exitButton, true);
    findImg(json.close, true);
    if (findImg(json.chapter)) {
      j++;
    } else {
      if (findImg(json.formula)) findImg(json.exit, true);
    }
    if (j > 5) {
      files.write(filePath, JSON.stringify(json), "utf-8");
      return;
    }
    sleep(500)
  }
};
