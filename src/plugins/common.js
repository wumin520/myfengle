const MyPlugin = {}
MyPlugin.install = function (wepy, options) {
  // 1. 添加全局方法或属性
  wepy.myGlobalMethod = function () {
    // 逻辑...

  }

  let systemInfo = wx.getSystemInfoSync()
  let modelmes = systemInfo.model;
  let isIphoneX = false;
  if (modelmes && modelmes.indexOf('iPhone X') !== -1) {
    isIphoneX = true
  }
  const statusBarHeight = systemInfo.statusBarHeight;
  // 2. 注入组件选项
  wepy.mixin({
    created: function () {
      // 逻辑...
      wx.showShareMenu({
        menus: ['shareAppMessage', 'shareTimeline']
      });
    },
    onShow: function () {
      // 此处都为神策埋点代码
      var curPages = getCurrentPages();
      if (curPages.length < 1) return;
      const pages = [
        'pages/index',
        'pages/home',
        'pages/detail',
        'pages/search',
        'pages/my',
        'pages/mxtHome',
        'pages/login',
        'pages/webview',
        'pages/downloadImg',
        'pages/uploadImg'
      ];
      const pageNames = [
        '课程列表',
        '专属客服',
        '课程详情页',
        '课程搜索页',
        '我的页面',
        '首页',
        '登录页面',
        '',
        '',
        ''
      ];
      const pageIndex = pages.indexOf(curPages[curPages.length - 1].route);
      getApp().sensors.registerApp({
        $title: pageNames[pageIndex],
      });
    },
    data: {
      isIphoneX,
      statusBarHeight
    },
    methods: {
      startTrack(sensors) {
        sensors = sensors || getApp().sensors;
        const openId = wx.getStorageSync('openId');
        if (openId) {
          sensors.setOpenid(openId);
          sensors.init(); // 神策初始化
        }
      },
      trackEvent(params) {
        const [section_name, module_name, module_element_name] = params;
        getApp().sensors.track('newbees_applets_click', {
          section_name,
          module_name,
          module_element_name,
        });
      },
      toast(title) {
        wx.showToast({
          title, //提示的内容,
          icon: 'none', //图标
          duration: 3000
        })
      },
    }
  })
}
export default MyPlugin