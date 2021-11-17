
// 1.用户上滑页面 滚动条触底 开始加载下一页


import { request } from "../../request/index.js"

Page({

  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      }
    ],
    goodsList:[]
  },
  //接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },

  //总页数
  totalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  // 能获取上一个页面传递过来的CID
  onLoad: function (options) {
    this.QueryParams.cid=options.cid;
    this.getGoodList();
  },

  // 获取商品列表数据
  async getGoodList(){
    const res = await request({url:"/goods/search",data:this.QueryParams});
    // 获取 总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize)
    // console.log(this.totalPages);
    this.setData({
      // 拼接了数组
      goodsList:[...this.data.goodsList,...res.goods]
    })
    // 关闭下拉刷新功能
    wx.stopPullDownRefresh();
      
  },


  // 标题点击事件（从子组件传递过来的）
  handleTabsItemChange(e){
    // 1.获取被点击的标题索引
    const index = e.detail.index;
    // 2.修改源数组，激活点击效果
    let tabs = this.data.tabs;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    this.setData({
      tabs
    })
  },

  // 页面上滑 滚动条触底事件
  onReachBottom: function () {
    if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页数据
      wx.showToast({
        title: '没有下一页数据',
      });
        
    }else{
      // 有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodList();
    }
    
  },

  //下拉刷新事件
  onPullDownRefresh(){
    // 1.重置数组
    this.setData({
      // 因为之前做过数组拼接
      goodsList:[]
    })
    // 2.重置页码
    this.QueryParams.pagenum=1;
    // 3.发送请求
    this.getGoodList();
  }

})