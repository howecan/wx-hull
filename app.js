//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success:(res) => {
        this.globalData.windowHeight = res.windowHeight
        this.globalData.windowWidth = res.windowWidth
      }
    })
  },
  globalData: {
    userInfo: null,
    ajaxBase: "https://www.hullchina.com/kk/",
    searchURL:'json_content_list.php?kw=',
    newslist:'json_content_list.php',
    askslist: 'json_diy_list.php?action=list',
    answerurl:'json_diy_list.php?action=post',
    banner:'json_banner_list.php',
    circle:'json_banner_list.php?id=1',
    subject:'json_view.php?aid=',
    catalog: 'json_type.php',
    ranklist: 'json_member.php',
    download: 'https://www.hullchina.com',
    mainpic:'/images/wx-question.jpg',
    appname: "赫尔101",
    authorize:''
  }
})