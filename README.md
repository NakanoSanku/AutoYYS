# Autojs For YYS
## 特性
傻瓜式启动脚本，主推一个几乎0学习成本的方式，简洁高效
---
## 设备支持
支持任意安卓7以上的设备(也就是说除了mumu6以外的主流模拟器都支持)

个人推荐使用
- [雷电9](https://www.ldmnq.com/) 
- [MuMu12](https://mumu.163.com/)

~~具体可以参考[Maa的模拟器测评](https://maa.plus/docs/1.3-%E6%A8%A1%E6%8B%9F%E5%99%A8%E6%94%AF%E6%8C%81.html)~~(已经过时了)

情况不同的是我们**只需考虑流畅度和无障碍是否支持**

---

## 功能一览
| 游戏功能 | 支持情况 |
| ----|----------|
| 御魂|✅|
| 御灵|✅|
| 探索|✅|
| 业原火|✅|
| 个人突破|✅|
| 探索指定怪|❌|
| 探索转突破|✅|
| 日常任务 |❌|
| 自动接收协作 |✅|
| 自动斗鸡 |✅|
| 契灵 |✅|

|其他功能|支持情况|
|-------|--------|
|[pushplus](https://www.pushplus.plus/)推送异常|❌|
|自定义配置|✅|
|循环任务|✅|
|全局日志|✅|

---

## 脚本特性
- [x] 找图-支持判断颜色是否为正确颜色，集成点击图片操作
- [x] 随机点击-正态分布 
- [x] 曲线滑动-三次贝塞尔曲线
- [x] 自动获取找图范围并保存到json配置中(用于实现更换分辨率后效率更高)
- [x] UI界面-任务配置,添加删除
![image.png](https://s2.loli.net/2023/06/03/7EzBDcJHvWTASQt.png)
![image.png](https://s2.loli.net/2023/06/03/rHQ8Fj24WobEvct.png)
![image.png](https://s2.loli.net/2023/06/03/Lj7ihG6t2qCnPuw.png)

---

## 使用说明
<!-- 启动前检查根目录是否存在insider文件夹，并包含img文件夹以及yys.json -->
- 突破最好取消阵容锁定功能

---

## 进阶配置(不推荐)
可自行更换[img](img/)文件夹目录来实现其他分辨率使用脚本，对应图片更换即可，并将[yys.json](yys.json)更改为默认的
yys.json可将settleWin/settleView/settleReward的method更换为1并且修改settlementArray数组来实现自定义结算