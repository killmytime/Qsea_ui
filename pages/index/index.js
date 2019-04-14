//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navData: [],
    navData1:[],
    navData2:[],
    currentTab: 0,
    navScrollLeft: 0
  },
  questionTap:function(e){
    var kind=e.target.id
    //ToDO 将id设置到全局变量里面
    //console.log(kind)
    app.globalData.currentTiKuId=kind;
    app.globalData.currentTiKuTitle=e.target.dataset.title;
    app.globalData.tiKuKind="common";
    //console.log(app.globalData.currentTiKuTitle)
      wx.navigateTo({
        url: '../exercises/exercises',
      })
      wx.showLoading({
        title: '正在加载题目',
      })
  },
  blockTap:function(e){
    var that=this
    var index=e.target.id
    that.setData({
      currentTab:index
    })
  },
  onLoad: function () {
  },
  onShow:function(){
    wx.showLoading({
      title: '正在玩命加载中',
    })
    var that=this;
    //登录
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: app.url+'login',
            header: {
              'content-type': 'application/json', // 默认值
            },
            data: {
              'js_code': res.code,
              'userinfo': app.globalData.userInfo
            },
            success: function (response) {
              app.globalData.userId = response.data.openid;
              //console.log(app.globalData.userId);
              wx.request({
                url: app.url+'target_title', 
                header: {
                  'content-type': 'application/json', // 默认值
                  'userId': app.globalData.userId
                },
                success: function (res) {
                  var temp0 = [{ title: "模拟题", id: "0" }];
                  var directory01 = res.data.directory1;
                  for (var i in directory01) {
                    temp0.push(directory01[i]);
                  }
                  //console.log(temp0);
                  that.setData({
                    navData: temp0
                  })
                  var temp1 = [];
                  var directory02 = res.data.directory2;
                  for (var i in directory02) {
                    temp1.push(directory02[i]);
                  }
                  //console.log(temp1);
                  that.setData({
                    navData1: temp1
                  })
                  var temp2 = [];
                  var directory03 = res.data.directory3;
                  for (var i in directory03) {
                    temp2.push(directory03[i]);
                  }
                 // console.log(temp2);
                  that.setData({
                    navData2: temp2
                  })
                  wx.hideLoading();
                }
              })

            },
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
   // console.log(app.globalData)
   
  },

  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  }

})
