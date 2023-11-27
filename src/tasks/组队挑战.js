const { findImg } = require("../core/game");
const filePath = "./src/config/组队挑战.json";
let config = JSON.parse(files.read(filePath));
/**
 * 点击组队挑战
 */
module.exports = function () {
    return findImg(config.组队挑战, true);
};
