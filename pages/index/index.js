//index.js
//获取应用实例
const app = getApp()
var mta = require('../../utils/mta_analysis.js');

Page({
    onLoad() {
        this._getDoctorList();
    },
    // 咨询医生
    handleConsultDoctor: function(e) {
        mta.Event.stat('e00001', {});
        const href = `consultList`;
        this._configParams(href, e);
    },
    // 小智助手
    handleAiguide: function(e) {
        mta.Event.stat('e00002', {});
        const href = '';
        this._configParams(href, e);
    },
    // 健康日记
    handletoDiary: function(e) {
        mta.Event.stat('e00003', {});
        const href = 'healthData';
        this._configParams(href, e);
    },
    // 健康档案
    handletoDocument: function(e) {
        mta.Event.stat('e00004', {});
        const href = 'healthdocument';
        this._configParams(href, e);
    },
    // 健康测评
    handletoHealthy: function(e) {
        mta.Event.stat('e00005', {});
        const href = 'testPaperWrap/main';
        this._configParams(href, e);
    },
    // 设备连接
    hanletoDevice: function() {
        mta.Event.stat('e00006', {});
        wx.navigateToMiniProgram({
            appId: 'wxde21bcdee4281a69',
            path: '/pages/start/start',
            success: function (res) {},
        });
    },
    // 更多医生
    handlemoreDoctor: function(e) {
        const href = 'doctorSearch';
        this._configParams(href, e);
    },
    // 去咨询
    handletoDoctorMain: function(e) {
        mta.Event.stat('e00007', { 'account': e.currentTarget.dataset.account });
        const account = e.currentTarget.dataset.account;
        const href = `0/0/${account }/myHome`;
        this._configParams(href, e);
    },
    _configParams(target, form) {
        app.getCode().then(() => {
            let formId = form.detail.formId;
            if (!form || form.detail.formId === 'the formId is a mock one' || !form.detail.formId) {
                formId = '';
            }
            app.getHerf(target, formId).then(res => {
                app.globalData.href = res.url;
                wx.navigateTo({
                    url: '/pages/webView/webView',
                });
            });
        })
    },
    _getDoctorList() {
        const that = this;
        wx.request({
            url: 'https://patapi.hiwein.com//doctors/recommend',
            method: 'get',
            success: function (res) {
                that.setData({
                    list: res.data.doctors
                })
            }
        })
    },
    data: {
        list: [],
    }
})
