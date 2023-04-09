import json
import random

from utils.game import Game
from utils.getDevices import choose_device
from utils.utils import random_number

# load config json -> data
with open('./config.json', "r") as f:
    data = json.load(f)

#


class yys(Game):
    def __init__(self, serial_or_url=None):
        super().__init__(serial_or_url)

    def settlement(self, config):
        img_config = config.get("img_config")
        method = config.get("method", 1)
        settlementArray = config.get(
            "settlementArray", [[10, 120, 250, 550], [1100, 50, 1280, 720]])
        if self.find_image(img_config):
            cf = settlementArray[random.randint(0, len(settlementArray)-1)]
            while True:
                self.screenshot("./screenshot.png")
                if self.find_image(img_config):
                    if method == 2 and isinstance(settlementArray[0], tuple):
                        cf = settlementArray[random.randint(
                            0, len(settlementArray)-1)]
                        self.random_click(method=2, point=cf)
                    else:
                        self.random_click(region=cf)
                else:
                    return True
        return False

    # 业原火\御魂\御灵
    def fight_common(self, config):
        # 格式：
        # fight_common({"mode":data["fire"],"times":3})
        # mode-模式
        # fire\soul\spirit
        # times- 次数
        mode = config.get('mode')
        times = config.get('times')
        leader = config.get('leader', False)
        i = 0
        while i < times:
            self.screenshot("./screenshot.png")
            if leader or mode.get("name") != 'soul':
                self.find_image(mode)

            if mode.get("name") == 'soul' or mode.get("name") == 'fire':
                if self.settlement(data["settleShow"]):
                    i += 1
                    print(f"结算{i}次")
            elif mode.get("name") == 'spirit':
                self.settlement(data["settleWin"])
                if self.settlement(data["settleReward"]):
                    i += 1
                    print(f"结算{i}次")

    # 简易版自动斗鸡
    def fighting_skills(self):
        i = 0
        while True:
            # 准备
            self.screenshot("./screenshot.png")
            self.find_image(data["ready"])
            self.find_image(data["fightSkill"])
            self.settlement(data["settlement2"])
            self.settlement(data["settlement3"])
            if self.settlement(data["settlement1"]):
                i += 1
                print(f"结算{i}次")

    # 探索
    def explore(self, config):
        times = config.get('times', 0)
        mark = 0
        i = 0
        smlMoveTimes = 0
        while i < times:
            self.screenshot("./screenshot.png")
            self.find_image(data["chest"])
            self.find_image(data["chapter"])
            self.find_image(data["explore"])
            if self.find_image(data["formula"]) and mark == 0:
                if self.find_image(data["boss"]):
                    smlMoveTimes = 0
                    if not self.find_image(data["boss"]):
                        print("探索完成")
                        mark = 1
                elif self.find_image(data["monster"]):
                    smlMoveTimes = 0
                else:
                    x1, y1 = random_number([1000, 115, 1100, 210])
                    x2, y2 = random_number([500, 115, 600, 210])
                    self.sml_move(x1, y1, x2, y2, 0.02)
                    smlMoveTimes += smlMoveTimes
                    if smlMoveTimes == 5:
                        mark = 1
                        smlMoveTimes = 0
                    print("滑动")
            if self.settlement(data["settleShow"]):
                i += 1
                print(f"{i}次结算完成")
            if mark == 1 and self.find_image(data["formula"]):
                self.random_click(region=[27, 38, 65, 91])
                mark = 0
            # self.find_image(data["exit"])
        while True:
            if self.find_image(data["formula"]):
                self.random_click(region=[27, 38, 65, 91])
            if (self.find_image(data["exit"])):
                if not self.find_image(data["exit"]):
                    return


g = yys(choose_device())
# g.explore({"times":3})
g.fight_common({"mode": data["fire"], "times": 3})
# g.fighting_skills()
