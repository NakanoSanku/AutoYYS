const 准备 = require("../tasks/准备");
const 组队挑战 = require("../tasks/组队挑战");
const 结算 = require("../tasks/结算");


module.exports = function (times, params) {
    const delayTime = params.delayTime || 800;
    const isLeader = params.isLeader || false;
    let i = 0;
    while (i < times) {
        //队长点击挑战
        if (isLeader)组队挑战();
        //准备
        准备();
        //结算
        结算('fail', {});
        结算('win', {});
        if (结算('reward', {})) {
            console.info(`${++i}次结算完成`);
        }
        //休息
        sleep(delayTime);
    }
};
