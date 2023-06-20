from abc import ABC, abstractmethod
import threading


class Feature(ABC):
    def __init__(self) -> None:
        self.thread = threading.Thread(target=self.task)
        self.running = False

    @abstractmethod
    def task():
        """任务逻辑"""

    def start(self):
        """启动逻辑"""
        self.running = True
        self.thread.start()

    def stop(self):
        """终止逻辑"""
        self.running = False
        self.thread.stop()
