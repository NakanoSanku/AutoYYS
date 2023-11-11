const { findImg } = require("../core/game");
const { enlargeRegion } = require("../core/utils");
const settle = require("./settle");


module.exports = function (times, params) {
    let filePath = "./斗技配置.json";
    let config = JSON.parse(files.read(filePath));
    const delayTime = params.delayTime || 800;
    let i = 0;
    while (i < times) {
        if (settle(config.斗技_奖励结算) === null) findImg(config.斗技_战斗, true);
        findImg(config.斗技_准备, true);
        findImg(config.斗技_手动, true);
        if (settle(config.斗技_胜利结算)) {
            i++;
        } else {
            settle(config.斗技_太鼓结算);
        }
        findImg(config.斗技_自动上阵, true);
        sleep(delayTime);
    }
};
