const functionalChoice = require("./src/functionalChoice");
const myRequestScreenCapture = require("./src/myRequestScreenCapture");

//监听say事件
events.on("value", function (value) {
    auto();
    while (app.getAppName(currentPackage()) != "阴阳师") {
        launchApp('阴阳师');
        sleep(1000);
    }
    myRequestScreenCapture();
    var storage = storages.create("todoList");
    var items = storage.get("items");
    do {
        for (let index = 0; index < items.length; index++) {
            functionalChoice(items[index]);
            // if (items[index].title == "探索" && storage.get("转突破") && items[index + 1].title == "个人突破") exploreToBreak();
        }
    } while (storage.get('是否循环任务'));
});
//保持脚本运行
setInterval(() => { }, 1000);



