const { findImg } = require("../core/game");
const filePath = "./src/config/单人挑战.json";
let config = JSON.parse(files.read(filePath));
/**
 * 点击单人挑战
 */
module.exports = function () {
    return findImg(config.单人挑战, true);
};
