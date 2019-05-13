let { cmd_route } = require("./config/cmd_route_config.js"); 
let CMD = require("./config/cmd.js");
let COLLECT_NAME = require("./config/collect_config.js");


let doRoute = async (cmd, doc_id, open_id, data) => {
  let route_info = cmd_route[cmd];
  if (!route_info) {
    return {
      ret: -998
    };
  }
  let exports_data = require(route_info[0]);
  if (!exports_data) {
    return {
      ret: -997
    };
  }
  let func = exports_data[route_info[1]];
  if (!func) {
    return {
      ret: -996
    };
  }
  let package_data = await func(doc_id, open_id, data);
  return package_data;
};

// 云函数入口文件
const cloud = require('wx-server-sdk')

// 与小程序端一致，均需调用 init 方法初始化
cloud.init()

// 可在入口函数外缓存 db 对象
const db = cloud.database()

// 数据库查询更新指令对象
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  // console.error("请求云函数参数", event);
  // 以 openid-game 作为记录 id
  const docId = `${event.userInfo.openId}-${COLLECT_NAME.GAME_DATA}`;
  const openId = event.userInfo.openId;
  const cmd = event.cmd;

  let package_data = await doRoute(cmd, docId, openId, event.body);
  console.log("调用云函数返回的数据", package_data);
  return package_data;
};