/**
 * 游戏相关逻辑
 */
let COLLECT_NAME = require("../config/collect_config.js");
let sk = require('../config/user_key.js');
let util = require("../util/util.js");
// let tool_config = require("../config/tool_config.js");

// 云函数入口文件
const cloud = require('wx-server-sdk');

// 与小程序端一致，均需调用 init 方法初始化
cloud.init();

// 可在入口函数外缓存 db 对象
const db = cloud.database();

//查询游戏数据
module.exports.query_data = async (doc_id, open_id, body) => {
  let docId = doc_id;
  let database_data;
  try {
    database_data = await db.collection(COLLECT_NAME.GAME_DATA).doc(docId).get();
  } catch (err) {
    // console.error("云函数调用错误", err);
    // console.error("云函数调用错误errCode", err.errCode);
    // console.error("云函数调用错误errMsg", err.errMsg);
    return {
      ret: -1000
    };
  }
  let ret = 0;
  let model = {};
  database_data.then(res => {
    let query_data = res.data;
    let field = [
      sk.CUR_SCORE,
      sk.MAX_SCORE,
      sk.LEVEL_DATA,
      sk.OP_LOG,
      sk.TOOL_CLEAR_NUM,
      sk.TOOL_LEVEL_UP_NUM,
      sk.TOOL_ROLL_BACK_NUM
    ];
    for (let i in field) {
      let key = field[i];
      if (query_data[key] != undefined) {
        model[key] = query_data[key];
      }
    }
    console.error("func query_data call success", res);
    ret = 0;
  }, err => {
    console.error("func query_data call fail", err);
    ret = -993;
  });

  return {
    ret,
    model
  };
};

//上传数据
module.exports.upload_data = async (doc_id, open_id, body) => {

  let docId = doc_id;

  let data = {};
  let field = [
    sk.HISTORY_MAX_LEVEL,
    sk.CUR_SCORE,
    sk.MAX_SCORE,
    sk.LEVEL_DATA,
    sk.OP_LOG,
    sk.TOOL_CLEAR_NUM,
    sk.TOOL_LEVEL_UP_NUM,
    sk.TOOL_ROLL_BACK_NUM,
    sk.DAILY_PICK_TOOL_CLEAR_NUM,
    sk.DAILY_PICK_TOOL_LEVEL_UP_NUM,
    sk.DAILY_PICK_TOOL_ROLL_BACK_NUM
  ];
  for(let i in field){
    let key = field[i];
    if(body[key] != undefined){
      data[key] = body[key];
    }
  }
  try{
    let res = await db.collection(COLLECT_NAME.GAME_DATA).doc(docId).update({
      data
    });
    console.error("func upload_data call success", res);
    return {
      ret: 0
    };
  }catch(err){
    console.error("func upload_data call fail", err);
    return {
      ret: -994
    };
  }
};