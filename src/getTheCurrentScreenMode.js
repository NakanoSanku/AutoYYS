module.exports = function () {
    var res = false;
    if (device.height>device.width) {
        toastLog('手机模式');
        res = true;
    } else {
        toastLog('平板模式');
    }
    return res;
}