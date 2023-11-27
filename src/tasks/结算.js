const { randomClick } = require("../core/actions");
const { findImg } = require("../core/game");
const filePath = "./src/config/结算.json";
let config = JSON.parse(files.read(filePath));

/**
 * 结算函数
 * @param {{
 * imgConfig:找图函数参数
 * method:结算方法
 * settlementArray:结算数组}} params
 * 结算数组 方法1时填入region数组 方法2时填入point数组
 * method 1/2 默认/自定义结算
 */
function settle(params) {
  const method = params.method || 1;
  const imgConfig = params.imgConfig;
  const w = device.width > device.height ? device.width : device.height;
  const h = device.width > device.height ? device.height : device.width;
  const settlementArray = params.settlementArray || [
    [
      Math.floor((1 / 128) * w),
      Math.floor((1 / 6) * h),
      Math.ceil((21 / 128) * w),
      Math.ceil((55 / 72) * h),
    ],
    [
      Math.floor((55 / 64) * w),
      Math.floor((5 / 72) * h),
      w - 1,
      h - 1,
    ],
  ];
  const settlementArrayLength = settlementArray.length;
  let configuration,
    res = null;
  configuration = settlementArray[random(0, settlementArrayLength - 1)];
  while (true) {
    let p = findImg(imgConfig);
    if (p) {
      res = p;
      switch (method) {
        case 1:
          randomClick({ region: configuration });
          break;
        case 2:
          configuration = settlementArray[random(0, settlementArrayLength - 1)];
          randomClick({ point: configuration });
          break;
      }
      sleep(50);
    } else {
      return res ? res : null;
    }
  }
};

/**
 * 结算
 * @param {String} actionType 'win','reward','fail','view'
 * @param {{
* method:结算方法
* settlementArray:结算数组}} params
 * @returns 
 */
module.exports = function (actionType, params) {
  switch (actionType) {
    case 'win':
      settleConfig = config.settleWin;
      break;
    case 'reward':
      settleConfig = config.settleReward;
      break;
    case 'fail':
      settleConfig = config.settleFail;
      break;
    case 'view':
      settleConfig = config.settleView;
      break;
    default:
      // 处理未知的操作类型
      throw new Error("Error Action Type");
  }
  // settleConfig.imgConfig = params.imgConfig || settleConfig.imgConfig;//必选项
  if (settleConfig.method !== null) settleConfig.method = params.method || settleConfig.method;
  if (settleConfig.settlementArray !== null) settleConfig.settlementArray = params.settlementArray || settleConfig.settlementArray;
  return settle(settleConfig);
};
