const { bezier, generateGaussian, generateRandomPoint } = require("./utils");

var actions = {};
/**
 * 曲线滑动
 * @param {int} qx
 * @param {int} qy
 * @param {int} zx
 * @param {int} zy
 * @param {int} time
 */
actions.smlMove = function (qx, qy, zx, zy, time) {
  let slidingPath = [time];
  let point = [
    {
      x: qx,
      y: qy,
    },
    {
      x: random(qx - 100, qx + 100),
      y: random(qy, qy + 50),
    },
    {
      x: random(zx - 100, zx + 100),
      y: random(zy, zy + 50),
    },
    {
      x: zx,
      y: zy,
    },
  ];
  for (let i = 0; i < 1; i += 0.08) {
    let newPoint = bezier(point, i);
    slidingPath.push([parseInt(newPoint.x), parseInt(newPoint.y)]);
  }
  return gesture.apply(null, slidingPath);
};

/**
 * 点击算法
 * @param {{
 * method:点击方法
 * region:点击范围
 * time:点击时长
 * point:自定义点位}} params
 * - method,time为可选项 method默认为1
 * - method = 1 时 传入region 随机操作
 * - method = 2 时 点击操作
 * - 传入point为定点操作
 */
actions.randomClick = function (params) {
  let method = params.method || 1;
  //根据范围生成坐标
  let Point = params.point || generateRandomPoint(params.region);
  try {
    switch (method) {
      case 1:
        let i = Math.abs(generateGaussian(0, 30));
        if (i > 100) {
          press(Point.x, Point.y, random(200, 300));
          console.log("长按x:" + Point.x + " y:" + Point.y);
        } else if (i > 80) {
          actions.smlMove(
            Point.x,
            Point.y,
            Point.x + random(0, 3),
            Point.y + random(0, 3),
            random(350, 400)
          );
          console.log("滑动");
        } else {
          press(Point.x, Point.y, random(80, 150));
          console.log("点击x:" + Point.x + " y:" + Point.y);
        }
        break;
      case 2:
        let time = params.time || 150;
        press(Point.x, Point.y, time);
        break;
    }
  } catch (error) {
    console.error("点击失败");
  }
  sleep(random(80, 120));
};

module.exports = actions;
