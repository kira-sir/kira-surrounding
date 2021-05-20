// pages/project_detail/project_detail.js
let Page_View1 = 1;
var id_static = "";
Page({
  data() {
    detail: {}
    teacher: {}
  },
  onLoad(options) {
    var id = options.id
    wx.cloud.database().collection("Projects")
      .doc(id)
      .get()
      .then(res1 => {
        console.log('project detail请求Projects成功', res1.data)
        this.setData({
          detail: res1.data
        })
        Page_View1 = res1.data.Page_View
        id_static = id
      })
      .catch(err1 => {
        console.log('project detail请求Projects失败', err1)
      })

    wx.cloud.database().collection("Teachers")
      .get()
      .then(res2 => {
        console.log('project detail请求Teachers成功', res2.data)
        this.setData({
          teacher: res2.data
        })
      })
      .catch(err2 => {
        console.log('project detail请求Teachers失败', err2)
      })

    // wx.cloud.database().collection("Projects")
    // .add({
    //   data:{
    //     Detail_Information:'Something not just like this' ,
    //     Limitation:'本科在读',
    //     Project_Time:'三个月',
    //     Published_Time:'12132253',
    //     Teacher:'小明',
    //     Work_Orientation:'数据库',
    //     Work_Time:'一周6小时',
    //     Page_View: 125 ,
    //     Published_Time: "2021-05-20 10:17:49"
    //   }
    // })
    // .then(res4 => {
    //   console.log('Projects添加成功', res4)
    // })
    // .catch(err4 => {
    //   console.log('Projects添加失败', err4)
    // })
  },

  //关闭时更新数据的浏览量
  onUnload: function () {
    Page_View1++
    wx.cloud.database().collection("Projects")
      .doc(id_static)
      .update({
        data: {
          Page_View: Page_View1
        }
      })
      .then(res3 => {
        console.log('修改成功', res3)
      })
      .catch(err3 => {
        console.log('修改失败', err3)
      })

    // 刷新上一页的数据，更新浏览量
    var pages = getCurrentPages()
    var prevpage = pages[pages.length - 1]
    prevpage.setData({
      "list": []
    })
    wx.navigateBack({
      delta: 1,
      success: function (event) {
        var page = getCurrentPages().pop();
        page.onLoad();
      }
    })
  },

  goMessage() {
    wx.switchTab({
      url: '/pages/message/message',
    })
  }
})