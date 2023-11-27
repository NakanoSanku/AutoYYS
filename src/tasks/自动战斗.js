const { findImg } = require("../core/game");
const filePath = "./src/config/自动战斗.json";
let config = JSON.parse(files.read(filePath));
/**
 * 点击自动战斗
 */
module.exports = function () {
    return findImg(config.自动战斗, true);
};