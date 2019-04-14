// pages/exercises/exercises.js
const app=getApp();
var touchDot=0;
var time=0;
var interval=""
var touchMove;

var current=0;
var index=1;
var pageSize;
var jsonTiKu;
var Type=0;
var errorNum=0;
var Answer=""
//common  ,  errors   ,   points

//关于对通用题库报错没有Point属性，之后想个除了分隔的其他做法吧
Page({
//ToDO some  change
  /**
   * 页面的初始数据
   */
  data: {
    title:"",
    tiKu: [],
    currentTiKu:{A:"",B:"",C:"",D:"",E:"",F:"",Explanation:"",Question:"",Answer:"A",Type:0,isHidden:1,Point:""},
    page:1,
    isEnd:false,
    isChecked:false,
    isModalHidden:true,
    tiKuKind:""
  },
  formReset:function(e){

  },
  bindAddPoint:function(e){
    var that=this;
    that.setData({
      isModalHidden:!this.data.isModalHidden
    })
    
  },
  currentInput:function(e){
    var that=this;
    that.setData({
      ['currentTiKu.Point']:e.detail.value
    })
    console.log(this.currentTiKu)
  },
  cancelPoint:function(e){
    var that=this;
    that.setData({
      isModalHidden:true
    })
  },
  
  confirmPoint:function(e){
    var that=this;
    that.setData({
      isModalHidden: true,
    })
    wx.request({
      url: app.url+'point',
      header: {
        'content-type': 'application/json', // 默认值
        'userId': app.globalData.userId,
        'type': 'add'
      },
      data: {
        'point': this.data.currentTiKu
      },
      success: function (response) {
        console.log('add point successfully')
        that.setData({
          ['currentTiKu.Point']:""
        })
      }
    })

  },


  bindAddError:function(e){
wx.request({
  url: app.url+'error',
  header:{
    'content-type': 'application/json', // 默认值
    'userId': app.globalData.userId,
    'type':'add'
  },
  data:{
    'error':this.data.currentTiKu
  },
  success:function(response){
    console.log('add error question successfully')
  }
})
  },

  radioChange:function(e){
    var that=this;
    console.log()
    console.log(e.detail.value)
    var result=e.detail.value;
    if(result==Answer){
      wx.showToast({
        title: '正确',
      })
    }else{
      errorNum++;
      wx.showToast({
        title: '错误',
        //ToDO change the icon
        icon:''
      })
    }
    that.setData({
      ['currentTiKu.isHidden']:0,
      isEnd:true
    })
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
    if (touchMove - touchDot <= -40 && time < 10 && this.data.currentTiKu.isHidden == 0){
      if (index < pageSize) {
        console.log("左滑了");
        current++;
        index++;
        var temp = jsonTiKu[current];
        if (temp.Answer.length != 1) Type = 1;
        Answer = temp.Answer;
        that.setData({
          page: index,
          isEnd:false,
          isChecked:false,
          ['currentTiKu.A']: temp.A,
          ['currentTiKu.B']: temp.B,
          ['currentTiKu.C']: temp.C,
          ['currentTiKu.D']: temp.D,
          ['currentTiKu.E']: temp.E,
          ['currentTiKu.F']: temp.F,
          ['currentTiKu.Question']: temp.Question,
          ['currentTiKu.Explanation']: temp.Explanation,
          ['currentTiKu.Answer']: temp.Answer,
          ['currentTiKu.Type']: Type,
          ['currentTiKu.isHidden']: 1,
          ['currentTiKu.Point']:temp.Point
        })
        Type = 0;
      } else {
        app.globalData.errors=errorNum;
        app.globalData.pageSize=pageSize;
        wx.navigateTo({
          url: '../fini/fini',
          success: function (res) {
            console.log("success")
           },
          fail: function (res) { 
            console.log("fail")
          },
          complete: function (res) {
            console.log("complete")
           },
        })
      }
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
    current = 0;
    index = 1;
    Type = 0;
    errorNum = 0;
    var that = this;
    var currentKind=app.globalData.tiKuKind;
    wx.request({
      url: app.url+'tiKu', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json', // 默认值
        'order':app.globalData.currentTiKuId,
        'userId':app.globalData.userId,
        'kind':currentKind
      },
      success: function (res) {
         pageSize = res.data.length;
         console.log(res);
         jsonTiKu = res.data;
        // console.log(jsonTiKu);
         var first = jsonTiKu[0];
         if(first.Answer.length!=1) Type=1;
         Answer=first.Answer
        that.setData({
          title:app.globalData.currentTiKuTitle,
          ['currentTiKu.A']: first.A,
          ['currentTiKu.B']: first.B,
          ['currentTiKu.C']: first.C,
          ['currentTiKu.D']: first.D,
          ['currentTiKu.E']: first.E,
          ['currentTiKu.F']: first.F,
          ['currentTiKu.Question']: first.Question,
          ['currentTiKu.Explanation']: first.Explanation,
          ['currentTiKu.Answer']: first.Answer,
          ['currentTiKu.Type']:Type,
          tiKuKind:currentKind,
          ['currentTiKu.Point']:first.Point
        })
        Type=0;
      }
    })
    wx.hideLoading();
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