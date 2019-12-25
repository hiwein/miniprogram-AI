const app = getApp();

Page({
    data: {
        wxUserInfoData: {},
    },
    onLoad: function (option) {
        
    },
    // 当用户点击了同意授权
    getUserInfo: function (e) {
        app.globalData.userInfo = e.detail;
        if (e.detail.errMsg === 'getUserInfo:ok') {
            this.gotoMainPage();
        };
    },
    // 进入主页
    gotoMainPage() {
        wx.reLaunch({
            url: '/pages/index/index',
        });
    },
})