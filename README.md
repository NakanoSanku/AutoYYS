# auto-yys-py
未来将持续使用python进行脚本开发

(autojs已停止维护,原因很多，最主要的是他的拓展性被定格了(包括多线程截图问题我无法解决),并且随时可能无法使用)

整体脚本架构重写,采用我的另个项目[minidevice](https://github.com/NakanoSanku/minidevice)作为整体游戏脚本框架

目前ui采用pywebio编写网页ui(临时的)后续会考虑轻巧以及各方面性能影响因素选择ui

大概率是使用网页前端(~~后面有空把前端知识补充完整再说~~)

## Todo
- [x] 脚本基础架构 - [minidevice](https://github.com/NakanoSanku/minidevice)
- [ ] 任务调度器 - 计划任务调度采用策略模式的设计结构
- [ ] 任务进度通知器 - 计划采用观察者的设计结构
- [ ] ui界面 - 计划采用网页前端框架(具体还在考虑)
- [ ] 游戏逻辑 - 采用基础逻辑+json配置参数的方式
  
> 这方面要各个方面解耦难度较高的

