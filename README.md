# autojs for yys
## 特性
- [x] 找图-支持判断颜色是否为正确颜色，集成点击图片操作
- [x] 随机点击-正态分布 
- [x] 曲线滑动-三次贝塞尔曲线
- [x] 自动获取找图范围并保存到json配置中(用于实现更换分辨率后效率更高)
- [x] UI界面-任务配置,添加删除

## 说明
启动前检查根目录是否存在insider文件夹，并包含img文件夹以及yys.json

## 进阶
可自行更换img文件夹目录来实现其他分辨率使用脚本，对应图片更换即可，并将yys.json更改为默认的
yys.json可将settleWin/settleView/settleReward的method更换为1并且修改settlementArray数组来实现自定义结算