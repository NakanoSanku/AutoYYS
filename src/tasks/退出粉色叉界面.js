const { findImg } = require("../core/game");

/**
 * 退出突破界面
*/
const filePath = "./src/config/退出突破界面.json";
let config = JSON.parse(files.read(filePath));
module.exports = function () {
    //退出突破逻辑
    while (true) {
        if (findImg(config.退出, true)) {
            sleep(3000);
            if (!findImg(config.退出)) return;
        }
        sleep(500);
    }
};
