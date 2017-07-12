var  approve =new Vue({
	 el:"#approve",
	 data:{
	 	title:'合同管理',
	 	state:'N',
	 	appinfo:{}
	 },
	 ready:function(){
	 	initPage();
	 	
	 
	 },
	 methods:{
	 	  openFj:function(src){
	 	  	  console.log(this.appinfo.billid);
	 	  	  openFJ(this.appinfo.billid,src);
	 	  },
	 	  approve:function(billstate){
	 	  	   console.log(billstate);
	 	  	   var appmsg =$("textarea").val();
	 	  	   if(appmsg==null||appmsg==''||appmsg==undefined){
	 	  	   	    mui.toast("请填写审批意见");
	 	  	   	    return ;
	 	  	   }
	 	  	   
	 	  	   var btnArray = ['否', '是'];
	 	  	   var title =billstate==1?'确认同意':'确认不同意';
                mui.confirm(title, '', btnArray, function(e) {
                    if (e.index == 1) {
                        approvebill(billstate,appmsg);
                    } else {
                          console.log("点击了否");
                    }
                })
	 	  	      
	 	  }
	 }
	
});

function approvebill(billstate,comment){
	    var param =new Object();
	    param.billid=approve.appinfo.billid;
	    param.billtype=approve.appinfo.djlxbm;
	    param.billno=approve.appinfo.billno;
	    param.approvers=getPsncode();
	    param.state=billstate;
	    param.appmsg=comment;
	    sendUrlCmd(this,'wxApprove','approve',param,afterApprove);
	    
}
function afterApprove(data){
	if(data.returnCode=='Success'){
		   setTimeout(function(){
		   	mui.toast("审批成功");
		    mui.back();
		   }
		   ,1500);
		  
	}else{
		setTimeout(function(){
		   mui.toast(data.returnMsg);
		   }
		 ,3000);
		  
	}
}

function initPage(){
	  mui.init({
	  	
	  		beforeback:function(){
			  	if(mui.os.plus){
					var list = plus.webview.currentWebview().opener();
//					console.log("审批界面回退");
				   //触发列表界面的自定义事件（refresh）,从而进行数据刷新  
					mui.fire(list, 'refresh1');  
				}
			}
	  });
	  if(mui.os.plus){
	  mui.plusReady(function(){
	  	    //如果有参数 
	  	    var curWB =plus.webview.currentWebview();
	  	    
	  	    var  billtype =curWB.billtype;
	  	    var  billid=curWB.billid;
	  	    approve.state=curWB.state;
	  	    
	  	    queryApproveInfo(billtype,billid);
	  	    mui(".mui-scroll-wrapper").scroll({
 				deceleration:0.0006,
				bounce: false,//滚动条是否有弹力默认是true
				indicators: true, //是否显示滚动条,默认是true
			});
	  });
	  }else{
	  	 mui.ready(function(){
	  	 	mui(".mui-scroll-wrapper").scroll({
 				deceleration:0.0006,
				bounce: false,//滚动条是否有弹力默认是true
				indicators: true, //是否显示滚动条,默认是true
			});
			
			mui(".mui-fj").on('tap','.mui-fj',function(){
	  			console.log("tap")
			});
			queryApproveInfo();
	  	 });
	  }
}

function getPsncode(){
	  if(mui.os.plus)
	     return  plus.storage.getItem("username");
	  else
	  return localStorage.getItem("username");
}

function queryApproveInfo(billtype,billid){
	var param  =new Object();
	param.billtype=billtype||'2644';
	param.billid=billid||'1003AA1000000000ENS4';
	sendUrlCmd(this,"wxApprove","queryappinfo",param,setApproveInfot);
}


function setApproveInfot(data){
	approve.appinfo=data.rsdata;
	console.log(JSON.stringify(approve.appinfo));
	var _state =getHttpParams('state');
	if(_state)
	   approve.state=_state;
}





