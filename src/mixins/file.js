import api from '@/utils/api';
import wepy from '@wepy/core';

export default {
    methods: {
        downloadFile (url, success) {
          console.log(url, 'downloadFile -> ')
            wx.downloadFile({
              url, //仅为示例，并非真实的资源
              success (res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                  wx.saveImageToPhotosAlbum({
                    filePath: res.tempFilePath,
                    success: () => {
                      success && success();
                    }
                  })

                //   wx.playVoice({
                //     filePath: res.tempFilePath
                //   })
                }
              }
            })
        },
        // 上传图片返回地址存储
        async uploadImage (count = 9) {
          var that = this
          wx.chooseImage({
            count: count - that.imagesArr.length,
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              var tempFilePaths = res.tempFilePaths
              for (let img of tempFilePaths) {
                wx.uploadFile({
                  url: api.uploadUri,
                  filePath: img,
                  name: 'image',
                  formData: {
                    type: 'static'
                  },
                  success: function(res) {
                    var data = JSON.parse(res.data)
                    that.imagesArr = that.imagesArr.concat(data.payload.url)
                    that.imagesNameArr = that.imagesNameArr.concat(data.payload.name)
                    that.$apply()
                    that.$emit('uploadSuccess', data.payload)
                  }
                })
              }
            }
          })
        },
        uploadFile (success) {
            wx.chooseImage({
                success: (res) => {
                  this.showLoading('正在上传中...');
                  const tempFilePaths = res.tempFilePaths;
                  console.log('handleUploadFile -> ', tempFilePaths)
                  wx.uploadFile({
                    url: api.server + '/upload', //仅为示例，非真实的接口地址
                    filePath: tempFilePaths[0],
                    name: 'image',
                    formData: {
                      'type': 'task'
                    },
                    success: (res) => {
                      const result = JSON.parse(res.data);
                      console.log(result, res, '1');
                      success && success(result.payload);
                    }
                  })
                },
                complete: () => {
                  wx.hideLoading();
                }
              })
        }
    }
}