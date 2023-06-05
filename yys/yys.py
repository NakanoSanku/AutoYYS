import json
import os
import random
import time
import cv2

from gameauto import Core
from gameauto.images import yolo_filter,YoloV3
from gameauto.core import random_number

DIR_PATH = os.path.dirname(__file__)

# load config json -> data
with open(f"{os.path.dirname(__file__)}/yysConfig.json", "r") as f:
    yysJson = json.load(f)


def readImgArr(imgPathArr):
    """读取图像并返回cv2图像字典

    Args:
        imgPathArr (array): 图像路径数组

    Returns:
        dict: cv2图像字典
    """

    imgArr = {}
    for imgPath in imgPathArr:
        imgArr[imgPath.split("/")[-1].split(".")[0]] = cv2.imread(
            "{}{}".format(DIR_PATH, imgPath)
        )
    return imgArr


class YYS(Core):
    def __init__(self, device_id):
        super().__init__(device_id)

    def settlement(
        self,
        template_path,
        target_path,
        region=None,
        threshold=0.8,
        is_color=False,
        color_threshold=30,
        method=1,
        settlementArray=[[10, 120, 250, 550], [1100, 50, 1280, 720]],
    ):
        if self.miniFindImage(
            template_path, target_path, region, threshold, is_color, color_threshold
        ):
            cf = settlementArray[random.randint(0, len(settlementArray) - 1)]
            while True:
                target_path = self.captureScreen()
                self.detectionCollaboration(target_path)
                if self.miniFindImage(
                    template_path,
                    target_path,
                    region,
                    threshold,
                    is_color,
                    color_threshold,
                ):
                    if method == 2 and isinstance(settlementArray[0], tuple):
                        cf = settlementArray[
                            random.randint(0, len(settlementArray) - 1)
                        ]
                        print("个性化结算")
                        self.miniRandomClick(method=2, point=cf)
                    else:
                        print("随机结算")
                        self.miniRandomClick(region=cf)
                    time.sleep(0.2)
                else:
                    return True
        return False

    def fightCommon(self, mode: str, times: int, leader=False):
        """御魂/御灵/业原火

        Args:
            mode (str): Soul/Fire/Spirit
            times (int): 次数
            leader (bool, optional): 是否为御魂队长. Defaults to False.
        """
        i = 0
        data = readImgArr(yysJson[mode])
        while i < times:
            time.sleep(0.8)
            Screenshot = self.captureScreen()
            self.detectionCollaboration(Screenshot)
            if leader or mode != "Soul":
                self.miniFindImage(
                    data[mode],
                    Screenshot,
                    is_color=leader,
                    is_click=True,
                    region=[1070, 540, 1270, 717],
                )
            if mode == "Soul" or mode == "Fire":
                if self.settlement(
                    data["SettleShow"], Screenshot, region=[1, 1, 139, 719]
                ):
                    i += 1
                    print(f"结算{i}次")
            elif mode == "Spirit":
                self.settlement(
                    data["SettleWin"], Screenshot, region=[400, 100, 600, 300]
                )
                if self.settlement(
                    data["SettleReward"], Screenshot, region=[500, 500, 800, 650]
                ):
                    i += 1
                    print(f"结算{i}次")

    # 简易版自动斗鸡
    def fightingSkills(self):
        i = 0
        data = readImgArr(yysJson["FightSkill"])
        while True:
            
            Screenshot = self.captureScreen()
            self.detectionCollaboration(Screenshot)
            self.miniFindImage(
                data["Ready"], Screenshot, is_click=True, region=[1100, 600, 1250, 700]
            )
            self.miniFindImage(
                data["FightSkill"],
                Screenshot,
                is_click=True,
                region=[1100, 500, 1250, 700],
            )
            self.miniFindImage(data["AutoFight"], Screenshot, is_click=True)
            self.miniFindImage(
                data["AutoReady"], Screenshot, is_click=True, region=[20, 120, 100, 200]
            )
            self.settlement(data["SettleWin"], Screenshot)
            self.settlement(data["SettleReward"], Screenshot)
            if self.settlement(data["SettleShow"], Screenshot):
                i += 1
                print(f"结算{i}次")
            time.sleep(0.8)

    def explore(self, times: int, sleepTime=0.8):
        """探索

        Args:
            times (int): 战斗次数
            sleepTime (float, optional): 单位秒,截图间隔时常,越低执行效率越高,cpu开销也会变高. Defaults to 0.8.
        """
        data = readImgArr(yysJson["Explore"])
        mark = 0
        i = 0
        smlMoveTimes = 0
        while i < times:
            
            time.sleep(sleepTime)
            Screenshot = self.captureScreen()
            self.detectionCollaboration(Screenshot)
            if self.miniFindImage(
                data["Chapter"], Screenshot, region=[1173, 521, 1234, 605]
            ):
                if not self.miniFindImage(data["Chest"], Screenshot, is_click=True):
                    self.miniFindImage(
                        data["Chapter"],
                        Screenshot,
                        is_click=True,
                        region=[1173, 521, 1234, 605],
                    )
                    time.sleep(0.5)
                    print("选择章节")
                    Screenshot = self.captureScreen()
            self.miniFindImage(
                data["Explore"], Screenshot, is_click=True, region=[854, 481, 1043, 598]
            )
            if (
                self.miniFindImage(
                    data["Formula"], Screenshot, region=[762, 615, 861, 715]
                )
                and mark == 0
            ):
                if self.miniFindImage(data["Boss"], Screenshot, is_click=True):
                    smlMoveTimes = 0
                    time.sleep(1)
                    Screenshot = self.captureScreen()
                    if not self.miniFindImage(data["Boss"], Screenshot):
                        print("探索完成")
                        mark = 1
                elif self.miniFindImage(data["Monster"], Screenshot, is_click=True):
                    smlMoveTimes = 0
                    time.sleep(1)
                else:
                    x1, y1 = random_number([1000, 115, 1100, 210])
                    x2, y2 = random_number([500, 115, 600, 210])
                    self.miniSmlMove(x1, y1, x2, y2, 50)
                    smlMoveTimes += 1
                    if smlMoveTimes == 5:
                        mark = 1
                        smlMoveTimes = 0
                    print("滑动")
                    time.sleep(0.5)

            if self.settlement(
                data["SettleShow"], Screenshot, region=[17, 600, 141, 710]
            ):
                i += 1
                print(f"{i}次结算完成")
            if mark == 1 and self.miniFindImage(
                data["Formula"], Screenshot, region=[762, 615, 861, 715]
            ):
                self.miniRandomClick(region=[27, 38, 65, 91])
                mark = 0
                time.sleep(1.5)
                Screenshot = self.captureScreen()
            self.miniFindImage(
                data["ExploreConfirm"],
                Screenshot,
                is_click=True,
                region=[655, 344, 931, 463],
            )
        i = 0
        while True:
            
            time.sleep(0.8)
            Screenshot = self.captureScreen()
            self.detectionCollaboration(Screenshot)
            if self.miniFindImage(data["Formula"], Screenshot):
                self.miniRandomClick(region=[27, 38, 65, 91])
            self.miniFindImage(
                data["ExploreConfirm"],
                Screenshot,
                is_click=True,
                region=[655, 344, 931, 463],
            )
            self.miniFindImage(
                data["Exit"], Screenshot, is_click=True, region=[1005, 102, 1089, 193]
            )
            if self.miniFindImage(
                data["Chapter"], Screenshot, region=[1173, 521, 1234, 605]
            ):
                i += 1
                if i == 5:
                    return

    def exploreYolo(self, times: int, sleepTime=0.8, class_name="hd"):
        """探索-Yolo版 精度有待改进(如果两个小怪重合容易点错),测试功能

        Args:
            times (int): 战斗次数
            sleepTime (float, optional): 单位秒,截图间隔时常,越低执行效率越高,cpu开销也会变高. Defaults to 0.8.
            class_names (str,optional): hd/exp/jb 红蛋,经验,金币 Defaults to hd.
        """
        data = readImgArr(yysJson["Explore"])
        mark = 0
        i = 0
        smlMoveTimes = 0
        net = YoloV3(
            param_path=f"{DIR_PATH}/yolo/yolov3-tiny_6700-opt.param",
            bin_path=f"{DIR_PATH}/yolo/yolov3-tiny-opt.bin",
            class_names=["", "exp", "hd", "jb"],
            num_threads=4,
            use_gpu=True,
        )
        while i < times:
            
            time.sleep(sleepTime)
            Screenshot = self.captureScreen()
            self.detectionCollaboration(Screenshot)
            if self.miniFindImage(
                data["Chapter"], Screenshot, region=[1173, 521, 1234, 605]
            ):
                if not self.miniFindImage(data["Chest"], Screenshot, is_click=True):
                    self.miniFindImage(
                        data["Chapter"],
                        Screenshot,
                        is_click=True,
                        region=[1173, 521, 1234, 605],
                    )
                    time.sleep(0.5)
                    print("选择章节")
                    Screenshot = self.captureScreen()
            self.miniFindImage(
                data["Explore"], Screenshot, is_click=True, region=[854, 481, 1043, 598]
            )
            if (
                self.miniFindImage(
                    data["Formula"], Screenshot, region=[762, 615, 861, 715]
                )
                and mark == 0
            ):
                yoloResult = yolo_filter(class_name, net.class_names, net(Screenshot), 0.5)
                if self.miniFindImage(data["Boss"], Screenshot, is_click=True):
                    smlMoveTimes = 0
                    time.sleep(1)
                    Screenshot = self.captureScreen()
                    if not self.miniFindImage(data["Boss"], Screenshot):
                        print("探索完成")
                        mark = 1
                elif len(yoloResult) > 0:
                    for y in yoloResult:
                        print(
                            "%d = %.5f at %.2f %.2f %.2f x %.2f\n"
                            % (y.label, y.prob, y.rect.x, y.rect.y, y.rect.w, y.rect.h)
                        )
                        xmin = 0 if y.rect.x - 200 < 0 else y.rect.x - 200
                        ymin = 0 if y.rect.y - 300 < 0 else y.rect.y - 300
                        xmax = 1279 if y.rect.x + 200 > 1279 else y.rect.x + 200
                        ymax = y.rect.y
                        if self.miniFindImage(
                            data["Monster"],
                            Screenshot,
                            is_click=True,
                            region=[
                                int(xmin),
                                int(ymin),
                                int(xmax),
                                int(ymax),
                            ],
                        ):
                            smlMoveTimes = 0
                            time.sleep(1)
                else:
                    x1, y1 = random_number([1000, 115, 1100, 210])
                    x2, y2 = random_number([500, 115, 600, 210])
                    self.miniSmlMove(x1, y1, x2, y2, 50)
                    smlMoveTimes += 1
                    if smlMoveTimes == 4:
                        mark = 1
                        smlMoveTimes = 0
                    print("滑动")
                    time.sleep(0.5)

            if self.settlement(
                data["SettleShow"], Screenshot, region=[17, 600, 141, 710]
            ):
                i += 1
                print(f"{i}次结算完成")
            if mark == 1 and self.miniFindImage(
                data["Formula"], Screenshot, region=[762, 615, 861, 715]
            ):
                self.miniRandomClick(region=[27, 38, 65, 91])
                mark = 0
                time.sleep(1.5)
                Screenshot = self.captureScreen()
            self.miniFindImage(
                data["ExploreConfirm"],
                Screenshot,
                is_click=True,
                region=[655, 344, 931, 463],
            )
        i = 0
        while True:
            
            time.sleep(0.8)
            Screenshot = self.captureScreen()
            self.detectionCollaboration(Screenshot)
            if self.miniFindImage(data["Formula"], Screenshot):
                self.miniRandomClick(region=[27, 38, 65, 91])
            self.miniFindImage(
                data["ExploreConfirm"],
                Screenshot,
                is_click=True,
                region=[655, 344, 931, 463],
            )
            self.miniFindImage(
                data["Exit"], Screenshot, is_click=True, region=[1005, 102, 1089, 193]
            )
            if self.miniFindImage(
                data["Chapter"], Screenshot, region=[1173, 521, 1234, 605]
            ):
                i += 1
                if i == 5:
                    return

    def breakthroughPensonal(self):
        # 初始化突破数组
        breakRegion = [
            [250, 144, 470, 270],
            [570, 144, 800, 270],
            [900, 144, 1130, 270],
            [250, 280, 470, 405],
            [570, 280, 800, 405],
            [893, 280, 1130, 405],
            [250, 420, 470, 540],
            [570, 420, 800, 540],
            [900, 420, 1130, 540],
        ]
        data = readImgArr(yysJson["Tupo"])
        # 初始化胜利/失败次数
        winTimes = failTimes = 0
        # 从探索界面进入突破界面
        while True:
            
            Screenshot = self.captureScreen()
            if self.miniFindImage(
                data["Tupo_person"],
                Screenshot,
                is_click=True,
                region=[1182, 212, 1277, 371],
                is_color=True,
                color_threshold=15,
            ):
                break
            self.miniFindImage(
                data["Tupo"], Screenshot, is_click=True, region=[229, 609, 329, 717]
            )
            time.sleep(0.5)
        # 突破过程
        while True:
            
            Screenshot = self.captureScreen()
            self.detectionCollaboration(Screenshot)
            # 查看当前突破胜利次数
            if self.miniFindImage(
                data["Formula"], Screenshot, region=[1196, 591, 1268, 688]
            ):
                time.sleep(1)
                for index in breakRegion[winTimes:]:
                    if self.miniFindImage(
                        data["Tupo_already"],
                        Screenshot,
                        region=index,
                        threshold=0.6,
                    ):
                        winTimes += 1
                print("winTimes:{}".format(winTimes))
            # 找到没有胜利的点击
            if self.miniFindImage(
                data["Formula"], Screenshot, region=[1196, 591, 1268, 688]
            ):
                for index in breakRegion[winTimes:]:
                    if not self.miniFindImage(
                        data["Tupo_already"],
                        Screenshot,
                        region=index,
                        threshold=0.6,
                    ):
                        self.miniRandomClick(index)
                        time.sleep(0.5)
                        Screenshot = self.captureScreen()
                        break
            if winTimes == 9:
                winTimes = failTimes = 0
            # 胜利8次且失败4次以内退出战斗
            if winTimes == 8 and failTimes < 4:
                if self.miniFindImage(
                    data["X2"], Screenshot, region=[68, 562, 179, 665]
                ):
                    self.miniRandomClick([20, 20, 30, 30])
                if self.miniFindImage(
                    data["Tupo_exit"],
                    Screenshot,
                    is_click=True,
                    region=[657, 361, 824, 478],
                ):
                    time.sleep(5)
            # 胜利次数小于3且失败次数大于0或者失败次数大于3刷新
            if (winTimes < 3 and failTimes > 0) or failTimes > 4:
                while True:
                    self.miniFindImage(
                        data["Refresh"],
                        Screenshot,
                        is_click=True,
                        region=[943, 545, 1155, 650],
                    )
                    if self.miniFindImage(
                        data["ConfirmRefresh"],
                        Screenshot,
                        is_click=True,
                        region=[646, 361, 869, 490],
                    ):
                        time.sleep(5)
                        if self.miniFindImage(
                            data["ConfirmRefresh"],
                            Screenshot,
                            region=[646, 361, 869, 490],
                        ):
                            break
                failTimes = winTimes = 0
            # 点击挑战
            if self.miniFindImage(
                data["Attack"], Screenshot, is_click=True, region=[144, 273, 1165, 718]
            ):
                time.sleep(5)
                Screenshot = self.captureScreen()
                # 如果5s后还能找到挑战就说明没票了
                if self.miniFindImage(
                    data["Attack"], Screenshot, region=[144, 273, 1165, 718]
                ):
                    break
            # 准备
            self.miniFindImage(
                data["Ready"], Screenshot, is_click=True, region=[1070, 493, 1279, 719]
            )
            # 胜利结算
            if self.settlement(
                data["SettleWin"], Screenshot, region=[330, 87, 647, 330]
            ):
                winTimes += 1
                print("winTimes:{}".format(winTimes))
            self.settlement(
                data["SettleReward"], Screenshot, region=[462, 376, 800, 667]
            )
            # 失败结算
            if self.settlement(
                data["SettleFail"],
                Screenshot,
                region=[329, 73, 623, 306],
            ):
                failTimes += 1
                print("failTimes:{}".format(failTimes))
            # 休息
            time.sleep(0.8)
        # 从突破界面退出到探索界面
        while True:
            
            Screenshot = self.captureScreen()
            self.detectionCollaboration(Screenshot)
            if self.miniFindImage(
                data["Exit"], Screenshot, is_click=True, region=[1141, 62, 1267, 190]
            ):
                time.sleep(3)
                Screenshot = self.captureScreen()
                # 如果5s后没能找到退出按钮就说明回到探索界面了
                if not self.miniFindImage(
                    data["Exit"], Screenshot, region=[1141, 62, 1267, 190]
                ):
                    return winTimes
            time.sleep(0.8)

    def returnCourtyard(self):
        """绝大多数场景返回到庭院"""
        data = readImgArr(yysJson["ReturnCourtyard"])
        while True:
            
            ScreenShot = self.captureScreen()
            time.sleep(0.8)
            if self.miniFindImage(
                data["Huahezhan"], ScreenShot, region=[739, 583, 850, 694]
            ):
                return
            self.miniFindImage(
                data["Return"],
                ScreenShot,
                threshold=0.6,
                region=[0, 0, 119, 118],
                is_click=True,
            )
            self.miniFindImage(
                data["Return2"],
                ScreenShot,
                threshold=0.6,
                region=[0, 0, 119, 118],
                is_click=True,
            )
            self.miniFindImage(
                data["Exit"],
                ScreenShot,
                threshold=0.5,
                region=[980, 0, 1278, 247],
                is_click=True,
            )
            self.miniFindImage(
                data["ExploreConfirm"],
                ScreenShot,
                region=[664, 349, 896, 453],
                is_click=True,
            )

    def diyuguiwang(self):
        self.returnCourtyard()
        pass

    def DailyTask():
        pass

    def detectionCollaboration(self, screenshot):
        
        self.miniFindImage(
            cv2.imread("{}/images/Accpet.png".format(DIR_PATH)),
            screenshot,
            region=[807, 364, 907, 461],
            is_click=True,
            threshold=0.6,
        )


# if __name__ == "__main__":
#     g = YYS(id)
#     # g.fightCommon("Spirit", 3)
#     # g.fighting_skills()
#     # g.exploreYolo(50, 0)
#     g.breakthroughPensonal()
#     if g.method == 1:
#         g.stop()
