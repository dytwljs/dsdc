var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

Page({
  data: {
    steps: {}
  },
  onLoad: function () {
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: 'a6fc989fc89cb1ace93a9b4da518b3a5' });
    var particularDdloCation=wx.getStorageSync("DdloCation");
    var particularDzaddressLocation= wx.getStorageSync("DzaddressLocation");
    console.log(particularDdloCation + ":" + particularDzaddressLocation);

    myAmapFun.getWalkingRoute({
      origin: "" + particularDdloCation+"",
      destination: "" + particularDzaddressLocation+"",
      success: function (data) {
        if (data.paths && data.paths[0] && data.paths[0].steps) {
          that.setData({
            steps: data.paths[0].steps
          });
        }

      },
      fail: function (info) {

      }
    })
  }
})