const { findImg } = require("../core/game");
const 准备 = require("../tasks/准备");
const 结算 = require("../tasks/结算");
const 自动战斗 = require("../tasks/自动战斗");

const filePath = "./src/config/斗技.json";
let config = JSON.parse(files.read(filePath));


module.exports = function (params) {
    const delayTime = params.delayTime || 800;
    while (true) {
        //挑战
        findImg(config.斗技挑战, true);
        //准备
        准备();
        //上阵
        findImg(config.斗技自动上阵, true);
        //自动战斗
        自动战斗();
        //结算
        结算('win', {});
        结算('view', {});
        结算('reward', {});
        //休息
        sleep(delayTime);
    }
};
