import numpy as np


class Point(object):
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f'Point({self.x}, {self.y})'

    def __str__(self):
        return f'({self.x}, {self.y})'


def random_number(bbox):
    """
    Generates a random coordinate within a given rectangular boundary.

    Args:
        bbox: A tuple containing four values (x_min, y_min, x_max, y_max), 
            representing the rectangular boundary. The coordinates should satisfy 
            he condition that x_min < x_max and y_min < y_max.

    Returns:
        A tuple containing two integers (x, y), which represent the randomly 
        generated coordinates within the given rectangular boundary.

    Raises:
        None.
    """
    x_min, y_min, x_max, y_max = bbox

    # Compute the center point of the rectangular boundary
    center_x, center_y = (x_min + x_max) / 2, (y_min + y_max) / 2

    # Compute the standard deviation of the rectangular boundary
    std_x, std_y = (x_max - x_min) / 6, (y_max - y_min) / 6

    # Generate random coordinates until a valid coordinate is found
    while True:
        x, y = np.random.normal(
            center_x, std_x), np.random.normal(center_y, std_y)
        if x_min <= x <= x_max and y_min <= y <= y_max:
            return round(x), round(y)
