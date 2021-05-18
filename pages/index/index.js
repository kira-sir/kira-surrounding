// index.js
Page({
  data:{
    list:{},
    selected: 0,
    switch_list:['推荐' , '最新'],
  },
  onLoad(){
    wx.cloud.init()
    wx.cloud.database().collection("Projects")
    .get()
    .then(res => {
      console.log('index请求Projects成功', res.data)
      this.setData({
        list:res.data
      })
    })
    .catch(err =>{
      console.log('index请求Projects失败', err)
    })
  },


  //切换选择框
  selected:function(e){
    console.log(e)
    let that = this
    let index = e.currentTarget.dataset.index
    console.log(index)
    if(index == 0){
      this.setData({
        selected:0
      })
    }
    if(index == 1){
      this.setData({
        selected:1
      })
    }
  },







  //跳转到项目详情页
  goDetail(e){
    console.log('点击了跳转到项目detail页面',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/project_detail/project_detail?id='+e.currentTarget.dataset.id,
    })
  }

})
