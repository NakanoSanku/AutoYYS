import json
from time import sleep

from loguru import logger

from yys.core import YYS
from yys.tasks.feature import Feature

with open("yys/config/业原火配置.json", encoding="utf-8") as fp:
    config = json.load(fp)


def click_fight(device: YYS):
    device.game_find_image(config["业原火_挑战_痴"], is_click=True)


def settle_view(device: YYS):
    if device.settle(**config["结算_视图"]):
        return True


class Sougenbi(Feature):
    def __init__(self, device: YYS, times: int, delay_time: int = 500) -> None:
        self.device = device
        self.times = times
        self.delay_time = delay_time
        self.start()

    def task(self):
        while self.times > 0 and self.running:
            click_fight(self.device)
            if settle_view(self.device):
                self.times -= 1
                logger.info("业原火剩余:{}次".format(self.times))
            sleep(self.delay_time / 1000)

    def get_times(self):
        return self.times
