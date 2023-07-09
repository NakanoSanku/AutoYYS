const { randomClick } = require("../base/base");
const { findImg } = require("../base/search");
const settlement = require("./settlement");
const 协作检测 = require("./协作检测");

let Breach = [
  [356, 133, 477, 274],
  [691, 130, 808, 277],
  [1021, 126, 1145, 281],
  [357, 270, 484, 421],
  [686, 269, 811, 420],
  [1010, 265, 1161, 415],
  [353, 401, 480, 552],
  [689, 405, 814, 560],
  [1018, 402, 1160, 554],
];
let breakRegion = [
  [250, 150, 450, 250],
  [580, 150, 750, 250],
  [900, 150, 1100, 250],
  [250, 290, 450, 400],
  [580, 290, 750, 400],
  [900, 290, 1100, 400],
  [250, 420, 450, 530],
  [580, 420, 750, 530],
  [900, 420, 1100, 530],
];

module.exports = function (params) {
  let numberOfFailures = 0;
  let numberOfVictory = 0;
  let index = 0;
  let res = true;
  params = params || {};
  let settlementArray = params.settlementArray || [
    [10, 120, 250, 550],
    [1100, 50, 1280, 720],
  ];
  let method = params.settlementArray != undefined ? 2 : 1;
  let settlement1 = {
    imgConfig: {
      template: "./assets/img/公用/结算一.bmp",
      region: [330, 79, 645, 351],
      isColor: true,
      threshold: 0.6,
    },
    method: method,
    settlementArray: settlementArray,
  };
  let settlement2 = {
    imgConfig: {
      template: "./assets/img/公用/结算二.bmp",
      region: [442, 358, 843, 684],
      threshold: 0.6,
    },
    method: method,
    settlementArray: settlementArray,
  };
  let fail = {
    imgConfig: {
      template: "./assets/img/公用/失败结算.bmp",
      region: [330, 79, 645, 351],
      isColor: true,
      threshold: 0.6,
    },
    settlementArray :[
      [10, 120, 250, 550],
      [1100, 50, 1280, 720],
    ]
  };
  let beat = {};
  let close = {
    template: "./assets/img/公用/退出.bmp",
    region: [1157, 74, 1259, 183],
    isClick: true,
  };
  let breakthrough = {
    template: "./assets/img/探索/探索章节选择.bmp",
    region: [200, 610, 415, 719],
    region: [1035, 543, 1273, 676],
  };
  let presonBreakthrough = {
    template: "./assets/img/突破/个人突破/个人突破.bmp",
    region: [1179, 191, 1279, 353],
    isClick: true,
  };
  let refresh = {
    template: "./assets/img/突破/个人突破/刷新.bmp",
    region: [914, 520, 1185, 663],
    isClick: true,
  };
  let confirmRefresh = {
    template: "./assets/img/突破/个人突破/刷新确认.bmp",
    region: [645, 350, 895, 521],
    isClick: true,
  };
  let formula = {
    template: "./assets/img/公用/式神录.bmp",
    region: [1175, 578, 1279, 700],
    isColor: true,
    colorThreshold: 15,
  };
  let exitConfirm = {
    template: "./assets/img/突破/个人突破/退出确认.bmp",
    region: [653, 357, 835, 486],
    isClick: true,
  };
  let attack = { template: "./assets/img/突破/进攻.bmp", isClick: true };
  let X2 = {
    template: "./assets/img/公用/X2.bmp",
    region: [65, 575, 220, 688],
  };
  let ready = {
    template: "./assets/img/公用/准备.bmp",
    isClick: true,
    region: [1000, 500],
  };
  while (true) {
    if (findImg(presonBreakthrough)) break;
    if (findImg(breakthrough)) {
      randomClick({ region: [250, 640, 300, 690] });
    }
    sleep(500);
  }
  log("突破界面");
  while (true) {
    if ((numberOfVictory < 3 && numberOfFailures > 0) || numberOfFailures > 4) {
      while (true) {
        if (findImg(refresh)) console.info("刷新");
        if (findImg(confirmRefresh)) {
          sleep(2000);
          if (!findImg(confirmRefresh)) {
            sleep(1000);
            break;
          }
        }
      }
      numberOfVictory = 0;
      numberOfFailures = 0;
      log("重置");
    }
    if (findImg(formula)) {
      if (res) {
        for (index = 0; index < Breach.length; index++) {
          beat = {
            template: "./assets/img/突破/已突破.bmp",
            region: Breach[index],
            threshold: 0.6,
          };
          console.log("1");
          if (findImg(beat)) numberOfVictory++;
        }
        //自动初始化已突破数量
        toastLog("当前已突破个数" + numberOfVictory);
        res = false;
      }
      for (index = 0; index < Breach.length; index++) {
        beat = {
          template: "./assets/img/突破/已突破.bmp",
          region: Breach[index],
          threshold: 0.6,
        };
        if (!findImg(beat)) {
          randomClick({ region: breakRegion[index] });
          break;
        }
      }
    }
    if (numberOfVictory == 8 && numberOfFailures < 4) {
      if (findImg(X2)) randomClick({ region: [20, 20, 30, 30] });
      if (findImg(exitConfirm)) sleep(5000);
    }
    if (numberOfVictory == 9) {
      numberOfVictory = 0;
      numberOfFailures = 0;
      log("重置");
    }
    if (findImg(attack)) {
      sleep(5000);
      attack.isClick = false;
      attack.isColor = true;
      if (findImg(attack)) break;
      attack.isClick = true;
      attack.isColor = false;
    }
    findImg(ready);
    if (settlement(settlement1)) numberOfVictory++;
    settlement(settlement2);
    if (settlement(fail)) numberOfFailures++;
    sleep(800);
    协作检测();
  }
  while (true) {
    if (findImg(close)) {
      sleep(3000);
      if (!findImg(close)) return numberOfVictory;
    }
    协作检测();
  }
};
