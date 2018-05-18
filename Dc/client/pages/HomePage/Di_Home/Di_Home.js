var amapFile = require('../../../libs/amap/amap-wx.js');
var config = require('../../../libs/amap/config.js');
var utils=require('../../../utils/util.js')
// var ll = getApp().globalData.weidu;
// console.log(ll);

Page({
  data: {
    markers: [
    ],
    latitude: '',
    longitude: '',
    textData: {},
    addressName: '',
    addressLocation: '',
    date: '',
   
  },
  onLoad: function () {
    var time = utils.formatTime(new Date());
    this.setData({
      date: time
    })

    var that = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: 'a6fc989fc89cb1ace93a9b4da518b3a5' });
    myAmapFun.getRegeo({
      iconPath: "../../../images/mapicon_navi_s.png",
      iconWidth: 22,
      iconHeight: 32,
      success: function (data) {
        //获取有目的地传过来的缓存值
        var addressName = wx.getStorageSync("AddressName");
        var addressLocation = wx.getStorageSync("AddressLocation");
        that.setData({
          addressName: addressName,
          addressLocation: addressLocation,
          
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
            iconPath: "../../../images/mapicon_navi_e.png",
          id: 0,
          latitude: list[1],
          longitude: list[0],
          width: 23,
          height: 33
        }]
        //当前位置经纬度
        var DdloCation = data[0].longitude + "," + data[0].latitude;
        //目标位置经纬度
        var DzaddressLocation = addressLocation;
        //避免开打地图就有路线规划 所以第一次加载页面就清除缓存
        wx.removeStorageSync("AddressName");
        wx.removeStorageSync("AddressLocation");

        //现在存详情页需要的经纬度缓存
        wx.setStorageSync("DdloCation", DdloCation);
        wx.setStorageSync("DzaddressLocation", DzaddressLocation);
        // -----------------------
        myAmapFun.getDrivingRoute({
          origin: "" + DdloCation + "",
          destination: "" + DzaddressLocation + "",
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
              //拿到米计算里程
              var mileage = data.paths[0].distance/1000;
              var mileage1=mileage.toFixed(1);
              console.log()
              that.setData({
                distance: mileage1+"公里"
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
      url: '/pages/HomePage/Di_Poi/Di_Poi',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  closeSession: function () {
    wx.removeStorageSync("AddressName");
    wx.removeStorageSync("AddressLocation");
    console.log("地址，经纬度缓存已清除!");
  },
  // goDetail: function () {
  //   wx.navigateTo({
  //     url: '../particular/particular'
  //   })
  // },
  // bindDateChange: function (e) {
  //   this.setData({
  //     date: e.detail.value
  //   })
  // },
  MakeCar:function(){
    wx.navigateTo({
      url: '../Di_Make/Di_Make',
    })
  }
})