(function(){
	
	if(mui.os.plus){
		 mui.plusReady(function(){
		 	
		 	  var cid =plus.storage.getItem("cid");
		 	  if(cid==null||cid==''||cid==undefined){
		 	  	     cid =plus.push.getClientInfo().clientid;
		 	  	     if(cid==null||cid==''||cid==undefined){
		 	  	     	 return ;
		 	  	     }else{
		 	  	     	var param = new Object();
		 	  	     	param.cid=cid;
		 	  	     	param.username=plus.storage.getItem("username");
		 	  	     	sendUrlCmd(this,'wxApprove','pushcid',param,function(data){
		 	  	     		 if(data){
		 	  	     		 	
		 	  	     		 	 if(data.cid!='empty'){
		 	  	     		 	 	   plus.storage.setItem('cid',data.cid);
		 	  	     		 	 }
		 	  	     		 	
		 	  	     		 }
		 	  	     	});
		 	  	     	
		 	  	     	
		 	  	     }
		 	  	    
		 	  }else{
		 	  	  console.log("已经获取到cleintID");
		 	  }
		 	
		 	
		 })
	}
	
})();
