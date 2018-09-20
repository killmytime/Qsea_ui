//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    navData: ["模拟题", "1233"],
    navData1:[],
    navData2:[],
    currentTab: 0,
    navScrollLeft: 0
  },
  questionTap:function(e){
    var kind=e.target.id
    //ToDO 将id设置到全局变量里面
    console.log(kind)
    if(e.target.id=="1@1@1"){
      wx.navigateTo({
        url: '../exercises/exercises',
      })
    }
  },
  onLoad: function () {
  
  },
  onShow:function(){
    var that=this;
    wx.request({
      url: 'http://localhost:8080/title', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var temp0=['模拟题'];
        var directory01=res.data.directory1;
        for(var i in directory01){
          temp0.push(directory01[i].title);
        }
        console.log(temp0);
        that.setData({
          navData: temp0
        })
        var temp1=[];
        var directory02=res.data.directory2;
        for(var i in directory02){
          temp1.push(directory02[i]);
        }
        console.log(temp1);
        that.setData({
          navData1:temp1
        })
        var temp2=[];
        var directory03=res.data.directory3;
        for(var i in directory03){
          temp2.push(directory03[i]);
        }
        console.log(temp2);
        that.setData({
          navData2:temp2
        })
      }
    })
    
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
