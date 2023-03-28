const 个突 = require("./yys/个突");
const 寮突 = require("./yys/寮突");
const fight = require("./yys/fight");
const 探索 = require("./yys/探索");

module.exports = function (params) {
  var storage = storages.create("todoList");
  let settlementArray = storage.get("personalConfig");
  if (!storage.get("是否开启自定义结算")) settlementArray = undefined;
  if (params.done) {
    console.info("开始" + params.title);
    switch (params.title) {
      case "御魂":
        fight({
          mode: "soul",
          times: params.summary,
          leader: storage.get("队长模式"),
        });
        break;
      case "业原火":
        fight({
          mode: "fire",
          times: params.summary,
        });
        break;
      case "个人突破":
        个突({ settlementArray: settlementArray });
        break;
      case "御灵":
        fight({
          mode: "spirit",
          times: params.summary,
        });
        break;
      case "探索":
        探索({ times: params.summary });
        break;
      case "寮突":
        寮突({ settlementArray: settlementArray });
        break;
      case "活动":
        fight({
          mode: params.title,
          times: params.summary,
        });
        break;
      case "自动奉纳":
        break;
      default:
        break;
    }
    -sleep(1000);
  }
};
