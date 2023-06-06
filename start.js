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


      setInterval(function () { 协作(); }, 5000);//协作检测定时器
      // const w = device.width > device.height ? device.width : device.height;
      // const h = device.width > device.height ? device.height : device.width;
      // let img = images.clip(captureScreen(), w / 4, h / 4, w / 4, h / 4);
      // images.save(img, "/sdcard/currentScreen.jpg", "jpg", 50);
      // img.recycle();
      // let bugTimes = 0;
      // setInterval(() => {
      //   let currentScreen = images.read("/sdcard/currentScreen.jpg");
      //   let img = images.clip(captureScreen(), w / 4, h / 4, w / 4, h / 4);
      //   if (images.getSimilarity(currentScreen, img) >= 0.9) {
      //     console.log("比对成功" + ++bugTimes + "次!");
      //     if (bugTimes === 3) {
      //       if (storage.get("isUsePushplus") && storage.get("pushplusToken") !== undefined) {
      //         let url = "http://www.pushplus.plus/send";
      //         let r = http.postJson(url, {
      //           token: storage.get("pushplusToken"),
      //           title: "阴阳师脚本可能卡住啦",
      //           content: "bug",
      //         });
      //         console.warn(r.body.string());
      //       }
      //     }
      //     // engines.myEngine().forceStop();
      //   } else {
      //     //更新次数
      //     console.log("比对失败")
      //     images.save(img, "/sdcard/currentScreen.jpg", "jpg", 50);
      //   }
      //   currentScreen.recycle();
      //   img.recycle();
      // }, 6000);//卡住检测定时器
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
