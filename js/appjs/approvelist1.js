var _index =1;
var _tapindex=0;
var _search=false;
var  applist =new Vue({
	 el:"#applist",
	 data:{
	 	applist:[],
		
	 },
	 ready:function(){
	 					mui.init({
						pullRefresh: {
							container: '#pullrefresh',
							up: {
								contentrefresh: '正在加载...',
								callback: this.pullupRefresh
							}
						}
					});
					if (mui.os.plus) {
						mui.plusReady(function() {
							setTimeout(function() {
								mui('#pullrefresh').pullRefresh().pullupLoading();
							}, 1000);
						});
					} else {
						mui.ready(function() {
							mui('#pullrefresh').pullRefresh().pullupLoading();
						});
					}
	 },
	 created:function(){
	     	
	 },
	 methods:{
	 	 tabchange:function(index){
	 	 	 if(_tapindex==index){
//	 	 	 	console.log("点击同一页签");
	 	 	     return ;
	 	 	 }else {
	 	 	 	 
	 	 	 	   this.applist=[];
	 	 	 	   _index=1;
	 	
//	 	 	 	   console.log("tab切换进行刷新");
	 	 	 	   queryApproveList(getDjdl(index),this);
	 	 	 	   _tapindex=index;
	 	 	 	  returnhead();
//	 	 	 	   mui(".mui-scroll-wrapper").scroll().reLayout();
//	 	 	 	    mui(".mui-scroll-wrapper").scroll().scrollTo(0,0,100);
	 	 	 	   //console.log(_tapindex);
	 	 	 }
	 	 },
	 	 pulldownRefresh: function  (){
	 	 	  setTimeout(function(){
	 	 	  	    mui("#pullrefresh").pullRefresh().endPulldownToRefresh();
	 	 	  },1500)
	 	 },
	 	 pullupRefresh :function  (){
	 		setTimeout(function(){
	 			mui('#pullrefresh').pullRefresh().endPullupToRefresh() ;
//	 			mui('#pullrefresh').disablePullupToRefresh();
//              console.log("上拉刷新");
                if(_search){
				   	    this.applist.applist=[];
				   	    _search=false;
	  			 }
      	 	 	queryApproveList(getDjdl(_tapindex),this.applist);
			 },500);
		}
		
	 	
	 }
	
});
       
function queryApproveList (_djdl,self){
// 	   console.log('#####'+self+"#####"+_djdl+"#####"+_index);
	   var param  = new Object ();
	   param.billtype =_djdl;
	   param.index =_index;
	   if(mui.os.plus){
	   	
	   	   param.username=plus.storage.getItem("username");
//	   	   console.log(param.username);
	   }else{
	   	   param.username=localStorage.getItem("username");
	   	   
	   }
	   
	   sendUrlCmd(self,"wxApprove","querynotapps",param,function(data){
	   	   console.log(data);
	   	         if(data!=null&&data.length>0){
	   	       		 for (i=0;i<data.length;i++) {
							self.applist.push(data[i]);
					  }
	   	        		 _index=_index+1;
                     
//	 	 	 	   mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                   mui('#pullrefresh').pullRefresh().enablePullupToRefresh();
//                  returnhead();
	   	        }else{
//	   	            	mui.toast("没有更多数据了");
	   	        	     mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
	   	        	     mui('#pullrefresh').pullRefresh().disablePullupToRefresh();


	   	        }
	   });
}

function getDjdl(index){
//	console.log("getDjdl");
	  if(index==0)
	     return 'all';
	  else if(index==1)
	     return 'ht';
	  else if(index==2)
	     return 'yf';
	  else if(index==3)
	     return 'bx';
	  else 
	     return 'xz';
	  
}

window.addEventListener('refresh1',function (e){
//	console.log("列表开始刷新了");
	_index=1;
	applist.applist=[];
//	   console.log(applist.applist.size);
	   queryApproveList(getDjdl(_tapindex),applist);
	   
	   if(mui.os.plus){
	   	    var  mainWB =  plus.webview.getWebviewById("main");
	   	    mui.fire(mainWB,'refresh1');
	   }
//	   console.log(applist.size);
});



function search(){
//	console.log("search");
	  var search_sender =document.getElementById("search_sender").value;
	  var search_dept  =document.getElementById("search_dept").value;
	  if((search_sender==null||search_sender==undefined||search_sender=="")&&(search_dept==null||search_dept==undefined||search_dept=="")){
	  	   mui.toast("请输入查询条件");
	  	   return;
	  }
	        param  = new Object();
			param.state='F';
			param.billtype=getDjdl(_tapindex);
			
			param.index=1;
			param.zdr=search_sender;
			param.billno=search_dept;
			if(mui.os.plus){
	   	   		param.username=plus.storage.getItem("username");
	  		 }else{
	   	   		param.username=localStorage.getItem("username");
	   	   
	  		 }
	 		 sendUrlCmd(this,"wxApprove","querynotapps",param,function (data){
	  	       applist.applist=data;
	  	       applist.index=0;
	  	       mui('#topPopover').popover('hide');
	  	       _index=0;
	  	       _search=true;
			});
	  }

function getScreen(maxW, maxH) { 
 
                var arr = [ 
                    document.documentElement.clientWidth || document.body.clientWidth, 
                    document.documentElement.clientHeight || document.body.clientHeigth 
                ]; 
                maxW && (function() { 
                    if(arr[0] > maxW) { 
                        arr[0] = maxW; 
                    } 
                }()); 
                maxH && (function() { 
                    if(arr[1] > maxH) { 
                        arr[1] = maxH; 
                    } 
                }()); 
                return arr; 
            } 
   function returnhead(){
   	   if(mui.os.android)
   	   		window.scrollTo(0, 0);
   	   else if(mui.os.ios)
   	  	    mui('#pullrefresh').pullRefresh().scrollTo(0,0);
   	   else
   	        mui('.mui-scroll-wrapper').scroll().scrollTo(0,0,100);
   }

   function approve(data_index){
   	     var approveinfo =applist.applist[data_index];
   	     if(approveinfo){
   	     	  var _url =getApproveUrl(approveinfo.djlxbm);
// 	     	        console.log(_url);
// 	     	        console.log(approveinfo.djlxbm);
// 	     	        console.log(approveinfo.billid);
   	     	        mui.openWindow({
   	     	        	      url:_url,
   	     	        	      id:_url,
   	     	        	       extras:{
   	     	        	       	     billid:approveinfo.billid,
   	     	        	       	     billtype:approveinfo.djlxbm,
   	     	        	       	     state:'N'
   	     	        	       }
   	     	        });
   	     }else{
   	     	  mui.toast("没有审批的数据");
   	     }
   }
   
   
   function getApproveUrl(djdl){
   	     switch (djdl){
   	     	case '2641':
   	     	    return 'approve_bx.html';
   	     	case '2642':
   	     	    return 'approve_bx.html';
   	     	case '2645':
   	     	    return 'approve_bx.html';
   	     	case '2646':
   	     	    return 'approve_bx.html';
   	     	case '2644':
   	     	    return 'approve_bx.html';
   	     	case '264X-1':
   	     	    return 'approve_bx.html';
   	     	case '264X-':
   	     	    return 'approve_bx.html';
   	     	case 'F3-1':
   	     	     return 'approve_yf.html';
   	     	case '2346':
   	     	     return 'approve_yf.html';
   	     	case 'D3':
   	     	     return 'approve_yf.html';
   	     	case '6350':
   	     	     return 'approve_hr.html';
   	     	default:
   	     		return 'approve.html'
   	     }
   }
