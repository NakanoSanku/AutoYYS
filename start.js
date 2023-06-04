const { getScreenCapture } = require("./src/core/utils");
const commonFight = require("./src/yys/commonFight");
const { returnCourtyard } = require("./src/yys/daily");
const explore = require("./src/yys/explore");
const 个突 = require("./src/yys/个突");
const 协作 = require("./src/yys/协作");

function functionalChoice(params) {
  var storage = storages.create("todoList");
  if (params.done) {
    console.info("开始" + params.title);
    switch (params.title) {
      case "御魂":
        commonFight("御魂", params.summary, {
          leader: storage.get("队长模式"),
          isSpeed: true,
          delayTime: 500,
        });
        break;
      case "业原火":
        commonFight("业原火", params.summary, {
          isSpeed: true,
          delayTime: 500,
        });
        break;
      case "御灵":
        commonFight("御灵", params.summary, {
          isSpeed: true,
          delayTime: 500,
        });
        break;
      case "个人突破":
        个突();
        break;
      case "探索":
        explore(params.summary, true, 500);
        break;
      case "测试":
        returnCourtyard();
        break;
    }
    sleep(1000);
  }
}
//监听say事件
events.on("value", function (value) {
  auto.waitFor();
  while (app.getAppName(currentPackage()) != "阴阳师") {
    launchApp("阴阳师");
    sleep(1000);
  }
  getScreenCapture();
  var storage = storages.create("todoList");
  var items = storage.get("items");
  var subthread = threads.start(
    function () {
      let j = 0;
      let currentScreen = captureScreen();
      setInterval(function () {
        if (storage.get("isUsePushplus") && storage.get("pushplusToken") !== undefined) {
          if (images.getSimilarity(currentScreen, captureScreen()) > 0.9) {
            if (j === 36) {
              let url = "http://www.pushplus.plus/send";
              let r = http.postJson(url, {
                token: storage.get("pushplusToken"),
                title: "阴阳师脚本卡住啦",
                content: "bug",
              });
              console.warn(r.body.string());
              engines.myEngine().forceStop();
            }
          } else {
            j == 0;
          }
          //更新截图
          currentScreen = captureScreen();
          j++;
        }
        协作();
      }, 5000);
    })
  subthread.waitFor();
  do {
    for (let index = 0; index < items.length; index++) {
      functionalChoice(items[index]);
    }
  } while (storage.get("isWhile"));
  if (storage.get("isUsePushplus") && storage.get("pushplusToken") !== undefined) {
    let url = "http://www.pushplus.plus/send";
    let r = http.postJson(url, {
      token: storage.get("pushplusToken"),
      title: "阴阳师脚本任务已完成",
      content: "success",
    });
    console.warn(r.body.string());
    engines.myEngine().forceStop();
  }
});
//保持脚本运行
setInterval(() => { }, 1000);
