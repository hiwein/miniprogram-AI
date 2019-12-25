// pages/entry/entry.js
const app = getApp();

Page({
    onLoad: function(option) {
        this.judgeWarrant();
    },
    // 判断是否已授权
    judgeWarrant: function() {
        const that = this;
        app.getUserInfo().then(() => {
            wx.getUserInfo({
                withCredentials: true,
                success: function(res) {
                    app.globalData.userInfo = res;
                    that.gotoMainPage();
                },
            })
        }, () => {
            this.needWarrant();
        });

    },
    // 已授权直接进入主页
    gotoMainPage() {
        wx.reLaunch({
            url: '/pages/index/index',
        });
    },
    // 进入授权页
    needWarrant() {
        wx.reLaunch({
            url: '/pages/warrant/warrant',
        })
    }
})