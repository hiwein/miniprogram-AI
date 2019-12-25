//app.js
const base64 = require('./utils/base64.js');
var mta = require('./utils/mta_analysis.js');

App({
    onLaunch() {
        mta.App.init({
            "appID": "500690574",
            "eventID": "500690576",
            "autoReport": true,
            "statParam": true,
            "statShareApp": true,
            "ignoreParams": [],
        });
    },
    // 获取wx.login code
    getCode() {
        return new Promise(resolve => {
            const that = this;
            wx.login({
                success: res => {
                    that.globalData.code = res.code;
                    resolve(res.code);
                }
            });
        })
    },

    // 获取用户的详细信息
    getUserInfo() {
        return new Promise((resolve, reject) => {
            wx.getSetting({
                success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                        resolve();
                    } else {
                        reject();
                    }
                }
            });
        });
    },

    getHerf(target/* 目标地址 */, formId) {
        return new Promise(resolve => {
            wx.request({
                url: 'https://patapi.hiwein.com/OpenAuth/getAIguideMinProgramLoginUrl',
                method: 'post',
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                data: {
                    code: this.globalData.code,
                    wxUserInfoData: this.globalData.userInfo ? JSON.stringify(this.globalData.userInfo) : '',
                    formId: formId,
                    actUri: target,
                },
                success: res => {
                    if (res.data.code === 0) {
                        let token = res.data.token;
                        if (token) {
                            token = base64.encode(token);
                        }
                        this.globalData.token = token;
                        resolve(res.data);
                    } else {
                        wx.showModal({
                            title: res.data.errMsg,
                        })
                    }
                }
            });
        })
    },

    globalData: {
        userInfo: null,
        code: null,
        token: null,
        href: null,
    }
})