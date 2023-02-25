const { randomClick, formatRegion } = require("./base");

var search = {}
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
search.findImg = function (params) {
    //console.time('找图');
    let region = params.region || [0, 0];//找图范围
    let threshold = params.threshold || 0.8;//找图相似度
    let res = false;//真值判断
    let isClick = params.isClick || false;//是否点击
    let isColor = params.isColor || false;//是否找色
    let colorThreshold = params.colorThreshold || 30;//颜色相似度
    region = formatRegion(region);//转化范围
    let template = typeof (params.template) == 'string' ? images.read(params.template) : params.template;//模板图片
    let point = findImage(captureScreen(), template, {
        'region': region,
        'threshold': threshold
    });
    //判断图是否存在
    if (point) {
        res = true;
        //判断颜色是否正确
        if (isColor) {
            if (!findColor(captureScreen(), template.pixel(0, 0), {
                region: [point.x, point.y, 10, 10],
                threshold: colorThreshold
            })) res = false;
        }
        //点击
        if (isClick && res) {
            randomClick({ 'region': [point.x, point.y, point.x + template.width, point.y + template.height] });
        }
    }
    if (typeof (params.template) == 'string') {
        if(res) console.log('success find ' + params.template);
        template.recycle()
    };//回收模板对象
    //console.timeEnd('找图');
    return res;//返回真值
}

module.exports = search;