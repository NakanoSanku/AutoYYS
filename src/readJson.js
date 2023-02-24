/**
 * 传入json地址
 * @param {JOSN地址} paramsPath 
 * @returns 返回配置参数
 */
module.exports = function (paramsPath) {
    return JSON.parse(files.read(paramsPath));
}





