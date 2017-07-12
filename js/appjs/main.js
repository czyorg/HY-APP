var  main =new Vue({
	el:"#main",
	data:{
		noappnum:0,
		initIndex: 0, //[初始化参数]
		index:0,
      	title: '首页',
      	activeTab: 'new.html',     			
      	tabbar: [{url:'new.html',title:'公告新闻'},
      			 {url:'approvelist.html',title:'待审批'},
      		     {url:'approvelist2.html',title:'已审批'}],
      	subStyle: {
      		top: '0px',
			bottom: '51px'
      	}
	},
	ready:function(){
		var self=this;
//		console.log(self.tabbar[1].url);
		initPage(self);
//		queryApproveNum();
	},
	created:function(){
		
	},
	
	methods:{
		tab:function(index){
			  var targetTab = this.tabbar[index].url;
					// 标题切换
					this.title = this.tabbar[index].title;
					// 子页内容切换
					if(mui.os.plus){
						if(targetTab==this.activeTab){
							return;
						}else{
//							console.log("不一样");
						}
//					// 隐藏当前webview
						plus.webview.hide(this.activeTab);
//						// 显示目标webview
						
//					    plus.webview.open(this.tabbar[index].url);
                        
						plus.webview.show(targetTab);
						
						mui.fire(plus.webview.getWebviewById(targetTab), 'refresh'); 
//						mui.fire(plus.webview.getWebviewById(targetTab), 'plusready'); 
						// 更改当前活跃的选项卡
						this.activeTab = targetTab;
					}else{
						// 创建iframe代替子页面
						createIframe('.mui-content',{
							url: targetTab,
							style: this.subStyle
						})
					}
		}
	}
	
});

  function initPage(self){
  	   mui.init();
  	   var username ='';
  	  // 初始化
      	if(mui.os.plus){
      		mui.plusReady(function() {
      			
      			queryApproveNum();
      			
      			mui.back=function(){
	      	    }
      			
      			//username=plus.storage.getItem("username");
	      		    var curWs = plus.webview.currentWebview();
	      				for(var i=0;i < self.tabbar.length;i++){
	      					var subUrl = self.tabbar[i].url;
//	      					console.log(self.tabbar[i].url);
	      					var subWs = plus.webview.create(subUrl, subUrl, self.subStyle);
							if(i != self.initIndex){
								subWs.hide();
							}
							curWs.append(subWs);
	      				}	;
	      				
	      			       var first = null;  
				            plus.key.addEventListener('backbutton', function(){  
				                //首次按键，提示‘再按一次退出应用’  
				                if(!first){  
				                    first = new Date().getTime();  
				                    mui.toast('再按一次退出应用1');  
				                    setTimeout(function(){  
				                        first = null;  
				                    },2000);  
				                } else {  
				                    if(new Date().getTime() - first < 2000){  
				                        plus.runtime.quit(); 
				                    }  
				                }  
				            }, false);  
	      			});
      			}else{
	  
      				createIframe('.mui-content',{
						url: self.tabbar[self.initIndex].url,
						style: self.subStyle
					});
    			   }
  }

  function queryApproveNum(){
  	    var uid =null;
  	    if(mui.os.plus)
  	        uid =plus.storage.getItem("username");
  	    else
  	        uid =localStorage.getItem("username");
  	    if(uid){
  	    	     var param = new Object();
  	    	    	   param.username=uid;
//	    	    	   param.cid=plus.push.getClientInfo().clientid;
//	    	    	   console.log(param.cid);
  	    	       sendUrlCmd(this,'wxApprove','querynotappnums',param,function(data){
  	    	       	     main.noappnum=data.rsdata.rowCount;
  	    	       	     
  	    	       })
  	    }
  }
  



window.addEventListener('refresh1',function (e){
//	console.log("列表刷新后，在更新了")
	queryApproveNum();
});
