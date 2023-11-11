const { findImg } = require("../core/game");
const settle = require("./settle");


module.exports = function (times, params) {
    let filePath = "./契灵配置.json";
    let config = JSON.parse(files.read(filePath));
    const delayTime = params.delayTime || 800;
    let i = 0;
    while (i < times) {
        if (findImg(config.镇墓兽, true)) {
            sleep(1000);
            if (findImg(config.确认, true)) {
                sleep(10000);
            };
        };
        if (findImg(config.火, true) === null) { findImg(config.召唤, true); };
        findImg(config.挑战, true);
        settle(config.结算);
        if (findImg(config.捕获成功)) { 
            sleep(15000)
            i++;
         }
        sleep(delayTime);
    }
};
