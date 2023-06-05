from yys import YYS
game= YYS("127.0.0.1:16384")
#演示
game.explore(10,0.5)
if game.method == "MiniDevice":
    game.stop()