// pages/home/home.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newslist: {},
    banner: {},
    circle: {},
    autoplay:"true",
    interval: "1000",
    duration: "4000",
    indicatorDots:"true",
    indicatorColor:"#ffff00",
    placeholder:"搜索赫尔101",
    keyword:"",
    contentloaded: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var newslistUrl = app.globalData.ajaxBase + app.globalData.newslist 
     var bannerUrl = app.globalData.ajaxBase + app.globalData.banner
     var circleUrl = app.globalData.ajaxBase + app.globalData.circle 
     this.getMovieListData(circleUrl, 'circle');
     this.getMovieListData(bannerUrl,'banner');
     this.getMovieListData(newslistUrl, 'newslist');
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
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    //wx.clearStorage();
    this.setData({
      newslist: {},
      banner: {},
      circle: {},
      contentloaded: 0
       })
    var newslistUrl = app.globalData.ajaxBase + app.globalData.newslist
    var bannerUrl = app.globalData.ajaxBase + app.globalData.banner
    var circleUrl = app.globalData.ajaxBase + app.globalData.circle
    this.getMovieListData(circleUrl, 'circle');
    this.getMovieListData(bannerUrl, 'banner');
    this.getMovieListData(newslistUrl, 'newslist');
    if (this.data.contentloaded == 1 || this.data.banner){
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
    }
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.handlelower()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //搜索
  input1(event) {
    var kw = event.detail.value
    this.setData({ keyword: kw })
  },
  bindToSearch(event) {
    var kw = event.detail.value || this.data.keyword 
    console.log(kw)
    if (kw.length<2){
      wx.showToast({
        title: '关键词太短了',
        icon: 'loading',
        duration: 2000
      })  
    }else{
    wx.navigateTo({
      url: '../movie-types/movie-types?kw=' + kw
    })

    }
  },
  getMovieListData(url, types) {
    var that=this
    var pageno = this.data[types].pageno || 1
    if (types == 'newslist') {
      url += '?pageno=' + pageno
    } else if (types == 'banner') {
      url += '?pageno=' + pageno
    } else if (types == 'circle') {
      url += '&pageno=' + pageno
    }
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
        var subjects = res.data.trim().split("^")
        
        
        var movies = this.data[types].movies || []
        var last = JSON.parse(subjects.pop())
        var total = last.total || 999
        var pageno = last.pageno
        var resArr = []
        
        subjects.forEach(item => {
          var jsonobj = JSON.parse(item);
          resArr.push({
            ...jsonobj
          })
        })
        movies = movies.concat(resArr)
        //this.setData({ [types]: [total, pageno, movies] })
        console.log(movies)
        if (types == "newslist"){
          that.setData({ [types]: { total, pageno, movies } })
        } else {
          that.setData({
          [types]: {
            total, pageno, movies,
            autoplay: last.autoplay,
            interval: last.interval,
            duration: last.duration,
            indicatorDots: last.indicatorDots
          }
          })
        }
      },
      fail: err => console.log(err),
      complete() {
        wx.hideToast()
        that.setData({ contentloaded: 1})
      }
    })
  },

  
  handlelower() {
    var newslistUrl = app.globalData.ajaxBase + app.globalData.newslist 
    this.getMovieListData(newslistUrl,'newslist')
  },
  bindtodetail(event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id,
    })
  }
})