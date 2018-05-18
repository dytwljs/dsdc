var noop = function noop() {};
var defaultOptions = {
    method: 'GET',
    success: noop,
    fail: noop,
    url: null,
};

// 显示繁忙提示
var Get = (url,options) => {
    // 请求服务器登录地址，获得会话信息
    wx.request({
        url: url,
        header: null,
        method: defaultOptions.method,
        data: options.data,
        success: function (result) {
            var data = result.data;

            // // 成功地响应会话信息
            // if (data && data.code === 0 && data.data.skey) {
            //     var res = data.data
            //     if (res.userinfo) {
            //         Session.set(res.skey);
            //         options.success(userInfo);
            //     } else {
            //         var errorMessage = '登录失败(' + data.error + ')：' + (data.message || '未知错误');
            //         var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, errorMessage);
            //         options.fail(noSessionError);
            //     }

            // // 没有正确响应会话信息
            // } else {
            //     var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, JSON.stringify(data));
            //     options.fail(noSessionError);
            // }
        },

        // 响应错误
        fail: function (loginResponseError) {
            // var error = new LoginError(constants.ERR_LOGIN_FAILED, '登录失败，可能是网络错误或者服务器发生异常');
            // options.fail(error);
        },
    });
}


module.exports = { Get }