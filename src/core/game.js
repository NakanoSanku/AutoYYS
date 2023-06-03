const { randomClick } = require("./actions");
const { formatRegion } = require("./utils");

var game = {};
/**
 * 找图函数
 * @param {{
 * template:模板图片或者地址
 * region:找图范围
 * threshold:找图相似度
 * isClick:是否点击
 * isColor:是否找色
 * colorThreshold:颜色相似度
 * }} params
 * @returns
 */
game.findImg = function (params, isClick) {
  let region = params.region || [0, 0]; //找图范围
  let threshold = params.threshold || 0.8; //找图相似度
  let res = false; //真值判断
  isClick = isClick || false; //是否点击
  let isColor = params.isColor || false; //是否找色
  let colorThreshold = params.colorThreshold || 30; //颜色相似度
  region = formatRegion(region); //转化范围
  let template = images.read(params.template);
  // let template =
  //   typeof params.template == "string"
  //     ? images.read(params.template)
  //     : params.template; //模板图片
  let point = findImage(captureScreen(), template, {
    region: region,
    threshold: threshold,
  });
  //判断图是否存在
  if (point) {
    res = true;
    //判断颜色是否正确
    if (isColor) {
      if (
        !findColor(captureScreen(), template.pixel(0, 0), {
          region: [point.x, point.y, 10, 10],
          threshold: colorThreshold,
        })
      )
        res = false;
    }
    //点击
    if (isClick && res) {
      randomClick({
        region: [
          point.x,
          point.y,
          point.x + template.width,
          point.y + template.height,
        ],
      });
    }
  }
  if (res)
    region = [
      point.x,
      point.y,
      point.x + template.width,
      point.y + template.height,
    ];
  if (typeof params.template == "string") {
    if (res)
      console.log(
        "success find " + params.template.match(/\/([^/]+)\.\w+$/)[1]
      );
    template.recycle();
  } //回收模板对象
  return res ? region : null;
};
/**
 * 
 * @param {paddleOcr} paddle paddle ocr创建的对象
 * @param {str} content 查找文本
 * @param {boolean} isClick 是否点击 默认为false
 * @param {boolean} isDimFind 是否模糊查找 查找识别到的整段文本是否存在需匹配的文本 默认为true
 * @returns 
 */
game.paddleOcr = function (paddle, content, isClick, isDimFind) {
  if (isDimFind === undefined) isDimFind = true
  if (isClick === undefined) isClick = false
  let ocrResult = null;
  let result = false;
  let res = paddle.detect(captureScreen());
  if (res && res.length > 0) {
    for (let i = 0; i < res.length; i++) {
      ocrResult = res[i];
      if (isDimFind && ocrResult.text.indexOf(content) != -1) {
        result = true;
      } else if (content === ocrResult.text) {
        result = true;
      } else {
        ocrResult = null;
      }
      if (result) {
        console.log(ocrResult);
        if (isClick) {
          randomClick([ocrResult.bounds.left, ocrResult.bounds.top, ocrResult.bounds.right, ocrResult.bounds.bottom]);
        }
      }
    }
  }
  return ocrResult
};
module.exports = game;
