var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');

// var ll = getApp().globalData.weidu;
// console.log(ll);

Page({
  data: {
    markers: [
    ],
    latitude: '',
    longitude: '',
    textData: {},
    addressName:'',
    addressLocation:''
  },
  onLoad: function () {
   
    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: 'a6fc989fc89cb1ace93a9b4da518b3a5' });
    myAmapFun.getRegeo({
      iconPath: "../../img/mapicon_navi_s.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function (data) {
        //获取有目的地传过来的缓存值
        var addressName = wx.getStorageSync("AddressName");
        var addressLocation = wx.getStorageSync("AddressLocation");
        that.setData({
          addressName: addressName,
          addressLocation: addressLocation
        })
        console.log(addressName);
        console.log(addressLocation);
        //由于传过来的值是整个location字符串无法分辨经纬度，需要进行一次切割
        var list = addressLocation.split(",");
        console.log(list[0]);
        console.log(list[1]);
        
        //坐标
        var marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height,
        }, {
          iconPath: "../../img/mapicon_navi_e.png",
          id: 0,
          latitude: list[1],
          longitude: list[0],
          width: 23,
          height: 33
        }]
        //当前位置经纬度
        var DdloCation = data[0].longitude+","+data[0].latitude;
        //目标位置经纬度
        var DzaddressLocation = addressLocation;
        
        // -----------------------
        myAmapFun.getDrivingRoute({
          origin: "" + DdloCation+"",
          destination: "" + DzaddressLocation+"",
          success: function (data) {
            var points = [];
            if (data.paths && data.paths[0] && data.paths[0].steps) {
              var steps = data.paths[0].steps;
              for (var i = 0; i < steps.length; i++) {
                var poLen = steps[i].polyline.split(';');
                for (var j = 0; j < poLen.length; j++) {
                  points.push({
                    longitude: parseFloat(poLen[j].split(',')[0]),
                    latitude: parseFloat(poLen[j].split(',')[1])
                  })
                }
              }
            }
            that.setData({
              polyline: [{
                points: points,
                color: "#0091ff",
                width: 6
              }]
            });
            if (data.paths[0] && data.paths[0].distance) {
              that.setData({
                distance: data.paths[0].distance + '米'
              });
            }
            if (data.taxi_cost) {
              that.setData({
                cost: '打车约' + parseInt(data.taxi_cost) + '元'
              });
            }

          },
          fail: function (info) {

          }
        })

    // -----------------------

        that.setData({
          markers: marker
        });
        that.setData({
          latitude: data[0].latitude
        });
        that.setData({
          longitude: data[0].longitude
        });
        that.setData({
          textData: {
            name: data[0].name,
            desc: data[0].desc
          }
        })
      },
      fail: function (info) {
        // wx.showModal({title:info.errMsg})
      }
    })

  },
  onUnload: function () {
    
  },

  bindtrue: function () {
    // wx.removeStorageSync("AddressName");
    // wx.removeStorageSync("AddressLocation");
    wx.navigateTo({
      url: '/pages/AMapWX/DHMap/DHMap',
      success: function (res) {},
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})