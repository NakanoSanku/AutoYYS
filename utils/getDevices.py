import subprocess


def choose_device():
    # 运行 adb devices 命令，并将输出分割成列表
    result = subprocess.run(
        ['adb', 'devices'], stdout=subprocess.PIPE).stdout.decode('utf-8').split('\n')

    # 创建一个空列表，用于保存设备序号
    device_list = []

    # 遍历输出列表中的每一行，跳过表头和空行
    for line in result[1:]:
        if line.strip() != '':
            # 分割每一行，获取设备序号并添加到列表中
            device_list.append(line.split('\t')[0])

    print("选择你的设备id")
    # 打印设备序号列表
    for i, id in zip(range(len(device_list)), device_list):
        print(i, id)

    while True:
        try:
            id = int(input("请输入一个序号："))
            if 0 <= id < len(device_list):
                print("尝试连接中")
                break
            else:
                print("数字不在指定范围内")
        except ValueError:
            print("输入不是数字，请重新输入")

    return device_list[id]
