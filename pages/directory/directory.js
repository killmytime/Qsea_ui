// pages/directory/directory.js
var type=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navData0: [],
    navData1: [],
    navData2: [],
    navData3: []
  },

  widgetsToggle:function(e){
    var id = e.currentTarget.id, data = {};
    for (var i = 0, len = type.length; i < len; ++i) {
      data["view"+type[i]] = false;
    }
    data[id + 'Show'] = !this.data[id + 'Show'];
    this.setData(data);
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
      url: 'http://localhost:8080/title', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var temp0=[];
        var directory00=res.data.directory0;
        for(var i in directory00){
          temp0.push(directory00[i]);
          type.push(directory00[i].id);
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
        var temp2 = [];
        var directory02 = res.data.directory2;
        for (var i in directory02) {
          temp2.push(directory02[i]);
        }
        console.log(temp2);
        that.setData({
          navData2: temp2
        })
        var temp3 = [];
        var directory03 = res.data.directory3;
        for (var i in directory03) {
          temp3.push(directory03[i]);
        }
        console.log(temp3);
        that.setData({
          navData3: temp3
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