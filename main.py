# from yys.tasks import FEATURE
# from yys.core import YYS

# device = YYS("127.0.0.1:16384")
# feature = FEATURE.get("御魂")
# config = {"device": device, "times": 10, "delay_times": 500, "is_leader": True}
# feature(**config)
from functools import partial

from pywebio import start_server, config
from pywebio.input import *
from pywebio.output import *
from pywebio.pin import *
from pywebio.session import *
from minidevice.adb import ADB


def get_device_list():
    return [
        {"label": device[0], "value": device[0]}
        for device in ADB.list_devices_info()
        if device[-1] == "device"
    ]


config = {}


def pin_widgets():
    device_list = get_device_list()
    put_markdown("# 任务配置区域")
    options = [
        {
            "label": "御魂",
            "value": "御魂",
            "selected": True,
        },
        {
            "label": "业原火",
            "value": "业原火",
        },
        {"label": "探索", "value": "探索", "disabled": True},
        {"label": "突破", "value": "突破", "disabled": True},
        {"label": "御灵", "value": "御灵", "disabled": True},
    ]
    config["times"] = put_input(
        "times", type="number", label="次数", placeholder="输入执行次数"
    )
    config["device"] = put_select("device", options=device_list, label="选择设备id")
    feature = put_select("feature", options=options, label="选择功能")
    put_actions(
        "actions",
        buttons=[
            {"label": "提交任务", "value": "1"},
            {"label": "终止任务", "value": "2", "color": "warning"},
            {"label": "退出程序", "value": "3", "color": "danger"},
        ],
        label="Actions",
    )


def output_widgets():
    ###########################################################################################
    put_markdown("# 使用说明")
    put_row(
        [
            put_markdown(
                """
        ## 运行教程

        *填写下面的信息点击运行即可*

        > ~~这么直观了应该不会有人不会吧~~

        ## 项目相关
        - 作者:[NakanoSanku](https://github.com/NakanoSanku)
        - 支持库:
            - [OpenCV](https://github.com/opencv/opencv)
            - [pyminitouch](https://github.com/williamfzc/pyminitouch)
        - 工具:
            - 截图工具
                - [minicap](https://github.com/DeviceFarmer/minicap)
                - [DroidCast](https://github.com/rayworks/DroidCast)
                - ADB
            - 操作工具
                - [minitouch](https://github.com/DeviceFarmer/minitouch)
                - ADB

        > 以上工具和库构成本脚本的基础框架[minidevice](https://github.com/NakanoSanku/minidevice)
        """
            ),
            put_markdown(
                """
        ### 功能预览
        * 御灵
        * 御魂
          * 队长
          * 队员
        * 探索
        * 个突
        * 寮突
        * 业原火

        ### 额外功能
        * pushplus 推送
            * 卡住推送通知
            * 任务完成推送通知

        ### 未来计划
        - [x] [links](), **formatting**, and <del>tags</del> supported
        - [x] list syntax required (any unordered or ordered list supported)
        - [x] this is a complete item
        - [ ] this is an incomplete item
        """
            ),
        ]
    )

    put_markdown("# 每日涩图")
    with use_scope("image"):
        put_image("https://px.s.rainchan.win/random").style(
            """
        border: 2px solid #fff;
        border-radius: 25px;
        """
        )
    put_markdown(
        """

    > 鸣谢:[rs_pixiv](https://github.com/mzdluo123/rs_pixiv)提供API接口
    """
    )
    ###########################################################################################
    put_markdown("# 日志信息")

    ###########################################################################################
    put_collapse(
        "展开日志",
        [put_markdown("~~BUG请视而不见~~"), put_scrollable("long text" * 200, height=200)],
    )


ALL_THEME = ("default", "dark", "sketchy", "minty", "yeti")

THEME_SUMMARY = {
    "default": "The default theme",
    "dark": "A theme for night",
    "sketchy": "A hand-drawn look for mockups and mirth",
    "minty": "A fresh feel",
    "yeti": "A friendly foundation",
}

style = """
table img:hover {
    transition-duration: 400ms;
    transform: translateY(-2px);
    box-shadow: 0px 2px 9px 2px rgb(0 0 0 / 27%), 0 30px 50px -30px rgb(0 0 0 / 30%)
}
.page-header h1 {
    font-size: 3em;
}
#pywebio-scope-image img {
    box-shadow: rgb(204 204 204) 3px 3px 13px;
}
.webio-theme-dark #pywebio-scope-image img {
    box-shadow: none !important;
}
"""


@config(css_style=style)
def page():
    """PyWebIO Theme Preview"""

    theme = eval_js("new URLSearchParams(window.location.search).get('app')")
    if theme not in ALL_THEME:
        theme = "default"

    put_html(
        f"""
    <div class="page-header">
        <div style="text-align: center">
            <h1>AutoYYS-Python</h1>
            <p class="lead">Welcome YYS Script by NakanoSanku</p>
        </div>
      </div>
    """
    )

    put_markdown("# 选择主题")
    themes = [
        put_image(
            f"https://fastly.jsdelivr.net/gh/wang0618/PyWebIO@dev/docs/assets/theme/{name}.png"
        ).onclick(partial(go_app, name=name, new_window=False))
        for name in ALL_THEME
        if name != theme
    ]
    if info.user_agent.is_mobile:
        put_table([themes[:2], themes[2:]])
    else:
        put_table([themes])

    set_env(input_panel_min_height=100, input_panel_init_height=190)
    output_widgets()
    pin_widgets()


# bind each theme to the app
main = {
    theme: config(theme=theme, title="YYS Script")(page)
    for theme in ALL_THEME
    if theme != "default"
}
main["index"] = page

if __name__ == "__main__":
    start_server(main, debug=True, port=8080)
