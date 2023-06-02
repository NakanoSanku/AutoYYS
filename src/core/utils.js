var utils = {};
/**
 * 基于高斯分布生成随机数
 * @param {int} mean
 * @param {int} standardDeviation
 * @returns
 */
utils.generateGaussian = function (mean, standardDeviation) {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //随机选择在(0,1]之间的u和v值
  while (v === 0) v = Math.random();

  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v); //使用Box-Muller变换生成标准正态分布的随机数
  return num * standardDeviation + mean; //将标准正态分布转换为具有给定平均值和标准差的高斯分布
};
/**
 * 基于高斯分布在[xmin, ymin, xmax, ymax]创建随机坐标点
 * @param {int} xmin
 * @param {int} ymin
 * @param {int} xmax
 * @param {int} ymax
 * @returns {{x:int,y:int}}
 */
utils.generateRandomPoint = function (region) {
  let [xmin, ymin, xmax, ymax] = region;
  let w = xmax - xmin;
  let h = ymax - ymin;
  let x, y;
  do {
    x = Math.round(utils.generateGaussian(xmin + w / 2, w / 6));
    y = Math.round(utils.generateGaussian(ymin + h / 2, h / 6));
  } while (x < xmin || x > xmax || y < ymin || y > ymax);
  return { x: x, y: y };
};
/**
 * 贝塞尔曲线
 * @param {坐标点} ScreenPoint
 * @param {偏移量} Offset
 */
utils.bezier = function (screenPoint, offset) {
  const [p0, p1, p2, p3] = screenPoint;
  const cx = 3 * (p1.x - p0.x);
  const bx = 3 * (p2.x - p1.x) - cx;
  const ax = p3.x - p0.x - cx - bx;
  const cy = 3 * (p1.y - p0.y);
  const by = 3 * (p2.y - p1.y) - cy;
  const ay = p3.y - p0.y - cy - by;
  const tSquared = offset * offset;
  const tCubed = tSquared * offset;
  const x = ax * tCubed + bx * tSquared + cx * offset + p0.x;
  const y = ay * tCubed + by * tSquared + cy * offset + p0.y;
  return { x, y };
};
/**
 * 转化范围[Xmin,Ymin,Xmax,Ymax] => [ X ,Y ,W ,H]
 * @param {[Xmin,Ymin,Xmax,Ymax]} region
 * @returns
 */
utils.formatRegion = function (region) {
  if (region.length == 4) {
    return [region[0], region[1], region[2] - region[0], region[3] - region[1]];
  } else if (region.length == 2) {
    return [region[0], region[1]];
  } else {
    return None;
  }
};
/**
 * 将坐标扩大一点
 * @param {array} region [xmin,ymin,xmax,ymax]
 * @param {int} w 设备宽度
 * @param {int} h 设备高度
 * @returns
 */
utils.enlargeRegion = function (region, w, h) {
  console.log(region);
  region[0] = region[0] - 50;
  region[1] = region[1] - 50;
  region[2] = region[2] + 50;
  region[3] = region[3] + 50;
  if (region[0] < 0) region[0] = 0;
  if (region[1] < 0) region[1] = 0;
  if (region[2] > w) region[2] = w - 1;
  if (region[3] > h) region[3] = h - 1;
  console.log(region);
  return region;
};
/**
 * 自动获取截图权限
 * @returns
 */
utils.getScreenCapture = function () {
  var res = false;
  if (device.height > device.width) {
    toastLog("手机模式");
    res = true;
  } else {
    toastLog("平板模式");
  }
  let Thread = threads.start(function () {
    if (auto.service != null) {
      //如果已经获得无障碍权限
      //由于系统间同意授权的文本不同，采用正则表达式
      let Allow = textMatches(/(允许|立即开始|同意)/).findOne(10 * 1000);
      if (Allow) {
        Allow.click();
      }
    }
  });
  if (!requestScreenCapture(res)) {
    log("请求截图权限失败");
    return false;
  } else {
    Thread.interrupt();
    log("已获得截图权限");
    return true;
  }
};
module.exports = utils;
