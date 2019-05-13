/**
 * 命令码路由表
 */
let { CMD } = require("./cmd.js");

let cmd_route = {};

cmd_route[CMD.LOGIN] = ["./feature/login.js", "login"];
cmd_route[CMD.CREATE_USER] = ["./feature/login.js", "create_user"];
cmd_route[CMD.UPLOAD_DATA] = ["./feature/game.js", "upload_data"];

exports.cmd_route = cmd_route;