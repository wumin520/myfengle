import bus from '@/common/eventHub';
import { USER_ID } from '@/utils/constant';

export default function (url, data = {}, method = 'GET') {
    return new Promise((reslove, reject) => {
        if (data.cuswebuserid != undefined && !data.cuswebuserid) {
            // 如果登录之后back
            const userId = wx.getStorageSync(USER_ID);
            data.cuswebuserid = userId;
            if (!userId) {
                wx.navigateTo({
                    url: 'login'
                });
                return
            }
        }
        wx.request({
            url,
            method,
            data,
            success: function (res) {
                // bus.$emit('need-login', 1)
                console.log('response success -> ', res)
                if (res.statusCode == 200 && res.data.returnCode == '0000') {
                    reslove(res);
                } else {
                    const title = (res.data && res.data.msg) || (res.data && res.data.returnMsg) || res.data.error || ''
                    wx.showToast({
                        title,
                        icon: 'none'
                    });
                    reject(res);
                }
            },
            fail: function (err) {
                // bus.$emit('need-login', 2)
                console.log('request fail -> ')
                reject(err)
            }
        })
    });
}