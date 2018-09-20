// pages/exercises/exercises.js
var touchDot=0;
var time=0;
var interval=";"
var touchMove;
var current=0;
var index=1;
var pageSize;
var jsonTiKu;

Page({
//ToDO some  change
  /**
   * 页面的初始数据
   */
  data: {
    tiKu: [],
    currentTiKu:{A:"",B:"",C:"",D:"",E:"",F:"",Explanation:"",Question:"",Answer:""},
    page:1,
    test:[]
  },

  // 触摸开始事件
  touchStart: function (e) {
    touchDot = e.touches[0].pageX; // 获取触摸时的原点
    // 使用js计时器记录时间  
    interval = setInterval(function () {
      time++;
    }, 100);

  },

  // 触摸移动事件

  touchMove: function (e) {
    touchMove = e.touches[0].pageX;
  },

  // 触摸结束事件
  touchEnd: function (e) {
    var that=this;
    console.log("touchMove:" + touchMove + " touchDot:" + touchDot + " diff:" + (touchMove - touchDot));
    // 向左滑动  
    if (touchMove - touchDot <= -40 && time < 10&&index<=pageSize) {
      console.log("左滑了");
      current++;
      index++;
      var temp=jsonTiKu[current];
      that.setData({
        page: index,
        ['currentTiKu.A']: temp.A,
        ['currentTiKu.B']: temp.B,
        ['currentTiKu.C']: temp.C,
        ['currentTiKu.D']: temp.D,
        ['currentTiKu.E']: temp.E,
        ['currentTiKu.F']: temp.F,
        ['currentTiKu.Question']: temp.Question,
        ['currentTiKu.Explanation']: temp.Explanation,
        ['currentTiKu.Answer']: temp.Answer
      })
    }
    clearInterval(interval); // 清除setInterval
    time = 0;
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
    var that = this;
    wx.request({
      url: 'http://localhost:8080/tiKu', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        'order':'010101'
      },
      success: function (res) {
         pageSize = res.data.length;
         console.log(res);
         jsonTiKu = res.data;
        // console.log(jsonTiKu);
         var first = jsonTiKu[0];
        that.setData({
          ['currentTiKu.A']: first.A,
          ['currentTiKu.B']: first.B,
          ['currentTiKu.C']: first.C,
          ['currentTiKu.D']: first.D,
          ['currentTiKu.E']: first.E,
          ['currentTiKu.F']: first.F,
          ['currentTiKu.Question']: first.Question,
          ['currentTiKu.Explanation']: first.Explanation,
          ['currentTiKu.Answer']: first.Answer
        })
      }
    })
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

  }
})