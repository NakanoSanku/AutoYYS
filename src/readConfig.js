module.exports = function () {
  let storage = storages.create("todoList");
  let config;
  try {
    config = JSON.parse(files.read(storage.get("configPath")));
    toastLog("自定义配置");
  } catch (error) {
    config = JSON.parse(files.read("./src/config.json"));
    toastLog("默认配置");
  }
  return config;
};
