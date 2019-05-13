let config = module.exports;

config.env = 'Prod'; // 必填 运行环境：  测试Test  上线Prod，上线审核开始要把环境改为Prod
config.gameId = 'qf-0311bea228b541029ab479dd2a5dcad0'; // 必填 游戏ID，去平台后台创建
config.gameVersion = '2.1.1'; // 可选 当前游戏版本号 当要根据游戏版本使用IP检测时必填
config.channel = 'qf2048_game';
config.shareData = { // 可选 默认的分享数据
    title: '项目名称',
    query: 'k1=v1&channel=brain',
    from: '',
    path: '',
    imageUrl: ''
}
config.showAdStrategy = 1;//显示交叉推广广告策略 0 随机显示 1 按顺序显示

config.sysInfo = wx.getSystemInfoSync();

// 获取用户信息按钮样式配置：0 文字，1 图片
config.loginBtnStyle = [{
  type: 'text',
  text: '获取用户信息',
  style: {
    width: 200,
    height: 50,
    borderRadius: 5,
    lineHeight: 50,
    backgroundColor: '#0da7ff',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    top: 100,
    left: 100,
  }
},
{
  type: 'image',
  image: 'https://caveman-test-resource.hortorgames.com/resource/btn_enter.png',
  style: {
    width: 200,
    height: 70,
    top: config.sysInfo.windowHeight / 2 - 100,
    left: config.sysInfo.windowWidth / 2 - 100,
  }
}
]

//配置获取用户信息按钮样式
config.userInfoBtn = {
  config: config.loginBtnStyle[0],
  onShow: function () { // 授权按钮展示回调
      // console.log('授权按钮展示')
  },
  onTap: function (data, err) { // 授权按钮点击回调
      // if (data) console.log('授权成功！', data)
      // else if (err) console.log('拒绝授权！', err)
      // else console.log("点击授权");
  }
}

config.gameClubBtn = { // 可选 默认游戏圈按钮样式
    icon: 'green',
    style: {
        left: 10,
        top: 76,
        width: 40,
        height: 40
    }
}
