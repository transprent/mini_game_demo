let util = {
  TAG: "util",

  ctor: function () {
    var self = this;
  },

  //通过输入两个点求两点组成的直线与X轴正半轴之间的角度
  //@p1 为原点
  //@p2 为处于的点
  getAngle: function (p1, p2) {
    var self = this;

    var x = p2.x - p1.x;
    var y = p2.y - p1.y;
    var a = Math.atan2(y, x);
    var ret = a * 180 / Math.PI; //弧度转角度，方便调试
    if (ret > 360) {
      ret -= 360;
    }
    if (ret < 0) {
      ret += 360;
    }
    return ret;
  },

  //通过输入两个点求两点之间的距离
  //@p1 为中心点
  //@p2 为处于的点
  getLong: function (p1, p2) {
    var self = this;
    var dx = p1.x - p2.x;
    var dy = p1.y - p2.y;
    var long = Math.sqrt(dx * dx + dy * dy);
    return long;
  },

  fix2point: function (v) {
    var self = this;
    //mark by Gallen
    var strv = string.format("%.2f", v);
    return parseInt(strv);
  },

  getIntPart: function (x) {
    var self = this;
    if (x <= 0)
      return Math.ceil(x);

    if (Math.ceil(x) === x)
      x = Math.ceil(x);
    else
      x = Math.ceil(x) - 1;

    return x;
  },

  //获取时区
  getTimezone: function () {
    var self = this;
    var now = os.time();
    var difftime = os.difftime(now, os.time(os.date("!*t", now)));
    return difftime / 3600;
  },

  //简单判断指定的字符串是不是url
  isUrl: function (url) {
    url.trim();
    if (0 === url.indexOf("http://"))
      return true;
    else if (0 === url.indexOf("https://"))
      return true;
    return false;
  },

  //生成uuid
  createUuid: function () {
    var self = this;
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    self._uuid = s.join("");
  },
  //获取uuid
  getUuid: function () {
    var self = this;

    if (!self._uuid) {
      self.createUuid();
      return self._uuid;
    }

    return self._uuid;
  },

  //Pitch（绕X轴旋转的角度）
  //当手机绕着自身的Y轴旋转（表示手机顶部或尾部翘起的角度），该角度会发生变化，值的范围是-180到180度。
  calcPitch: function (x, y, z) {
    return Math.atan2(y, z) * 180 / Math.PI;
  },
  //Roll（绕Y轴旋转的角度）
  //当设备绕着自身Y轴旋转时（表示手机左侧或右侧翘起的角度），该角度值将会发生变化，取值范围是-90到90度
  calcRoll: function (x, y, z) {
    return Math.atan2(-x, Math.sqrt(y * y + z * z)) * 180 / Math.PI;
  },

  /**
   * 对象复制
   */
  assign: function (a, b) {
    if (Object.assign) {
      return Object.assign(a, b);
    } else {
      for (var key in b) {
        a[key] = b[key]
      }
      return a;
    }
  },

  findIsExistValueInObject(obj, value) {
    for (let i in obj) {
      if (obj[i] instanceof Object) {
        let is_exist = this.findIsExistValueInObject(obj[i], value);
        if (is_exist) {
          return true;
        }
      } else {
        if (obj[i] === value) {
          return true;
        }
      }
    }
    return false;
  },

  doDailyCheck: function (time) {
    var self = this;

    var daily_date = new Date(time);

    var cur_date = new Date();

    if (daily_date.getMonth() !== cur_date.getMonth() || daily_date.getDate() !== cur_date.getDate()) {
      //过了一天
      return true;
    }
    return false;
  },
};

module.exports = util;