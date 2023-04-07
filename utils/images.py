class Image(object):
    @staticmethod
    def compare_color(image, point, color, tolerance=0):
        """
        比较某一图像中某点的颜色值是否和传入颜色参数值相等。

        参数：
        - image: 图像 Mat格式
        - point: 坐标点 Point对象
        - color: 需要比较的颜色值，例如 "#FF0000" 表示红色
        - tolerance: 允许的颜色差异程度

        返回值：
        - 如果传入的颜色值和指定点的颜色值相等，返回 True,否则返回 False。
        """
        # 将颜色值转换为 RGB 分量值
        r = int(color[1:3], 16)
        g = int(color[3:5], 16)
        b = int(color[5:7], 16)
        pixel_color = image[point.y, point.x]
        # 比较颜色值
        if abs(pixel_color[2] - r) <= tolerance and \
                abs(pixel_color[1] - g) <= tolerance and \
                abs(pixel_color[0] - b) <= tolerance:
            return True
        else:
            return False

    @staticmethod
    def get_color(image, point):
        """
        获取图像中指定位置的颜色值，并将其转换为 16 进制格式。

        参数：
        - image:图像 Mat格式
        - point (x,y) 坐标点 Point对象

        返回值：
        - 该点的颜色值，格式为 "#RRGGBB"
        """

        # 获取指定点的颜色值（BGR 格式）
        pixel_color = image[point.y, point.x]

        # 将 BGR 格式转换为 RGB 格式
        rgb_color = pixel_color[::-1]

        # 将 RGB 分量值转换为 16 进制格式
        hex_color = "#{:02X}{:02X}{:02X}".format(
            rgb_color[0], rgb_color[1], rgb_color[2])

        return hex_color

    @staticmethod
    def find_color(image, color, region=None, tolerance=0):
        # 设置查找区域
        if region is not None:
            x_min, y_min, x_max, y_max = region
            image = image[y_min:y_max, x_min:x_max]

        for x in range(image.shape[1]):
            for y in range(image.shape[0]):
                # 将颜色值转换为 RGB 分量值
                r = int(color[1:3], 16)
                g = int(color[3:5], 16)
                b = int(color[5:7], 16)
                pixel_color = image[y, x]
                # 比较颜色值
                if abs(pixel_color[2] - r) <= tolerance and \
                        abs(pixel_color[1] - g) <= tolerance and \
                        abs(pixel_color[0] - b) <= tolerance:
                    return x, y
        return None
