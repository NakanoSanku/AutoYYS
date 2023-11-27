const { getScreenCapture } = require("./src/core/utils");
const 悬赏协作 = require("./src/tasks/悬赏协作");
const 探索 = require("./src/yys/探索");
const 个突 = require("./src/yys/个突");
const 单人战斗 = require("./src/yys/单人战斗");
const 契灵 = require("./src/yys/契灵");
const 寮突 = require("./src/yys/寮突");
const 斗技 = require("./src/yys/斗技");
const 组队战斗 = require("./src/yys/组队战斗");
const 抽厕纸 = require("./src/tasks/抽厕纸");

function functionalChoice(params) {
  var storage = storages.create("todoList");
  const delayTime = storage.get('delayTime',800);
  if (params.done) {
    console.info("开始" + params.title);
    switch (params.title) {
      case "组队御魂": case "组队觉醒": case "组队永生之海": case "组队日轮之陨":
        组队战斗(params.summary, {
          isLeader: storage.get("队长模式"),
          delayTime: delayTime
        });
        break;
      case "业原火": case "御灵": case "单人御魂": case "单人觉醒": case "单人永生之海": case "单人日轮之陨":
        单人战斗(params.summary, {delayTime: delayTime});
        break;
      case "个人突破":
        个突(storage.get('是否保级'));
        break;
      case "探索":
        探索(params.summary, delayTime);
        break;
      case "斗技":
        斗技(params.summary, { delayTime: delayTime })
        break;
      // case "活动":
      //   commonFight("活动", params.summary, {
      //     isSpeed: true,
      //     delayTime: 500,
      //   });
      //   break;
      case "寮突":
        寮突({});
        break;
      case "契灵":
        契灵(params.summary, {
          delayTime: delayTime
        })
      case "抽厕纸":
        抽厕纸(params.summary,delayTime);
    }
    
    sleep(1000);
  }
}
//监听say事件
events.on("value", function (value) {
  var storage = storages.create("todoList");
  let yysName = (storage.get("yysName", "阴阳师") === "") ? "阴阳师" : storage.get("yysName", "阴阳师")
  console.log(yysName);
  auto.waitFor();
  while (app.getAppName(currentPackage()) != yysName) {
    launchApp(yysName);
    sleep(1000);
  }
  getScreenCapture();
  var items = storage.get("items");
  var subthread = threads.start(
    function () {
      sleep(15000);
      setInterval(function () { 悬赏协作(); }, 5000);//协作检测定时器

    })
  subthread.waitFor();
  do {
    for (let index = 0; index < items.length; index++) {
      functionalChoice(items[index]);
    }
    sleep(parseInt(storage.get('sleepTime')));
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
