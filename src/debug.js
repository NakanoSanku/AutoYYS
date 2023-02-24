/**
 * 超时检测
 * @param {{
 * start:运行起始时间，
 * }} params 
 */
module.exports = function (params) {
    runTime = Date.now - params.start;
    if (runTime/60000 > 3) {
        engines.stopAll();
        var storage = storages.create("todoList");
        if (storage.get("是否开启卡住推送")) {
            let url = "http://www.pushplus.plus/send";
            let r = http.postJson(url, {
                token: storage.get("pushplusToken"),
                title: "insider",
                content: "出问题了!自行检查",
            });
            log(r.body.string());
        }
    }
}