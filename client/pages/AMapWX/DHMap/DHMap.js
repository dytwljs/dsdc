var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

Page({
  data: {
    tips: {},
    AddressName: '',
    AddressLocation: ''
  },
  onLoad: function () {

  },
  bindInput: function (e) {
    var that = this;
    var keywords = e.detail.value;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: 'a6fc989fc89cb1ace93a9b4da518b3a5' });
    myAmapFun.getInputtips({
      keywords: keywords,
      //优先以太原市精确搜索
      city: 140100,
      location: '',
      success: function (data) {
        // console.log(data)
        if (data && data.tips) {
          that.setData({
            tips: data.tips
          });
        }
      }
    })
  },

  // bindSearch: function (e) {
  //   var keywords = e.target.dataset.keywords;
  //   var url = '../poi/poi?keywords=' + keywords;
  //   console.log(url)
  //   wx.redirectTo({
  //     url: url
  //   })
  // }

  bindSearch: function (e) {
    var keywords = e.target.dataset.keywords;
    var location = e.target.dataset.location;
    console.log(keywords);
    console.log(location);
    var that = this;
    // var text = this.data.tips;
    // console.log(text);
    that.setData({
      AddressName: keywords,
      AddressLocation: location
    })
    // wx.setStorageSync("addressName", keywords)
  },

  SetSession: function () {
    var that = this;
    var addressName = that.data.AddressName;
    var addressLocation = that.data.AddressLocation;
    console.log(addressName);
    console.log(addressLocation);

    if (addressLocation.length == 0) {
      wx.showModal({
        title: '提示',
        content: '您寻找的范围过大，请重新输入精确位置',
      })
    }
    if (addressName != null && addressLocation.length != 0) {
      wx.setStorageSync("AddressName", addressName);
      console.log("设置成功!")
      wx.setStorageSync("AddressLocation", addressLocation);
      console.log("设置成功2!")
      wx.redirectTo({
        url: '/pages/AMapWX/index/index',
      })
    }
    // if (addressName != null ){
    //   wx.setStorageSync("AddressName", addressName);
    //   console.log("设置成功!")
    //  }
    // if (addressLocation.length != 0){
    //   wx.setStorageSync("AddressLocation", addressLocation);
    //   console.log("设置成功2!")
    // }

  }
})