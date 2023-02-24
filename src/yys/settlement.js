const { randomClick } = require("../base/base");
const { findImg } = require("../base/search");
const 协作检测 = require("./协作检测");
/**
 * 结算函数
 * @param {{
 * imgConfig:找图函数参数
 * method:结算方法
 * settlementArray:结算数组}} params 
 * 结算数组 方法1时填入region数组 方法2时填入point数组      
 * method 1/2 默认/自定义结算       
 */
module.exports = function (params) {
    let method = params.method || 1;
    if (findImg(params.imgConfig)) {
        let configuration = params.settlementArray[random(0, params.settlementArray.length - 1)];
        while (findImg(params.imgConfig)) {
            协作检测()
            switch (method) {
                case 1:
                    randomClick({ 'region': configuration });
                    break;
                case 2:
                    configuration = params.settlementArray[random(0, params.settlementArray.length - 1)];
                    randomClick({ 'point': configuration });
                    break;
                default:
                    break;
            }
        }
        return true
    }
}