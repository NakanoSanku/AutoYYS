const 业原火 = require("./yys/业原火");
const 个突 = require("./yys/个突");
const 寮突 = require("./yys/寮突");
const 御灵 = require("./yys/御灵");
const 御魂 = require("./yys/御魂");
const 探索 = require("./yys/探索");
const 活动 = require("./yys/活动");

module.exports = function (params) {
    var storage = storages.create("todoList");
    let speed = !storage.get('speed');
    if (params.done) {
        console.info("开始" + params.title);
        switch (params.title) {
            case "御魂":
                御魂({ "times": params.summary, 'leader': storage.get('队长模式'), 'speed': speed });
                break;
            case "业原火":
                业原火({ 'times': params.summary, 'speed': speed });
                break;
            case "个人突破":
                个突();
                break;
            case "御灵":
                御灵({ 'times': params.summary, 'speed': speed })
                break;
            case "探索":
                探索({ 'times': params.summary, 'speed': speed })
                break;
            case "寮突":
                寮突();
                break;
            case "活动":
                活动({ "times": params.summary });
            case "自动奉纳":
                break;
            default:
                break;
        }
        sleep(1000);
    }
}
