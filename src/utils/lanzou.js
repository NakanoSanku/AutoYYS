

var lanzou = {}
//解析API常量定义1
//https://github.com/HurryBy/CloudDiskAnalysis
//https://cloud.humorously.cn/api/lanzou.php
// const FILEDIR = "/sdcard/"
// const APIPATH = "/"
// const APILINKVAR = "?link="
// const APIPASSWORDVAR = "&pwd="
// const APIIDVAR = "?id="
// const FILENAME = "name"
// const FILEURl = "url"
// const SINGLEFILEINFO = ""

// //解析API常量定义2
// //https://github.com/huankong233/lanzou_url
//lanzou-api.vercel.app
const FILEDIR = "/sdcard/"
const APIPATH = "/api/"
const APILINKVAR = "?url="
const APIPASSWORDVAR = "&pass="
const APIIDVAR = "?id="
const FILENAME = "fileName"
const FILEURl = "fileUrl"
const SINGLEFILEINFO = "[0]"


/**
 * 解析蓝奏云下载直链
 * @param {str} fileUrl 蓝奏云直链
 * @param {str} fileName 文件路径
 * @returns 
 */
function lanzouParseDownload(fileUrl) {
    return http.get(fileUrl, {
        headers: {
            'Accept-Language': 'zh-CN,zh-TW;q=0.9,zh;q=0.8,en;q=0.7,pl;q=0.6'
        }
    }).request.toString().match(/(url=).*?(?=, tags=)/g)[0].replace("url=", "");
}


/**
 * 蓝奏云下载单文件
 * @param {str} parseApi 蓝奏云解析直链的api
 * @param {str} lanzouUrl 蓝奏云文件地址
 * @param {str} password 蓝奏云文件密码
 * @param {str} path 保存路径
 * @returns 文件路径
 */
lanzou.lanzouDownloadSingleFile = function (parseApi, lanzouUrl, password, path) {
    //链接生成
    if (path === undefined) path = FILEDIR;
    let url = parseApi + APIPATH + APILINKVAR + lanzouUrl;
    if (password !== undefined) url = url + APIPASSWORDVAR + password;
    //解析直链
    let res = http.get(url);
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
    } else {
        const fileInfo = eval("res.body.json().data" + SINGLEFILEINFO)
        const filePath = path + eval("fileInfo." + FILENAME)
        const fileUrl = eval("fileInfo." + FILEURl)

        //下载文件
        if (!files.exists(filePath)) {
            if (SINGLEFILEINFO === "[0]") {
                return [lanzouParseDownload(fileUrl), filePath]
            } else if (SINGLEFILEINFO === "") {
                return [fileUrl, filePath]
            }
        } else {
            toastLog("文件已存在!");
            return filePath
        }
    }
    return null
}
/**
 * 获取蓝奏云文件夹信息
 * @param {str} parseApi 蓝奏云解析直链的api
 * @param {str} lanzouUrl 蓝奏云文件地址
 * @param {str} password 蓝奏云文件密码
 * @returns 
 */
lanzou.lanzouGetFolder = function (parseApi, lanzouUrl, password) {
    let url = parseApi + APIPATH + APILINKVAR + lanzouUrl;
    if (password !== undefined) url = url + APIPASSWORDVAR + password
    let res = http.get(url);
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
    } else {
        return res.body.json().data
    }
}

/**
 * 通过蓝奏云id下载文件
 * @param {str} parseApi 蓝奏云解析直链的api
 * @param {str} lanzouId 蓝奏云文件id
 * @param {str} path 保存路径
 * @returns 文件路径
 */
lanzou.lanzouDownloadFileById = function (parseApi, lanzouId, path) {
    //生成链接
    if (path === undefined) path = FILEDIR
    let url = parseApi + APIPATH + APIIDVAR + lanzouId;
    //解析直链
    let res = http.get(url);
    if (res.statusCode != 200) {
        toast("请求失败: " + res.statusCode + " " + res.statusMessage);
    } else {
        const fileInfo = res.body.json().data[0]
        const filePath = path + eval("fileInfo." + FILENAME)
        const fileUrl = eval("fileInfo." + FILEURl)
        if (!files.exists(filePath)) {
            //下载文件
            if (!files.exists(filePath)) {
                if (SINGLEFILEINFO === "[0]") {
                    return [lanzouParseDownload(fileUrl), filePath]
                } else if (SINGLEFILEINFO === "") {
                    return [fileUrl, filePath]
                }
            } else {
                toastLog("文件已存在!");
                return filePath
            }
        }
    }
    return null
}
/**
 * 获取蓝奏云文件夹内最新上传的文件
 * @param {str} parseApi 蓝奏云解析直链的api
 * @param {str} lanzouUrl 蓝奏云文件地址
 * @param {str} password 蓝奏云文件密码
 * @param {str} path 保存路径
 */
lanzou.lanzouGetFolderNewFile = function (parseApi, lanzouUrl, password, path) {
    if (path === undefined) path = FILEDIR
    //获取文件夹信息
    //格式为[{"fileName":"","fileSize":"","fileTime":"","fileId":""}]
    let folderInfo = lanzou.lanzouGetFolder(parseApi, lanzouUrl, password)
    const filePath = path + eval("folderInfo[0]." + FILENAME)
    //通过文件id下载
    if (!files.exists(filePath)) {
        if (SINGLEFILEINFO === "[0]") {
            return lanzou.lanzouDownloadFileById(parseApi, folderInfo[0].fileId, filePath)
        } else if (SINGLEFILEINFO === "") {
            return [folderInfo[0].url, filePath]
        }
    } else {
        toastLog("文件已存在!");
        return filePath
    }
}

module.exports = lanzou