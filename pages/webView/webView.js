const app = getApp();

Page({
    onLoad: function (options) {
      if (options.path && options.path === 'AIguide') {
        this.data.jumpThere = true;
        app.getCode().then(code => {
          app.globalData.code = code;
          app.getHerf('', '').then(res => {
            this.setData({
              href: res.url
            });
          });
        })
      }
    },
    data: {
        href: '',
        jumpThere: false,
    },
    onShow: function () {
        if (!this.data.jumpThere) {
          this.setData({
            href: app.globalData.href,
          })
        }
    },
    consoleTime() {
      const time = +new Date();
      console.log(time);
    }
});