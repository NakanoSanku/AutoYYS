const { findImg } = require("../core/game");

/**
 * 进入突破界面
*/
const filePath = "./src/config/进入突破界面.json";
let config = JSON.parse(files.read(filePath));
module.exports = function (breakthroughType) {
    let breakthroughTypeConfig = config.个人突破;
    if (breakthroughType === '寮突') breakthroughTypeConfig = config.寮突;
    while (true) {
        if (findImg(breakthroughTypeConfig, true)) break;
        findImg(config.结界突破, true);
        sleep(500);
    }
    console.info("突破界面");
};
