//进群开车
const key = "x1Y80SgRXxd_WafMPXanbj9Jfdv8Rhqi"
module.exports =function () {
    try {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: "mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26jump_from%3Dwebapi%26k%3D" + key
        });
    } catch (error) {
        toastLog('叼毛QQ都不用的吗?')
    }

}