// pages/project_detail/project_detail.js
Page({
  data(){
    detail:{}
    teacher:{}
  },
  onLoad(options){
    var id = options.id
    wx.cloud.database().collection("Projects")
    .doc(id)
    .get()
    .then(res1 => {
      console.log('project detail请求Projects成功', res1.data)
      this.setData({
        detail:res1.data
      })
    })
    .catch(err1 =>{
      console.log('project detail请求Projects失败', err1)
    })

    wx.cloud.database().collection("Teachers")
    .get()
    .then(res2 => {
      console.log('project detail请求Teachers成功', res2.data)
      this.setData({
        teacher:res2.data
      })
    })
    .catch(err2 =>{
      console.log('project detail请求Teachers失败', err2)
    })
  },

  goMessage(){
    wx.navigateTo({
      url: '/pages/message/message',
    })
  }
})