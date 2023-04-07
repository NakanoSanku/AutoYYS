import json
import random

from utils.game import Game
from utils.getDevices import choose_device

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

    

    def fight_common(self, config):
        #格式：
        #fight_common({"mode":data["fire"],"times":3})
        #mode-模式
        #业原火\御魂\御灵
        #fire\soul\spirit
        #times- 次数
        mode = config.get('mode')
        times = config.get('times')
        leader = config.get('leader', False)
        i = 0
        while i < times:

            if leader or mode.get("name") != 'soul':
                self.find_image(mode)

            if mode.get("name") == 'soul' or mode.get("name") == 'fire':
                if self.settlement(data["settlement3"]):
                    i += 1
                    print(f"结算{i}次")
            elif mode.get("name") == 'spirit':
                self.settlement(data["settlement1"])
                if self.settlement(data["settlement2"]):
                    i += 1
                    print(f"结算{i}次")

    
    def fighting_skills(self):
        # 简易版自动斗鸡
        i = 0
        while True:
            # 准备
            self.find_image(data["ready"])
            self.find_image(data["fightSkill"])
            self.settlement(data["settlement2"])
            self.settlement(data["settlement3"])
            if self.settlement(data["settlement1"]):
                i += 1
                print(f"结算{i}次")


g=yys(choose_device())
# g.fighting_skills()
