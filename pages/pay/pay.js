// pages/pay/pay.js
const app = getApp();

Page({
    onLoad: function (options) {
      console.log(options)
        this.setData({
            order: options.order
        })
      this.pay(options.order);
    },
    pay(order) {
        const that = this;
        wx.request({
            url: `https://patapi.hiwein.com/pay/xcxPaySign/${order}`,
            method: 'GET',
            header: {
                'Authorization': app.globalData.token
            },
            success: function (res) {
                that.payTheMoney(res.data, order)
            }
        })
    },
    payTheMoney(res, order) {
        const that = this;
        wx.requestPayment({
            timeStamp: res.jsData.timeStamp,
            nonceStr: res.jsData.nonceStr,
            package: res.jsData.package,
            signType: res.jsData.signType,
            paySign: res.jsData.paySign,
            success: function (res) {
                that.setData({
                    payUrl: `https://doctor-patient.hiwein.com/user/dist/index.html#/${order}/patientConsultOrder`
                })
            },
            fail: function (err) {
                that.backto(order)
            }
        });
    },
    backto(order) {
        wx.reLaunch({
            url: `/pages/index/index?order=${order}`,
        })
    }
})