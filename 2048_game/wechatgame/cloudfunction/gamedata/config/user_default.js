/**
 * 新用户数据
 */
let sk = require("./user_key.js");

let user_default = {};

user_default[sk.HISTORY_MAX_LEVEL] = 0;
user_default[sk.CUR_SCORE] = 0;
user_default[sk.MAX_SCORE] = 0;
user_default[sk.LEVEL_DATA] = '';
user_default[sk.OP_LOG] = '';
user_default[sk.TOOL_CLEAR_NUM] = 1;
user_default[sk.TOOL_LEVEL_UP_NUM] = 1;
user_default[sk.TOOL_ROLL_BACK_NUM] = 1;
user_default[sk.IS_FIRST_LOGIN] = true;
user_default[sk.LAST_LOGIN_TIME] = 0;
user_default[sk.NICK] = "qf-user";
user_default[sk.PORTRAIT_PATH] = "";
user_default[sk.SEX] = 1;
user_default[sk.DAILY_PICK_TOOL_CLEAR_NUM] = 5;
user_default[sk.DAILY_PICK_TOOL_LEVEL_UP_NUM] = 5;
user_default[sk.DAILY_PICK_TOOL_ROLL_BACK_NUM] = 5;

module.exports = user_default;