/**
 * 用户登录
 */
let sk = require('../config/user_key.js');
let COLLECT_NAME = require("../config/collect_config.js");
let user_default = require("../config/user_default.js");
let util = require("../util/util.js");

// 云函数入口文件
const cloud = require('wx-server-sdk');

// 与小程序端一致，均需调用 init 方法初始化
cloud.init();

// 可在入口函数外缓存 db 对象
const db = cloud.database();

let create_user = async(doc_id, open_id, body) => {
  let model = {};
  model[sk.DOC_ID] = doc_id;
  model[sk.OPEN_ID] = open_id;
  util.assign(model, user_default);
  //更新登录时间
  model[sk.LAST_LOGIN_TIME] = new Date().getTime();

  try{
    await db.collection(COLLECT_NAME.GAME_DATA).add({
      data: model
    });
    return {
      ret: 0,
      model
    };
  }catch (err) {
    console.error("func create_user call fail", res);
    return {
      ret: -995,
      model
    };
  }
};

let login = async(doc_id, open_id, body) => {
  let docId = doc_id;
  let openId = open_id;
  let database_data;
  try {
    database_data = await db.collection(COLLECT_NAME.GAME_DATA).doc(docId).get();
  } catch (err) {
    if (err.errCode === -1 && err.errMsg.indexOf("gamedata does not exist")) {
      // console.error("找不到用户记录", err.errMsg);


      let package_data = await create_user(docId, openId);
      // console.error("CMD.CREATE_USER package", package_data);

      return package_data;
    }
    // console.error("云函数调用错误", err);
    // console.error("云函数调用错误errCode", err.errCode);
    // console.error("云函数调用错误errMsg", err.errMsg);
    return {
      ret: -1000
    };
  }
  // console.error("调用云函数查询结果", database_data);
  let rsp_data = {};
  let query_data = database_data.data;

  let last_login_time = query_data[sk.LAST_LOGIN_TIME];
  let is_first_login = false;
  if (last_login_time === 0) {
    is_first_login = true;
  } else {
    is_first_login = util.doDailyCheck(last_login_time);
  }
  let field = [
    sk.HISTORY_MAX_LEVEL,
    sk.CUR_SCORE,
    sk.MAX_SCORE,
    sk.LEVEL_DATA,
    sk.OP_LOG,
    sk.TOOL_CLEAR_NUM,
    sk.TOOL_LEVEL_UP_NUM,
    sk.TOOL_ROLL_BACK_NUM,
    sk.IS_FIRST_LOGIN,
    sk.SEX,
    sk.PORTRAIT_PATH,
    sk.NICK,
    sk.RES_VERSION,
    sk.DAILY_PICK_TOOL_CLEAR_NUM,
    sk.DAILY_PICK_TOOL_LEVEL_UP_NUM,
    sk.DAILY_PICK_TOOL_ROLL_BACK_NUM
  ];
  for (let i in field) {
    let key = field[i];
    if (query_data[key] != undefined) {
      rsp_data[key] = query_data[key];
    }
  }
  //用户信息授权保存
  let filter_list = {};
  filter_list[sk.SEX] = user_default[sk.SEX];
  filter_list[sk.PORTRAIT_PATH] = user_default[sk.PORTRAIT_PATH];
  filter_list[sk.NICK] = user_default[sk.NICK];
  for (let i in filter_list) {
    let key = i;
    if (body[key] != undefined && query_data[key] === filter_list[i]) {
      rsp_data[key] = body[key];
    }
  }
  //每日送一个
  if (is_first_login){
    if (rsp_data[sk.TOOL_CLEAR_NUM] < 1) {
      rsp_data[sk.TOOL_CLEAR_NUM] = 1;
    }
    if (rsp_data[sk.TOOL_LEVEL_UP_NUM] < 1) {
      rsp_data[sk.TOOL_LEVEL_UP_NUM] = 1;
    }
    if (rsp_data[sk.TOOL_ROLL_BACK_NUM] < 1) {
      rsp_data[sk.TOOL_ROLL_BACK_NUM] = 1;
    }
    //刷新每日可分享次数
    rsp_data[sk.DAILY_PICK_TOOL_CLEAR_NUM] = user_default[sk.DAILY_PICK_TOOL_CLEAR_NUM];
    rsp_data[sk.DAILY_PICK_TOOL_LEVEL_UP_NUM] = user_default[sk.DAILY_PICK_TOOL_LEVEL_UP_NUM];
    rsp_data[sk.DAILY_PICK_TOOL_ROLL_BACK_NUM] = user_default[sk.DAILY_PICK_TOOL_ROLL_BACK_NUM];
  }
  rsp_data[sk.IS_FIRST_LOGIN] = is_first_login;
  rsp_data[sk.LAST_LOGIN_TIME] = new Date().getTime();
  try {
    //将数据更新到数据库去
    let res = await db.collection(COLLECT_NAME.GAME_DATA).doc(docId).update({
      data: rsp_data
    });
    // console.error("登录数据更新成功", res);
  } catch (err) {
    // console.error("登录数据更新", err);
  };

  let model = util.assign({}, rsp_data);
  delete model[sk.DOC_ID];
  return {
    ret: 0,
    model
  };
};

module.exports.login = login;
module.exports.create_user = create_user;