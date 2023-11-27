const { smlMove, randomClick } = require("../core/actions");
const { findImg } = require("../core/game");
const 结算 = require("../tasks/结算");
const 进入突破界面 = require("../tasks/进入突破界面");
const 退出突破界面 = require("../tasks/退出粉色叉界面");
const filePath = "./src/config/寮突.json";
let config = JSON.parse(files.read(filePath));

module.exports = function () {
    var isBeat = false
    进入突破界面('寮突');
    while (true) {
        //选择攻击对象
        if (findImg(config.式神录)) {
            sleep(1000);
            for (let index = 0; index < config.寮突失败矩阵.length; index++) {
                config.寮突失败.region = config.寮突失败矩阵[index];
                if (!findImg(config.寮突失败)) {
                    config.寮突_已突破.region = config.寮突失败矩阵[index];
                    isBeat = findImg(config.寮突_已突破);
                    if (isBeat) break;
                    randomClick({ 'region': config.寮突挑战矩阵[index] });
                    sleep(500);
                    break;
                }
                //下拉
                if (index == (config.寮突失败矩阵.length - 1)) {
                    smlMove(749, 642, 746, 225, 750);
                }
            }
        }
        //点击进攻
        if (findImg(config.进攻, true)) {
            sleep(5000);
            if (findImg(config.进攻)) break;
        };
        //结算
        结算('win',{});
        结算('fail',{});
        结算('reward',{});
        if (isBeat) break;
        sleep(800);
    }
    退出突破界面();
}