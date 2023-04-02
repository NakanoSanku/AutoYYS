from utils.images import Image
from utils.utils import Point
import cv2


color=Image.get_color(cv2.imread('./images/common/jade.bmp'),Point(3,3))

print(color)
