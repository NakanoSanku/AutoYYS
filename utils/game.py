import random
import time
import cv2
import numpy as np
from utils.images import Image

from utils.utils import Point, random_number
from uiautomator2 import Device


class Game(Device):
    def __init__(self, serial_or_url=None):
        super().__init__(serial_or_url)

    def find_image(self, params):
        """
        在目标图像中查找与模板图像最相似的部分

        Args:
            params: 一个字典，包含以下参数：
                - template_path: 模板图像的路径
                - target_path: 目标图像的路径
                - region: 指定在目标图像中查找的区域,格式为(x_min, y_min, x_max, y_max),默认为None表示查找整张图片
                - threshold: 相似度的阈值,取值为0~1之间,默认为0.8
                - is_click: 是否点击图像

        Returns:
            一个包含2个元素的元组(x, y),表示查找到的最相似部分在目标图像中的左上角坐标,如果未找到则返回None
        """
        template_path = params.get('template_path')
        region = params.get('region')
        threshold = params.get('threshold', 0.8)
        is_click = params.get('is_click', False)
        target_path = params.get('target_path', "./screenshot.png")
        is_color = params.get('is_color', False)
        color_threshold = params.get('color_threshold', 30)

        self.screenshot(target_path)
        # 读取模板图像和目标图像
        template = cv2.imread(template_path, cv2.IMREAD_GRAYSCALE)
        target = cv2.imread(target_path, cv2.IMREAD_GRAYSCALE)

        # 设置查找区域
        if region is not None:
            x_min, y_min, x_max, y_max = region
            target = target[y_min:y_max, x_min:x_max]

        # 匹配模板图像
        res = cv2.matchTemplate(target, template, cv2.TM_CCOEFF_NORMED)

        # 选择相似度最高的一个结果
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
        if max_val < threshold:
            return None

        # 转换坐标系
        if region is not None:
            max_loc = (max_loc[0] + x_min, max_loc[1] + y_min)

        if is_color:
            if Image.find_color(target, Image.get_color(template, Point(0, 0)), [0, 0, 10, 10], color_threshold):
                return None

        if is_click:
            self.random_click([max_loc[0], max_loc[1], max_loc[0] +
                               template.shape[1], max_loc[1]+template.shape[0]])
            
        
        #调试用
        print(params)    
        print(f"找到了{template_path}")
        

        # 返回匹配结果
        return (max_loc[0], max_loc[1])

    def random_click(self, region, point=None, method=1):
        p = Point(0, 0)
        if (region != None):
            p.x, p.y = random_number(region)

        if method == 2 and point != None:
            p.x, p.y = point
            self.long_click(p.x, p.y, random.randint(80, 150)/1000)
        else:
            i = abs(np.random.normal(0, 30))
            if (i > 90):
                self.sml_move(p.x, p.y, p.x + random.randint(0, 3), p.y +
                              random.randint(0, 3), time=0.02)
                print('滑动')
            elif (i > 60):
                self.long_click(p.x, p.y, random.randint(300, 600)/1000)
                print(f'长按{p}')
            else:
                self.long_click(p.x, p.y, random.randint(80, 150)/1000)
                print(f'点击{p}')
        time.sleep(random.randint(80, 120)/1000)

    def sml_move(self, qx, qy, zx, zy, time):
        slidingPath = []
        point = [
            {'x': qx, 'y': qy},
            {'x': random.randint(qx - 100, qx + 100),
             'y': random.randint(qy, qy + 50)},
            {'x': random.randint(zx - 100, zx + 100),
             'y': random.randint(zy, zy + 50)},
            {'x': zx, 'y': zy}
        ]
        cx = 3.0 * (point[1]['x'] - point[0]['x'])
        bx = 3.0 * (point[2]['x'] - point[1]['x']) - cx
        ax = point[3]['x'] - point[0]['x'] - cx - bx
        cy = 3.0 * (point[1]['y'] - point[0]['y'])
        by = 3.0 * (point[2]['y'] - point[1]['y']) - cy
        ay = point[3]['y'] - point[0]['y'] - cy - by
        t_values = np.arange(0, 1, 0.08)
        t_squared = t_values * t_values
        t_cubed = t_squared * t_values
        x_values = ax * t_cubed + bx * t_squared + \
            cx * t_values + point[0]['x']
        y_values = ay * t_cubed + by * t_squared + \
            cy * t_values + point[0]['y']
        slidingPath.extend([(int(x), int(y))
                           for x, y in zip(x_values, y_values)])
        self.swipe_points(slidingPath, time)
        return
