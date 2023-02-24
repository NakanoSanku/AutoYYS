var base = {};
/**
 * 贝塞尔曲线
 * @param {坐标点} ScreenPoint
 * @param {偏移量} Offset
 */
function bezier(ScreenPoint, Offset) {
    cx = 3.0 * (ScreenPoint[1].x - ScreenPoint[0].x);
    bx = 3.0 * (ScreenPoint[2].x - ScreenPoint[1].x) - cx;
    ax = ScreenPoint[3].x - ScreenPoint[0].x - cx - bx;
    cy = 3.0 * (ScreenPoint[1].y - ScreenPoint[0].y);
    by = 3.0 * (ScreenPoint[2].y - ScreenPoint[1].y) - cy;
    ay = ScreenPoint[3].y - ScreenPoint[0].y - cy - by;
    tSquared = Offset * Offset;
    tCubed = tSquared * Offset;
    return {
        x: ax * tCubed + bx * tSquared + cx * Offset + ScreenPoint[0].x,
        y: ay * tCubed + by * tSquared + cy * Offset + ScreenPoint[0].y
    }
};
/**
* 高斯分布模型
* @param { number } mean 数学期望
* @param { number } std 偏移量
*/
function normalRandom(mean, std) {
    let u = 0.0,
        v = 0.0,
        w = 0.0,
        c = 0.0;
    do {
        u = Math.random() * 2 - 1.0;
        v = Math.random() * 2 - 1.0;
        w = u * u + v * v;
    } while (w == 0.0 || w >= 1.0);
    c = Math.sqrt((-2 * Math.log(w)) / w);
    return mean + u * c * std;
};
/**
* 基于高斯模型取坐标，并判断时候超出范围  生成在max范围内的随机整数数
* @param { number } max 最大范围
*/
function randomNumber(max) {
    const mean = random(0, max / 4);
    var x = normalRandom(mean, (max - mean) / 3);
    return Math.abs(x) > max ? x = randomNumber(max) : Math.abs(Math.round(x));
};
function centralPoint(param) {
    return { x: param[0] + param[2] / 2, y: param[1] + param[3] / 2 }
}
function checkPoint(Point, param) {
    Point.x = Point.x >= [param[0] + param[2]] ? (param[0] + param[2] - 10) : Point.x;
    Point.x = Point.x <= param[0] ? param[0] + 10 : Point.x;
    Point.y = Point.y >= [param[1] + param[3]] ? (param[1] + param[3] - 10) : Point.y;
    Point.y = Point.y <= param[1] ? param[1] + 10 : Point.y;
    return Point
}
/**
 * 转化范围[Xmin,Ymin,Xmax,Ymax] => [ X ,Y ,W ,H]
 * @param {[Xmin,Ymin,Xmax,Ymax]} param 
 * @returns 
 */
base.formatRegion = function (params) {
    if (params.length == 4) {
        return [params[0], params[1], params[2] - params[0], params[3] - params[1]]
    } else if (params.length == 2) {
        return [params[0], params[1]]
    } else {
        return params
    }
}
/**
 * 曲线滑动
 * @param {*} qx
 * @param {*} qy
 * @param {*} zx
 * @param {*} zy
 * @param {*} time
*/
base.smlMove = function (qx, qy, zx, zy, time) {
    let slidingPath = [time];
    let point = [
        { x: qx, y: qy },
        { x: random(qx - 100, qx + 100), y: random(qy, qy + 50) },
        { x: random(zx - 100, zx + 100), y: random(zy, zy + 50) },
        { x: zx, y: zy },
    ];
    for (let i = 0; i < 1; i += 0.08) {
        let newPoint = bezier(point, i);
        slidingPath.push([parseInt(newPoint.x), parseInt(newPoint.y)]);
    }
    return gesture.apply(null, slidingPath);
}
/**
 * 点击算法
 * @param {{
 * method:点击方法
 * region:点击范围
 * time:点击时长
 * point:自定义点位}} params 
 * method,time为可选项      
 * method = 1 时 传入region  随机操作  默认     
 * method = 2 时 点击操作     
 * 传入point为定点操作
 */
base.randomClick = function (params) {
    let method = params.method || 1;
    //根据范围生成坐标
    var Point = { x: 0, y: 0 };
    if (params.region != undefined) {
        let region = base.formatRegion(params.region);//转换成x，y，w，h的形式
        Point = centralPoint(region);//获取范围中心点坐标
        Point.x += Math.pow(-1, random(0, 99)) * randomNumber(region[2] / 2);
        Point.y += Math.pow(-1, random(0, 99)) * randomNumber(region[3] / 2);
        Point = checkPoint(Point, region);
    }
    Point = params.point || Point;
    try {
        switch (method) {
            case 1:
                let i = Math.abs(normalRandom(0, 30));
                if (i > 90) {
                    press(Point.x, Point.y, random(200, 300));
                    //console.log('长按');
                } else if (i > 60) {
                    base.smlMove(Point.x, Point.y, Point.x + random(0, 3), Point.y + random(0, 3), random(50, 80));
                    //console.log('滑动');
                } else {
                    press(Point.x, Point.y, random(80, 150));
                    //console.log('点击');
                }
                break;
            case 2:
                let time = params.time || 150;
                press(Point.x, Point.y, time);
                break;
            default:
                break;
        }
    } catch (error) {
        console.error('点击失败')
    }
    sleep(random(80, 120));
};
module.exports = base;