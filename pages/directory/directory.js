// pages/directory/directory.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData0: [],
    navData1: []
  },
  addSubjectTap: function(e){
    var kind=e.target.id;
    wx.request({
      url: app.url+'target',
      header:{
        'content-type': 'application/json', // 默认值
        'userId': app.globalData.userId
      },
      data:{
        'targetId': kind
      },
      success:function(response){
        wx.showToast({
          title: '成功修改学习目标'
        })
      }
    })
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
      url: app.url+'title', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
      },
      success: function (res) {
        var temp0=[];
        var directory00=res.data.directory0;
        for(var i in directory00){
          temp0.push(directory00[i]);
        }
        console.log(temp0);
        that.setData({
          navData0:temp0
        })
        var temp1 = [];
        var directory01 = res.data.directory1;
        for (var i in directory01) {
          temp1.push(directory01[i]);
        }
        console.log(temp1);
        that.setData({
          navData1: temp1
        })
      },
      fail:function(){
        console.log("未连接到服务器")
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