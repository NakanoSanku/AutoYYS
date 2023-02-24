module.exports=function () {
    var releaseNotes = "该脚本基于无障碍权限\n";
    dialogs.build({
        title: "权限检查",
        content: releaseNotes,
        //positive: "立即下载",
        negative: "取消",
        neutral: "无障碍权限"
    })
        //.on("positive", download)
        .on("neutral", () => {
            auto();
            try {
                toastLog('已获取无障碍权限');
            } catch (error) {
                toastLog('叼毛！ 给我无障碍权限啊');
                toastLog("如果设置界面已开启，则关闭重新获取或重启设备");
            }
        })
        .show();
}