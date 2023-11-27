const { findImg } = require("../core/game");
const filePath = "./src/config/准备.json";
let config = JSON.parse(files.read(filePath));
/**
 * 点击准备
 */
module.exports = function () {
    return findImg(config.准备, true);
};
