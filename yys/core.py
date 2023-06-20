import random
import time

import cv2
import numpy as np
from yys.algo import RANDOM_POINT_METHOD, SLIDE_PATH_METHOD
from minidevice import Images, MiniDevice


class YYS(MiniDevice):
    def __init__(self, device, screen_cap_method="DroidCast", touch_method="Minitouch"):
        super().__init__(device, screen_cap_method, touch_method)

    def settle(
        self,
        template_path: str | cv2.Mat,
        region: list = None,
        use_match=False,
        threshold=0.8,
        is_color=False,
        color_threshold=4,
        level=3,
        scale=1,
        match_method="FLANNBASED",
        method=1,
        settlementArray: list = [[10, 120, 250, 550], [1100, 50, 1280, 720]],
    ) -> list|None:
        params = {
            "template_path": template_path,
            "region": region,
            "threshold": threshold,
            "is_color": is_color,
            "color_threshold": color_threshold,
            "use_match": use_match,
            "level": level,
            "scale": scale,
            "match_method": match_method,
        }
        result = self.game_find_image(params)
        if result:
            cf = settlementArray[random.randint(0, len(settlementArray) - 1)]
            while True:
                if self.game_find_image(params):
                    if method == 2 and isinstance(settlementArray[0], tuple):
                        cf = settlementArray[
                            random.randint(0, len(settlementArray) - 1)
                        ]
                        self.random_click(method=2, point=cf)
                    else:
                        self.random_click(region=cf)
                    time.sleep(0.2)
                else:
                    return result
        return result
    
    def random_click(
        self,
        region: list,
        point=None,
        method=1,
        random_point_method="NormalDistribution",
    ):
        """随机点击

        Args:
            region (list): [x_min, y_min, x_max, y_max]
            point (tuple, optional): 坐标点. Defaults to None.
            method (int, optional): 1:范围随机点击需传入region 2:定点点击. Defaults to 1.
        """
        p = [0, 0]
        if region != None:
            point_algo = RANDOM_POINT_METHOD.get(
                random_point_method, "NormalDistribution"
            )
            p[0], p[1] = point_algo(region)

        if method == 2 and point != None:
            p[0], p[1] = point
            self.click(p[0], p[1], random.randint(80, 150))
        else:
            i = abs(np.random.normal(0, 30))
            if i > 90:
                self.swipe(
                    p[0],
                    p[1],
                    p[0] + random.randint(0, 3),
                    p[1] + random.randint(0, 3),
                    time=random.randint(200, 350),
                )
                # print("滑动")
            elif i > 60:
                self.click(p[0], p[1], random.randint(300, 600))
                # print(f"长按{p}")
            else:
                self.click(p[0], p[1], random.randint(80, 150))
                # print(f"点击{p}")
        time.sleep(random.randint(80, 120) / 1000)

    def slide(
        self, start_x, start_y, end_x, end_y, time=500, slide_method="BezierCurve"
    ):
        slide_algo = SLIDE_PATH_METHOD.get(slide_method, "BezierCurve")
        slidingPath = slide_algo(start_x, start_y, end_x, end_y)
        self.swipe(slidingPath, duration=time)

    def game_find_image(self, img_config:dict, is_click=False):
        """游戏找图点击"""
        result = find_image(**img_config, img_path=self.get_screen())
        if is_click and result:
            self.random_click(result)
        return result


def find_image(
    img_path: str | cv2.Mat,
    template_path: str | cv2.Mat,
    use_match=False,
    threshold=0.8,
    region=None,
    is_color=False,
    color_threshold=4,
    level=3,
    scale=1,
    match_method="FLANNBASED",
) -> list | None:
    """
    find_image 找图进阶

    Args:
        img_path (str | cv2.Mat): 大图图像地址或者opencv格式图像
        template_path (str | cv2.Mat): 小图图像地址或者opencv格式图像
        use_match (bool, optional): 是否使用特征点匹配. Defaults to False.
        threshold (float, optional): 找图相似度. Defaults to 0.8.
        region (_type_, optional): 找图范围[x_min,y_min,x_max,y_max]. Defaults to None.
        is_color (bool, optional): 是否判断颜色. Defaults to False.
        color_threshold (int, optional): 颜色相似度. Defaults to 4.
        level (int, optional): 模板匹配缩放金字塔等级. Defaults to 3.
        scale (int, optional): 特征点匹配缩放比例. Defaults to 1.
        match_method (str, optional): 特征点匹配算法. Defaults to "FLANNBASED".

    Returns:
        找图结果 (list|None): [x_min,y_min,x_max,y_max]
    """
    flag = cv2.IMREAD_COLOR if is_color else cv2.IMREAD_GRAYSCALE
    # 读取模板图像和目标图像
    template = (
        Images.read(template_path, flag)
        if isinstance(template_path, str)
        else template_path
    )
    img = Images.read(img_path, flag) if isinstance(img_path, str) else img_path
    if not is_color:
        if template.shape == 3:
            template = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # 找图
    if use_match:
        result = Images.match_features(
            img, template, region, threshold, match_method, scale
        )
    else:
        result = Images.find_image(img, template, threshold, region, level)

    if result is not None:
        xmin, ymin, _, _ = result
        # 找色
        if is_color:
            if (
                Images.find_color(
                    img,
                    Images.pixel(template, 0, 0),
                    [xmin, ymin, xmin + 10, ymin + 10],
                    color_threshold,
                )
                is None
            ):
                return None
        return result
    else:
        return None


