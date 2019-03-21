const common = {
  version: '2.1.0.40', // 2016-08-17
  wxjsSrc: 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js',
}
const envConfig = {
  prod: {
    common: {
      baseUrl: 'http://jk.lifesense.com'// 前端
    },
    server: {
      // 乐心健康
      appid: 'wxb8fd8c2cf1e6078e',
      secret: '17011b8fd9a2e8c5315e487ce0d1cfc8',
      serverno: 'gh_eb9edab46882',
      devOpenid: 'oQomFjoBP9mjW2jmat1lWH7LxUok',// 龙远兵
      apiUrl: 'http://health-dev.lifesense.com'// api接口地址
    },
    // --------http
    client: {
      activityStartDate: '2016-06-07',
      activityEndDate: '2016-06-26', 
      measureActivityUrl: 'http://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543471328&idx=2&sn=9dcf6dd855912afb33ae226dcd8e2360#rd'
    }
  },
  test: {
    common: {
      baseUrl: 'http://qa-jk.lifesense.com'
    },
    server: {
      // 乐心体验
      appid: 'wx43c742b6104a0368',
      secret: 'acc792adfb04c4f911d67924a68c2eb7',
      serverno: 'gh_ef20d754a1a1',
      devOpenid: 'onwakjk486MCEY6fS4s7c17qeCnA',
      apiUrl: 'http://health-dev.lifesense.com'// api接口地址
    },
    client: {
      activityStartDate: '2016-05-20',
      activityEndDate: '2016-06-08',
      measureActivityUrl: 'http://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543471328&idx=2&sn=9dcf6dd855912afb33ae226dcd8e2360#rd'
    }
  },
  dev: {
    common: {
      baseUrl: 'http://dev-jk.lifesense.com'
    },
    server: {
      // 乐心研发
      appid: 'wx503cebfd53ed7d2a',
      secret: 'e02fad06496164241a01607951ac2e73',
      serverno: 'gh_b31ad0ed480c',
      devOpenid: 'oWq0TuO6ssyJiCUAgjWdkrxv7L2o',// 龙远兵
      apiUrl: 'http://health-dev.lifesense.com'// api接口地址
    },
    client: {
      activityStartDate: '2016-05-20',
      activityEndDate: '2016-06-08',
      measureActivityUrl: 'http://mp.weixin.qq.com/s?__biz=MjM5MTExNjA5OA==&mid=543471328&idx=2&sn=9dcf6dd855912afb33ae226dcd8e2360#rd',
      devLoginInfo: {"userId": 4086281, "accessToken": "beea93cc6891459ba1793532ef04dfc9", "expireAt": 1472373657249}
    },
  }
}

const config = envConfig[process.env.SERVER]

module.exports = Object.assign(
  {},
  common,
  {
    server: Object.assign({}, config.common, config.server),
    client: Object.assign({}, config.common, config.client),
  }
)
