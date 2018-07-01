// pages/catalog/catalog.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    var url = app.globalData.ajaxBase + app.globalData.catalog
    console.log(url)
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url,
      method: 'GET',
      header: { 'content-type': 'json' },
      success: res => {
        var lists = res.data.split("^")
        console.log(lists)
        var lists = lists.map(function (item) {
          item = JSON.parse(item)
        
          //item.title = that.strdecode(item.title)
          return item
         
          //return that.strdecode(item)
        })
        console.log(lists)
        
        this.setData({lists})
        
      },
      fail: err => console.log(err),
      complete() {
        wx.hideToast()
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindtotype(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../movie-types/movie-types?id=' + id
    })
  }
})