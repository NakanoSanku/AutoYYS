const { randomClick } = require("./actions");
const { formatRegion } = require("./utils");


let ocr = null;
var captureScreenLock = threads.lock()
var game = {};
/**
 * 找图函数
 * @param {{
 * template:模板图片或者地址
 * region:找图范围
 * threshold:找图相似度
 * isColor:是否找色
 * colorThreshold:颜色相似度
 * }} params
 * @param {boolean} isClick
 * @returns
 */
game.findImg = function (params, isClick) {
  let region = params.region || [0, 0]; //找图范围
  let threshold = params.threshold || 0.9; //找图相似度
  let res = false; //真值判断
  isClick = isClick || false; //是否点击
  let isColor = params.isColor || false; //是否找色
  let colorThreshold = params.colorThreshold || 30; //颜色相似度
  region = formatRegion(region); //转化范围
  let template = images.read(params.template);
  // 截图锁
  let screen;
  captureScreenLock.lock();
  screen = captureScreen().clone();
  captureScreenLock.unlock();

  let point = findImage(screen, template, {
    region: region,
    threshold: threshold,
  });
  //判断图是否存在
  if (point) {
    res = true;
    //判断颜色是否正确
    if (isColor) {
      if (
        !findColor(screen, template.pixel(0, 0), {
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
        "success find " + params.template.match(/\/([^/]+)\.\w+$/)[1] + " in " + region
      );
    template.recycle();
  } //回收模板对象
  screen.recycle();
  return res ? region : null;
};
/**
 * 初始化MLKitOCR
 * @returns MLkitOCR对象
 */
function initOcr() {
  // 加载OCR插件，需要先在Auto.js Pro的插件商店中下载官方MLKitOCR插件
  let MLKitOCR = $plugins.load('org.autojs.autojspro.plugin.mlkit.ocr');
  return new MLKitOCR();
}
game.ocrFind = function (text, region, threshold, isClick) {
  x, y, w, h = region;
  region = [x, y, x + w, y + h] || [0, 0];
  threshold = threshold || 0.8;
  ocr = ocr || initOcr();
  // 截图锁
  let screen;
  captureScreenLock.lock();
  screen = captureScreen().clone();
  captureScreenLock.unlock();
  let result = ocr.detect(capture, { region:region });
  // 过滤可信度threshold以上的文本
  let filtered = result.filter(item => item.confidence > threshold);
  // 模糊搜索文字内容为"Auto.js"的文本结果
  let autojs = filtered.find(item => item.text.includes(text));
  // 若搜索到则打印其可信度、范围和中点位置并点击
  if (autojs || isClick) {
    // autojs.bounds.
  }
}
module.exports = game;
