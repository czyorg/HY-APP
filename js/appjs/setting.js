var  setting =new Vue({
	 el:"#settings",
	 data:{
	 	   username:'',
	 	   uname:'',
	 },
	 ready:function(){
	 	 initPage();
	 },
	 methods:{
	 	  logout:function(){
	 	  	   
	 	  	   var param =new Object();
	 	  	   param.username =getUsername();
	 	  	   param.deviceid=getDeviceid();
	 	  	   console.log(JSON.stringify(param));
	 	  	   sendUrlCmd(this,"wxApprove","mologout",param,function(data){
	 	  	   	
	 	  	   	   clearUserInfo();
	 	  	   	   login();
	 	  	   });
	 	  	   
	 	  },
	 	  clearFj:function(){
	 	  	    if(mui.os.plus){
		 	  	    	    plus.io.resolveLocalFileSystemURL( "_downloads/", function( entry ) {
	                         entry.removeRecursively( function(sucess){
	                         	  mui.toast("清除成功");
	                         	  mui.back();
	                         }, function(error){
	                         	  console.log(error);
	                         } );
				     	}, function ( e ) {
							console.log( "Resolve file URL failed: " + e.message );
					 } );
	 	  	    }
	 	  }
	 }
	
});



function clearUserInfo(){
	     if(mui.os.plus){
	     	  plus.storage.clear();
	     }else{
	     	  localStorage.clear();
	     }
}

function getUsername(){
	  if(mui.os.plus){
	  
	      return plus.storage.getItem("username");
	  }else{
	  	  return "";
	  }
}

function getDeviceid(){
	if(mui.os.plus)
	   return plus.device.uuid;
}

function login(){
	  mui.openWindow({
	  	  url:'login.html'
	  })
}

function initPage(){
	  mui.init();
	  mui.plusReady(function(){
	  	    //如果有参数 
	  	     setting.username =plus.storage.getItem("username");
	  	     setting.uname =plus.storage.getItem("uname");
	  	     
	  });
	  mui.ready(function(){
	  	     setting.username =localStorage.getItem("username");
	  	     setting.uname =localStorage.getItem("uname");
	  });
}
