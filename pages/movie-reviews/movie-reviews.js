// pages/movie-reviews/movie-reviews.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    winHeight: 0,
    review:{},
    showalldesc: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var id = options.id
    
    this.setData({
      id,
      winHeight: app.globalData.windowHeight,
      winWidth: app.globalData.windowWidth - 20
    })
    
    this.getReviewListData(id, 0, 10) 
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

  getReviewListData(id, start, count) {
    var url = app.globalData.doubanBase + app.globalData.subject + id + '/reviews?start=' + start + '&count=' + count
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
    wx.request({
      url,
      type: 'GET',
      header: { 'content-type': 'json' },
      success: res => {
        console.log(res.data)
        let title = res.data.subject.title || '电影练习生'
        let newreviews = res.data.reviews || []
        let oldreviews = this.data.review.reviews || []
        let allreviews = oldreviews.concat(newreviews)
        wx.setNavigationBarTitle({ title: title + '影评' })
        if (oldreviews.length == 0){
          this.setData({
            review: {
              ...res.data
            }
          })
        }else{
          this.setData({
            review: {
              reviews: allreviews,
              next_start: res.data.next_start,
              subject:{
                title
              }
            }
          })  
        }

      },
      fail: err => console.log(err),
      complete() {
        wx.hideToast()
      }
    })
  },

  loadreviews(){
     var id = this.data.id
     var start = this.data.review.next_start
     this.getReviewListData(id, start, 10) 
  },
  bindextension(e) {
    var index = e.currentTarget.dataset.index
    var allcontent = this.data.review.reviews[index].content
    var summary = 'review.reviews[' + index + '].summary'
    
    this.setData({
      showalldesc: true,
      [summary]: allcontent
     
    })
  }
})