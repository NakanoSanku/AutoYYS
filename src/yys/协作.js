const { findImg } = require("../core/game");
const { enlargeRegion } = require("../core/utils");


module.exports = function () {
    let filePath = "./yys.json";
    if (storages.create("todoList").get("configPath") && storages.create("todoList").get("configPath") !== "") {
        filePath = storages.create("todoList").get("configPath")
    }
    let json = JSON.parse(files.read(filePath));
    const w = device.width > device.height ? device.width : device.height;
    const h = device.width > device.height ? device.height : device.width;
    let p = findImg(json.accpet, true);
    console.log("副线程运行中");
    if (p) {
        json = JSON.parse(files.read(filePath));
        json.accpet.region = json.accpet.region || enlargeRegion(p, w, h);
        //写入配置文件
        files.write(filePath, JSON.stringify(json), "utf-8");
    }
};
