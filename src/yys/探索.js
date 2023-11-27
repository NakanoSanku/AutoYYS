const { smlMove } = require("../core/actions");
const { findImg } = require("../core/game");
const { generateRandomPoint } = require("../core/utils");
const 结算 = require("../tasks/结算");
const 退出粉色叉界面 = require("../tasks/退出粉色叉界面");

const filePath = "./src/config/探索.json";
let config = JSON.parse(files.read(filePath));
//退出探索函数
function exitExplore() {
  while (true) {
    if (findImg(config.探索_退出, true)) {
      sleep(1500);
      if (findImg(config.探索_退出确认, true)) sleep(1000);
      return;
    }
    sleep(800);
  }
}

module.exports = function (times, delayTime) {
  let mark = 0; let i = 0; let smlMoveTimes = 0;
  const w = device.width > device.height ? device.width : device.height;
  const h = device.width > device.height ? device.height : device.width;
  while (i < times) {
    //探索章节选择并检测宝箱
    if (findImg(config.章节选择) && !findImg(config.宝箱, true) && findImg(config.章节选择, true)) {
      sleep(500);
      console.info("选择章节");
    }
    //探索按钮检测
    if (findImg(config.探索按钮, true)) {
      sleep(500);
      console.info("进入探索");
      mark = 0;
    }
    //检测式神录
    if (findImg(config.式神录)) {
      //检查boss是否打完，是则退出探索
      if (mark === 1) exitExplore();
      //找怪打
      if (mark === 0) {
        //检测boss
        if (findImg(config.大怪, true)) {
          smlMoveTimes = 0;
          sleep(1000);
          if (!findImg(config.大怪)) {
            console.info("探索完成");
            mark = 1;
          }
          //检测小怪
        } else if (findImg(config.小怪, true)) {
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
    }
    //检测结算
    if (结算('view', {})) console.info(`${++i}次结算完成`);
    //休息
    sleep(delayTime);
  }
  //退出探索
  exitExplore();
  //关闭章节选择
  退出粉色叉界面();
};
