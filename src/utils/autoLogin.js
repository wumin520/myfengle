import api from '@/utils/api';
import {USER_TOKEN} from '@/utils/constant';

module.exports = {
  async autoLogin () {
    wx.showLoading({
      title: '正在登录中',
      mask: true
    })
    let res = await wx.login()
    if (res.code) {
      this.wx_code = res.code
      await api.login({
        method: 'POST',
        query: {
          code: res.code
        }
      }).then(res => res.data).then(data => {
        if (data.status === 'ok') {
          console.log('doLogin -> data -> ', data)
          /* eslint-disable no-unused-vars */
          let {token} = data.payload
          if (token) {
            // 已经授权登录过，可以自动登录
            this.saveUserInfo(data.payload)
          } else {
            this.firstAuth && this.firstAuth(res.code)
          }
        } else {
          wx.showToast({
            title: data.message,
            icon: 'none',
            image: '',
            duration: 1500,
            mask: false
          })
        }
      })
    }
    wx.hideLoading()
  },
  async firstAuth (code) {
    code = code || this.wx_code
    if (!code) {
      let res = await wx.login()
      code = res.code
    }
    const userinfoRaw = await wx.getUserInfo().catch(res => {
      return res
    })
    if (userinfoRaw.errMsg !== 'getUserInfo:ok') {
      console.log('userinfoRaw -> ', userinfoRaw)
      return
    }
    // console.log(code, userinfoRaw)
    // return
    await api.authGetUserInfo({
      jscode: code,
      encryptedData: userinfoRaw.encryptedData,
      iv: userinfoRaw.iv,
      scene: wx.getStorageSync('scene')
    }).then(res => res.data).then(data => {
      const { openId } = data.content.responseAuthorizationData;
      wx.setStorageSync('openId', openId);
    })
  },
  saveUserInfo (payload) {
    
  }
}
