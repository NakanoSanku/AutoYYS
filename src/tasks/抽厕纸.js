const { findImg } = require("../core/game");
const filePath = "./src/config/抽厕纸.json";
let config = JSON.parse(files.read(filePath));
/**
 * 抽厕纸
 */
module.exports = function (times, delayTime) {
    let i = 0;
    while (i < times) {
        if (findImg(config.再次召唤, true)) {
            sleep(500);
            if (!findImg(config.再次召唤)) i++;
        };
        sleep(delayTime);
    }
};
