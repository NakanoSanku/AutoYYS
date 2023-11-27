const { findImg } = require("../core/game");
const filePath = "./src/config/悬赏协作.json";
let config = JSON.parse(files.read(filePath));
/**
 * 点击悬赏协作接受
 */
module.exports = function () {
    return findImg(config.悬赏协作接受, true);
};
