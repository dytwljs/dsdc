var WXBizDataCrypt = require('../../utils/RdWXBizDataCrypt.js');
// pages/login/login.js
var APPID = 'wx1ca22e3163a07ec6';
var SECRET = 'cb8040536dcc0afb7e3eca7bde0d5ecd';
var SessionKey= '';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that = this;
    //用户授权
    wx.login({
      success: function (loginResult) {
        //获取Code
        var JSCODE = loginResult.code;
        console.log("Code:" + loginResult.code)
        // console.log(loginResult.errMsg);
        //判断Code是否为空
        if (loginResult.code) {
          //不为空 发生请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + APPID + '&secret=' + SECRET + '&js_code=' + JSCODE + '&grant_type=authorization_code',
            header: {
              // 'content-type': 'application/json'
              "Content-Type": "application/x-www-form-urlencoded"
            },
            //请求返回
            success: function (res) {
              console.log("openid：" + res.data.openid)
              console.log("session_key:" + res.data.session_key)
              SessionKey = res.data.session_key;
              //设置进全局变量
              getApp().globalData.UserSession.openid = res.data.openid
              // 创建解密实例  传入APPid 和seesion_key
              var pc = new WXBizDataCrypt(APPID, res.data.session_key)
              wx.getUserInfo({
                // withCredentials: true,
                // lang: true,
                success: function (res) {
                  // console.log(res.signature);
                  // console.log(res.userInfo);
                  var data = pc.decryptData(res.encryptedData, res.iv)
                  console.log('解密后 data: ', data)
                  that.setData({
                    user: res.userInfo
                  })
                }
              })
            }
          })
        }
      }
    })    
  },

  OpenUserInfo:function(){

   
  },
 
 
  getPhoneNumber:function(e){ 
    // console.log("状态   :"+e.detail.errMsg)
    // console.log("iv  :"+e.detail.iv)
    // console.log("encryptedData   :" +e.detail.encryptedData)
    var pc = new WXBizDataCrypt(APPID, SessionKey)
    var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
    console.log('解密后data: ', data)
    //设置全局变量_手机号
    getApp().globalData.UserSession.phoneNumber = data.phoneNumber;
    console.log(data.phoneNumber)
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
    var ap = getApp().globalData.UserSession
    console.log("全局变量openid:" + ap.openid)
    console.log("全局变量手机号：" + ap.phoneNumber)
  }
})