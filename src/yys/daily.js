const { findImg, paddleOcr } = require("../core/game");

var daily = {};
daily.returnCourtyard = function () {

    let paddle = $ocr.create({})
    let filePath = "./yys.json";
    if (storages.create("todoList").get("configPath") && storages.create("todoList").get("configPath") !== "") {
        filePath = storages.create("todoList").get("configPath")
    }
    let json = JSON.parse(files.read(filePath));
    while (true) {
        if (!findImg(json.close, true)) {
            findImg(json.exit2, true);
            findImg(json.exit, true);
        }
        if (paddleOcr(paddle, "町中", true)) {
            console.log("success");
            break;
        }
        sleep(800);
    }
}
module.exports = daily;