const db = wx.cloud.database()
const userCollection = db.collection('user')
const leaderCollection = db.collection('talker_leaders')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name : '',
    classes: '',
    SId: '',
    group: '',
    tabType: 'tab1',
		key: 'tab1',
		conditionList: [],
    choosedCondition: {
			title: "请选择组长",
			id: '00'
		},
		conditionVisible: false,
  },



  //获取输入框内容
  bindinput(e){
    const type  = e.currentTarget.dataset.type
      this.setData({
        [type]: e.detail.value
      })
  },

  //组长选择
  showCondition() {
    this.setData({
      conditionVisible: !this.data.conditionVisible
    })
  },

  // 改变查询项
  onChangeCondition(e) {
    const list = this.data.conditionList
    list.forEach(item => {
      if (item.id === e.currentTarget.dataset.id) {
        item.select = true
        this.setData({
          'choosedCondition.title': item.title,
          'choosedCondition.id': item.id
        })
      } else {
        item.select = false
      }
    })
    this.setData({
      conditionList: list
    })
  },

  //提交
  add(){
  const{
    name,
    classes,
    SId,
  } = this.data;
  var group = this.data.choosedCondition.title  

  userCollection.add({
    data : {
      name,
      classes,
      SId,
      group:  group,
    }
  }).then(res =>{

  }).catch(err =>{

  })
  },

  // 提交跳转
  gotoTalkPage: function(param){
    var name = this.data.name
    var classes = this.data.classes
    var SId = this.data.SId
    var id = this.data.choosedCondition.id
    if (name == '' || classes  == '' || SId == '' || id == '00') {
      return wx.showToast({
        title: '报名信息有漏填项',
        icon: 'error'
      })
    }
    else{
      this.add();
      wx.navigateTo({
        url: '/pages/index/go',
      })
    }
  },

  loadConditionList: function() {
    var that = this
    var i = 1

    leaderCollection.get({
      success(res) {
        res.data.forEach(item => {
          that.data.conditionList.push({
            title: item.name,
            id: i.toString(),
            select: false
          },)

          i++
        })
      }
    })


    console.log(that.data.conditionList)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadConditionList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})