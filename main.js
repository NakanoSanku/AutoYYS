"ui";

const { lanzouGetFolderNewFile } = require("./src/utils/lanzou");

importClass(android.widget.SeekBar);
importClass(android.os.Build);
importClass(android.view.WindowManager);
importClass("androidx.recyclerview.widget.RecyclerView");
importClass("androidx.recyclerview.widget.ItemTouchHelper");
importClass("androidx.recyclerview.widget.GridLayoutManager");

var color = "#6699ff";

ui.layout(
  <drawer id="drawer">
    <vertical>
      <appbar bg="{{color}}">
        <toolbar id="toolbar" title="InsiderPro" />
        <tabs id="tabs" />
      </appbar>
      <frame>
        <viewpager id="viewpager">
          <frame w="*" h="*">
            <vertical>
              <list id="list" w="*" h="*">
                <card
                  w="*"
                  h="auto"
                  margin="10 5"
                  cardCornerRadius="5dp"
                  cardElevation="1dp"
                  gravity="center_vertical"
                >
                  <vertical padding="18 8" h="auto" marginBottom="12dp">
                    <horizontal gravity="center_vertical">
                      <text
                        textSize="20dp"
                        text="{{this.title}}"
                        textColor="{{this.color}}"
                        marginLeft="8dp"
                      />
                      <frame layout_weight="1" />
                      <text textSize="15sp" text="删除" textColor="red" />
                      <img
                        id="delete"
                        w="21"
                        h="21"
                        margin="5"
                        background="@drawable/ic_close_white_24dp"
                        backgroundTint="#FF0000"
                        clickable="true"
                      />
                    </horizontal>
                    <horizontal marginTop="2dp">
                      <text
                        textSize="15sp"
                        text="次数："
                        marginLeft="10dp"
                        layout_verticalCenter="true"
                      />
                      <input
                        inputType="number"
                        text="{{this.summary}} "
                        textSize="15sp"
                        marginLeft="2dp"
                        layout_verticalCenter="true"
                        id="times"
                      />
                      <frame layout_weight="1" />
                      <text textSize="15sp" text="启用" textColor="blue" />
                      <checkbox
                        id="done"
                        layout_verticalCenter="true"
                        layout_alignParentRight="true"
                        checked="{{this.done}}"
                      />
                    </horizontal>
                  </vertical>
                  <View bg="{{this.color}}" h="*" w="10" />
                </card>
              </list>
            </vertical>
          </frame>
          <frame>
            <scroll layout_weight="1">
              <vertical padding="16dp">
                <card
                  w="*"
                  h="auto"
                  margin="10 5"
                  cardCornerRadius="5dp"
                  cardElevation="1dp"
                  gravity="center_vertical"
                >
                  <vertical padding="18 8" h="auto" marginBottom="12dp">
                    <text
                      textSize="20sp"
                      marginBottom="14dp"
                      text="御魂配置"
                      marginTop="14dp"
                      marginLeft="14dp"
                    />
                    <horizontal>
                      <checkbox
                        id="队长模式"
                        marginRight="6dp"
                        text="队长模式"
                      />
                    </horizontal>
                  </vertical>
                  <View bg="{{color}}" h="*" w="10" />
                </card>
                <card
                  w="*"
                  h="auto"
                  margin="10 5"
                  cardCornerRadius="5dp"
                  cardElevation="1dp"
                  gravity="center_vertical"
                >
                  <vertical padding="18 8" h="auto" marginBottom="12dp">
                    <text
                      textSize="20sp"
                      marginBottom="14dp"
                      text="通用配置"
                      marginTop="14dp"
                      marginLeft="14dp"
                    />
                    <horizontal>
                      <checkbox
                        id="isWhile"
                        marginRight="6dp"
                        text="是否循环任务"
                      />
                    </horizontal>
                  </vertical>
                  <View bg="{{color}}" h="*" w="10" />
                </card>
                <card
                  w="*"
                  h="auto"
                  margin="10 5"
                  cardCornerRadius="5dp"
                  cardElevation="1dp"
                  gravity="center_vertical"
                >
                  <vertical padding="18 8" h="auto" marginBottom="12dp">
                    <text
                      textSize="20sp"
                      marginBottom="14dp"
                      text="推送服务"
                      marginTop="14dp"
                      marginLeft="14dp"
                    />
                    <horizontal>
                      <checkbox
                        id="isUsePushplus"
                        marginRight="6dp"
                        text="启用pushplus"
                        w="auto"
                      />
                    </horizontal>
                    <horizontal>
                      <text text="Token:" textColor="blue" textStyle="bold"></text>
                      <input id="pushplusToken" w="*">
                      </input>
                    </horizontal>
                    <text autoLink="web" text="pushplus官网: https://www.pushplus.plus/" textStyle="bold" ></text>
                  </vertical>
                  <View bg="{{color}}" h="*" w="10" />
                </card>
                <card
                  w="*"
                  h="auto"
                  margin="10 5"
                  cardCornerRadius="5dp"
                  cardElevation="1dp"
                  gravity="center_vertical"
                >
                  <vertical padding="18 8" h="auto" marginBottom="12dp">
                    <text
                      textSize="20sp"
                      marginBottom="14dp"
                      text="高级配置"
                      marginTop="14dp"
                      marginLeft="14dp"
                    />
                    <text text="警告!!!这是高级设置,相关知识不了解,请勿尝试" textColor="red" textStyle="bold"></text>
                    <horizontal>
                      <text text="配置文件路径:" textColor="blue" textStyle="bold"></text>
                      <input id="configPath" w="*"></input>
                    </horizontal>
                    <horizontal>
                      <text text="阴阳师应用名:" textColor="blue" textStyle="bold"></text>
                      <input id="yysName" w="*" hint="阴阳师"></input>
                    </horizontal>
                  </vertical>
                  <View bg="{{color}}" h="*" w="10" />
                </card>
              </vertical>
            </scroll>
          </frame>
          <frame>
            <globalconsole id="globalconsole" w="*" h="*" />
          </frame>
        </viewpager>
        <fab
          id="start"
          w="auto"
          h="auto"
          src="@drawable/ic_play_arrow_black_48dp"
          margin="16"
          layout_gravity="bottom|center"
          tint="#ffffff"
        />
        <fab
          id="add"
          w="auto"
          h="auto"
          src="@drawable/ic_add_black_48dp"
          margin="16"
          layout_gravity="bottom"
          tint="#ffffff"
        />
        <fab
          id="fabMenu"
          w="auto"
          h="auto"
          src="@drawable/ic_menu_black_48dp"
          margin="16"
          layout_gravity="bottom|right"
          tint="#ffffff"
        />
      </frame>
    </vertical>
    <vertical layout_gravity="left" bg="#ffffff" w="280">
      <img
        w="280"
        h="200"
        scaleType="fitXY"
        src="https://w.wallhaven.cc/full/g7/wallhaven-g739zl.jpg"
      />
      <list id="menu">
        <horizontal bg="?selectableItemBackground" w="*">
          <img
            w="50"
            h="50"
            padding="16"
            src="{{this.icon}}"
            tint="{{color}}"
          />
          <text
            textColor="black"
            textSize="15sp"
            text="{{this.title}}"
            layout_gravity="center"
          />
        </horizontal>
      </list>
    </vertical>
  </drawer>
);
var storage = storages.create("todoList");

/**
 * 启动按钮
 */
var value = false;
var runThread = null;
ui.start.on("click", () => {
  if (value) {
    if (runThread) {
      runThread.getEngine().forceStop();
      runThread = null;
      toastLog("已停止");
    } else {
      toastLog("没有运行中的脚本");
    }
  } else {
    saveUiValue();
    if (runThread) {
      runThread.getEngine().forceStop();
      runThread = null;
    }
    runThread = engines.execScriptFile("./start.js");
    setTimeout(() => {
      toastLog("脚本启动中！请耐心等待");
    }, 500);
    setTimeout(function () {
      if (runThread != null) runThread.getEngine().emit("value", !value);
    }, 3000);
  }
  setTimeout(() => {
    fabMenuState = !fabMenuState;
    changeFabMenuState(fabMenuState);
  }, 200);
  value = !value;
  ui.start.attr("backgroundTint", value ? "#ED524E" : "#03a9f4");
  ui.start.attr(
    "src",
    value
      ? "@drawable/ic_stop_black_48dp"
      : "@drawable/ic_play_arrow_black_48dp"
  );
});

//设置状态栏颜色
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
  let window = activity.getWindow();
  window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
  window.setStatusBarColor(colors.parseColor(color));
  window.setNavigationBarColor(colors.parseColor("#FFFFFF"));
}
/**
 * 右上角菜单
 */
//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", (menu) => {
  menu.add("清空日志");
  menu.add("保存日志");
  menu.add("使用说明");
  menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
  switch (item.getTitle()) {
    case "使用说明":
      toast("还没有说明");
      break;
    case "关于":
      alert("关于", "insider v1.0.0");
    case "清空日志":
      console.clear();
      ui.globalconsole.clear();
      break;
    case "保存日志":
      console.setGlobalLogConfig({ file: "/sdcard/log.txt" });
      app.viewFile("/sdcard/log.txt");
      break;
  }
  e.consumed = true;
});

activity.setSupportActionBar(ui.toolbar);
/**
 * 滑动页面
 */
//设置滑动页面的标题
ui.viewpager.setTitles(["任务方案", "日常功能", "全局日志"]);
var fabMenuIsShow = true;
ui.viewpager.setOnTouchListener({
  onTouch: function (view, event) {
    switch (event.getAction()) {
      case 2:
        //拖动
        if (fabMenuIsShow) {
          ui.fabMenu.hide();
          fabMenuIsShow = false;
        }
        break;
      case 1:
        //抬起
        if (!fabMenuIsShow) {
          ui.fabMenu.show();
          fabMenuIsShow = true;
        }
        break;
    }
    return false;
  },
});
ui.list.setOnTouchListener({
  onTouch: function (view, event) {
    switch (event.getAction()) {
      case 2:
        //拖动
        if (fabMenuIsShow) {
          ui.fabMenu.hide();
          fabMenuIsShow = false;
        }
        break;
      case 1:
        //抬起
        if (!fabMenuIsShow) {
          ui.fabMenu.show();
          fabMenuIsShow = true;
        }
        break;
    }
    return false;
  },
});

// })
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
/**
 * 侧拉菜单
 */
//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
  {
    title: "检查更新",
    icon: "@drawable/ic_android_black_48dp",
  },
  {
    title: "权限检查",
    icon: "@drawable/ic_settings_black_48dp",
  },
  {
    title: "进群开车",
    icon: "@drawable/ic_favorite_black_48dp",
  },
  {
    title: "退出脚本",
    icon: "@drawable/ic_exit_to_app_black_48dp",
  },
]);

let downloadRunning = false;
ui.menu.on("item_click", (item) => {
  switch (item.title) {
    case "退出脚本":
      ui.finish();
      break;
    case "进群开车":
      //   toDrive();
      break;
    case "权限检查":
      //checkPermission();
      break;
    case "检查更新":
      var downloadDialog = null;
      var downloadId = null;
      var downloadProgress = null;
      var releaseNotes = " v1.0.11\n" + "更新日志:\n" + "修复若干bug"
      function download() {
        downloadDialog = dialogs.build({
          title: "发现新版本",
          positive: "更新",
          negative: "取消",
          content: releaseNotes,
          progress: {
            max: 100,
            showMinMax: true
          },
          autoDismiss: false
        })
          .on("positive", () => {
            startDownload();
          })
          .on("negative", () => {
            stopDownload();
            downloadDialog.dismiss();
            downloadDialog = null;
          })
          .show();
      }

      function startDownload() {
        //监听确定键
        if (!downloadRunning) {
          downloadId = threads.start(function () {
            const APIURL = "https://cloud.humorously.cn/api/lanzou.php"
            const LANZOUURL = "https://wwxn.lanzoue.com/b00r4c8ah"
            const PASSWORD = "9jw9"
            toastLog("文件下载中,小心我榨干你哦");
            importClass(java.io.FileOutputStream);
            importClass(java.net.URL);
            //初始化下载参数
            let byteSum = 0; //总共读取的文件大小
            let byteRead = 0; //每次读取的byte数
            let buffer = util.java.array('byte', 1024); //byte[]
            progress = 0
            var d = dialogs.build({
              title: "检查更新中...",
              progress: {
                max: -1
              },
              cancelable: false
            }).show();
            downloadDialog.dismiss();
            let fileInfo;
            try {
              fileInfo = lanzouGetFolderNewFile(APIURL, LANZOUURL, PASSWORD);
            }
            catch(error) {
              toastLog("网络错误,请重试")
              d.dismiss();
              return;
            }
            d.dismiss();
            downloadDialog.show();
            sleep(1000);
            if (typeof (fileInfo) !== "string") {
              var myUrl = new URL(fileInfo[0]);
              var conn = myUrl.openConnection(); //URLConnection
              inStream = conn.getInputStream(); //InputStream
              fs = new FileOutputStream(fileInfo[1]); //FileOutputStream
              connLength = conn.getContentLength(); //int
              while ((byteRead = inStream.read(buffer)) != -1) {
                byteSum += byteRead;
                fs.write(buffer, 0, byteRead); //读取
                progress = ((byteSum / connLength) * 100).toFixed();
              }
            }
            downloadDialog.dismiss();
            downloadDialog = null;
            if (fileInfo !== null) {
              if (typeof (fileInfo) === "string") {
                app.viewFile(fileInfo);
              } else {
                app.viewFile(fileInfo[1]);
              }
            }
          })
          downloadProgress = setInterval(() => {
            if (progress >= 100) {
              toastLog("下载完成")
              clearInterval(downloadProgress);
            }
          }, 20);
        } else {
          toastLog("在下了,别急叼毛");
        }
      }

      function stopDownload() {
        if (downloadId !== null) {
          downloadId.interrupt();
        }
        if (downloadProgress !== null) {
          clearInterval(downloadProgress);
        }
      }
      download();
  }
});
/**
 * 首页任务方案配置
 */
var materialColors = [
  "#cfcbd2",
  "#cb98ed",
  "#8b63da",
  "#591da9",
  "#051960",
  "#fbc2eb",
  "#78a3eb",
];

//从storage获取todo列表
var items = storage.get("items", [
  {
    title: "御魂",
    summary: 120,
    color: "#f44336",
    done: false,
  },
]);
//当离开本界面时保存todoList
ui.emitter.on("pause", () => {
  saveUiValue();
});
ui.emitter.on("resume", () => {
  initUiValue();
});
initUiValue(); //初始化各种值

ui.list.setDataSource(items);

ui.list.on("item_bind", function (itemView, itemHolder) {
  //绑定勾选框事件
  itemView.done.on("check", function (checked) {
    let item = itemHolder.item;
    item.done = checked;
  });
});

ui.list.on("item_click", function (item, i, itemView, listView) {
  itemView.done.checked = !itemView.done.checked;
});
ui.list.on("item_bind", function (itemView, itemHolder) {
  //删除数据
  itemView.delete.on("click", () => {
    items.splice(itemHolder.position, 1);
  });
});
ui.list.on("item_bind", function (itemView, itemHolder) {
  //修改数据
  itemView.times.addTextChangedListener({
    afterTextChanged: function (s) {
      itemHolder.item.summary = parseInt(s);
    },
  });
});

var yyslist = [
  "御魂",
  "业原火",
  "御灵",
  "探索",
  "个人突破",
  // "寮突",
  //"活动",
  //"自动奉纳",
  "测试",
];
ui.add.on("click", () => {
  fabMenuState = !fabMenuState;
  changeFabMenuState(fabMenuState);
  setTimeout(function () {
    dialogs.select("选择要使用的功能", yyslist).then((key) => {
      if (key == -1) return;
      var title = yyslist[key];
      dialogs.rawInput("请输入次数", "999").then((summary) => {
        var n = parseInt(summary);
        if (n) {
          items.push({
            title: title,
            summary: n,
            color: materialColors[items.length % (materialColors.length - 1)],
          });
          //通知最后一项数据更新
          ui.list.adapter.notifyItemChanged(items.length);
        }
      });
    });
  }, 250);
});

var fabMenuState = false;
ui.fabMenu.on("click", () => {
  fabMenuState = !fabMenuState;
  changeFabMenuState(fabMenuState);
});

//功能实现
function initUiValue() {
  //御魂
  ui.队长模式.setChecked(storage.get("队长模式", false));
  ui.isWhile.setChecked(storage.get("isWhile", false));
  ui.isUsePushplus.setChecked(storage.get("isUsePushplus", false));
  ui.pushplusToken.setText(storage.get("pushplusToken", ""))
  ui.configPath.setText(storage.get("configPath", ""))
  ui.yysName.setText(storage.get("yysName", "阴阳师"))
  changeFabMenuState(false);
}

// ui.SavePushplusToken.on("click", () => {
//   storage.put("pushplusToken", ui.pushplusToken.text);//循环任务配置
// })
//手动保存ui中各种值
function saveUiValue() {
  storage.put("items", items);
  storage.put("队长模式", ui.队长模式.checked);//御魂队长模式配置
  storage.put("isWhile", ui.isWhile.checked);//循环任务配置
  storage.put("isUsePushplus", ui.isUsePushplus.checked);//循环任务配置
  storage.put("pushplusToken", ui.pushplusToken.getText().toString());//循环任务配置
  storage.put("configPath", ui.configPath.getText().toString());//循环任务配置
  storage.put("yysName", ui.yysName.getText().toString());//循环任务配置
}
function changeFabMenuState(state) {
  if (state) {
    ui.start.show();
    ui.add.show();
  } else {
    ui.start.hide();
    ui.add.hide();
  }
}
/**
 * RecyclerView手势器：
 * 参考文章: https://www.jb51.net/article/141459.htm
 */
let helper = new ItemTouchHelper(
  new ItemTouchHelper.Callback({
    getMovementFlags: function (recyclerView, viewHolder) {
      //指定支持的拖放方向为上下
      let dragFrlg = ItemTouchHelper.UP | ItemTouchHelper.DOWN;
      return this.makeMovementFlags(dragFrlg, 0);
    },

    onMove: function (recyclerView, viewHolder, target) {
      //得到当拖拽的viewHolder的Position
      let fromPosition = viewHolder.getAdapterPosition();
      let toPosition = target.getAdapterPosition();
      if (fromPosition < toPosition) {
        for (let i = fromPosition; i < toPosition; i++) {
          //数组指定元素交换位置
          swapArray(ary, i, i + 1);
        }
      } else {
        for (let i = fromPosition; i > toPosition; i--) {
          swapArray(ary, i, i - 1);
        }
      }
      //通知适配器移动Item的位置
      recyclerView.adapter.notifyItemMoved(fromPosition, toPosition);
      return true;
    },

    isLongPressDragEnabled: function () {
      return true;
    },

    /**
     * 长按选中Item的时候开始调用
     * 长按高亮
     * @param viewHolder
     * @param actionState
     */
    onSelectedChanged: function (viewHolder, actionState) {
      this.super$onSelectedChanged(viewHolder, actionState);
      if (actionState != ItemTouchHelper.ACTION_STATE_IDLE) {
        //改变选中Item的背景色
        viewHolder.itemView.attr("backgroundTint", "#7AFFFFFF");
        //震动7毫秒
        device.vibrate(7);
        ary = new Array();
        for (let i in items) ary.push(items[i]);
      }
    },

    /**
     * 手指松开的时候还原高亮
     * @param recyclerView
     * @param viewHolder
     */
    clearView: function (recyclerView, viewHolder) {
      this.super$clearView(recyclerView, viewHolder);
      viewHolder.itemView.attr("backgroundTint", "#FFFFFF");
      items = ary;
      recyclerView.setDataSource(items);
      recyclerView.adapter.notifyDataSetChanged(); //完成拖动后刷新适配器，这样拖动后删除就不会错乱
    },
  })
);

//设置手势器附着到对应的RecyclerView对象。
helper.attachToRecyclerView(ui.list);

/**
 * 数组元素交换位置
 * @param {array} arr 数组
 * @param {number} index1 添加项目的位置
 * @param {number} index2 删除项目的位置
 * index1和index2分别是两个数组的索引值，即是两个要交换元素位置的索引值，如1，5就是数组中下标为1和5的两个元素交换位置
 */
function swapArray(arr, index1, index2) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}
