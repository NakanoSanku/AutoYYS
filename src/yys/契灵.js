const { findImg } = require("../core/game");
const 结算 = require("../tasks/结算");

const filePath = "./src/config/契灵.json";
let config = JSON.parse(files.read(filePath));
module.exports = function (times, params) {
    const delayTime = params.delayTime || 800;
    const elf = params.elf || '镇墓兽';
    let configElf;
    switch (elf) {
        case '镇墓兽':
            configElf = config.镇墓兽;
            break;
        case '火灵':
            configElf = config.火灵;
            break;
        case '小黑':
            configElf = config.小黑;
            break;
        case '茨球':
            configElf = config.茨球;
            break;
        default:
            break;
    }
    
    let i = 0;
    while (i < times) {
        //选择并召唤契灵
        if (findImg(configElf, true)) {
            sleep(1000);
            if (findImg(config.确认, true)) {
                sleep(10000);
            };
        };
        //找已召唤契灵位置，没找到则点击召唤
        if (findImg(config.火, true) === null) { findImg(config.召唤, true); };
        //点击挑战
        findImg(config.挑战, true);
        //结算
        结算('reward', {})
        if (findImg(config.捕获成功)) {
            sleep(15000)
            console.info(`${++i}次捕获成功完成`);
        }
        //休息
        sleep(delayTime);
    }
};
