import random
import json
from utils import Game, choose_device


# #load config json -> data 
# with open('./config.json', "r") as f:
#     data = json.load(f)

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

    # def fight_common(self, config):
    #     mode = config.get('mode')
    #     times = config.get('times')
    #     leader = config.get('leader', False)
    #     i = 0
    #     while i < times:
    #         if leader and mode.get("name") != 'soul':
    #             self.find_image(mode)
    #         if mode.get("name") != 'soul' or mode.get("name") != 'soul':
    #             self.settlement(data["settlement1"])
    #         elif mode.get("name") != 'soul':
    #             self.settlement()
