const { randomClick } = require("../core/actions");
const { findImg } = require("../core/game");
const 准备 = require("../tasks/准备");
const 结算 = require("../tasks/结算");
const 进入突破界面 = require("../tasks/进入突破界面");
const 退出突破界面 = require("../tasks/退出粉色叉界面");


const filePath = "./src/config/个人突破.json";
let config = JSON.parse(files.read(filePath));
const Breach = config.个人突破矩阵;

/**
 * 个人突破
 * @param {boolean} isEnsureLevel 是否保级
 */
module.exports = function (isEnsureLevel) {
  let numberOfFailures = 0;
  let numberOfVictory = 0;
  let index = 0;
  let res = true;
  let isEnsureLevel = isEnsureLevel || true;
  //进入突破界面
  进入突破界面('个突');
  while (true) {
    //重置胜利和失败次数
    if (numberOfVictory === 9) {
      numberOfVictory = 0;
      numberOfFailures = 0;
      console.info("重置胜利和失败次数");
    }
    //刷新逻辑
    if ((numberOfVictory < 3 && numberOfFailures > 0) || numberOfFailures > 4) {
      while (true) {
        if (findImg(config.刷新, true)) console.info("刷新");
        if (findImg(config.刷新确认, true)) {
          sleep(2000);
          if (!findImg(config.刷新确认)) {
            sleep(1000);
            break;
          }
        }
      }
      numberOfVictory = 0;
      numberOfFailures = 0;
      console.info("重置胜利和失败次数");
    }
    //选择攻击对象
    if (findImg(config.式神录)) {
      sleep(1000);
      if (res) {
        for (index = 0; index < Breach.length; index++) {
          config.个突_已突破.region = Breach[index];
          if (findImg(config.个突_已突破)) numberOfVictory++;
        }
        //自动初始化已突破数量
        console.info("当前已突破个数" + numberOfVictory);
        res = false;
      }
      for (index = 0; index < Breach.length; index++) {
        config.个突_已突破.region = Breach[index];
        if (!findImg(config.个突_已突破)) {
          randomClick({ region: Breach[index] });
          sleep(500);
          break;
        }
      }
    }
    //进攻
    if (findImg(config.个突_进攻, true)) {
      sleep(3000);
      if (findImg(config.个突_进攻)) break;
    }
    //准备逻辑
    if (!isEnsureLevel || !(numberOfVictory === 8 && numberOfFailures < 4)) 准备();
    //保级退出逻辑
    if ((numberOfVictory == 8 && numberOfFailures < 4) && isEnsureLevel) {
      if (findImg(config.个突_退出, true)) sleep(500);
      if (findImg(config.个突_退出确认, true)) sleep(2000);
    }
    //结算逻辑
    if (结算('win', {})) console.log(`胜利次数:${++numberOfVictory}`);
    if (结算('fail', {})) console.log(`失败次数:${++numberOfFailures}`);
    结算('reward', {});
    //休息
    sleep(500);
  }
  //退出突破逻辑  
  退出突破界面();
};
