// pages/search/search.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:'',
    resultArr:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  bindToHome(){
    wx.redirectTo({
      url: '../home/home',
    })
  },
  bindSearch(event){
    this.searchData(event.detail.value)
  },
  searchData(data){
    var url = app.globalData.doubanBase + app.globalData.searchURL + data + "&&start=0&&count=10"
    var self = this;
    
    wx.request({
      url,
      method:'GET',
      header:{'content-type':'json'},
      success(res){
        self.arrageData(res.data.subjects)
      },
      fail(err){
        console.log(err)
      }
    })
  },
  arrageData(res){
    var resultArr = []
    res.forEach(item => {
      let totalDir = item.directors.map(i => i.name).join('/')
      let total = item.rating.average + "分" + item.year + "/" + totalDir
      resultArr.push({
        id:item.id,
        title:item.title,
        image:item.images.small,
        total,
      })
    })
    this.setData({resultArr})
  }
})