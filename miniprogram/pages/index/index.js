const db = wx.cloud.database()
const userCollection = db.collection('user')
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
		conditionList: [{
				title: '组长1',
				id: '1',
				select: true
			},
			{
				title: '组长2',
				id: '2',
				select: false
			},
			{
				title: '组长3',
				id: '3',
				select: false
			},
			{
				title: '组长4',
				id: '4',
				select: false
			},
			{
				title: '组长5',
				id: '5',
				select: false
      },
		],
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
onChnageCondition(e) {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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