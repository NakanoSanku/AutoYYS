const { randomClick } = require("../base/base");
const { findImg } = require("../base/search")

module.exports = function name() {
    if (findImg({ 'template': "./assets/img/公用/协作.bmp", 'region': [515, 150, 555, 200] })) {
        sleep(500);
        randomClick({ 'region': [820, 385, 980, 440] })
    }
}