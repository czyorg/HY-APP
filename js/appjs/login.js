


(function (){
	  mui.init();
	  var username =document.getElementById("account");
	  var password =document.getElementById("password");
	  var autoLogin=document.getElementById("autoLogin");
	  var loginButton = document.getElementById('login');
	  var isauto =false;
	  var _isauto ='false';
	  var deviceid='test';

	  //是否自动登录事件
	  autoLogin.addEventListener('toggle',function(event){
			isauto=event.detail.isActive;
			if(isauto)
			    _isauto='true';
			else
			    _isauto='false';
			
	  });
	  
	  if(mui.os.plus){
			  mui.plusReady(function(){
			  	       deviceid =plus.device.uuid;
			  	       //deviceid=plus.push.getClientInfo().clientid;
			  	      // mui.toast(deviceid);
			  	      var cid =plus.push.getClientInfo().clientid;
			  	  
			  	       loginButton.addEventListener("tap",function(event){
						
							 login(username.value,password.value,_isauto,deviceid,cid);
					   });
			  });
	  }else {
	  	     loginButton.addEventListener("tap",function(event){
							 login(username.value,password.value,isauto,deviceid);
			 });
	  }
	
})();
//登录
     function login(username,password,isauto,deviceid,_cid){
//     	console.log("ffffsdsdfadf");
     	       var url='http://123.207.174.97:9999/mologin';
   	    	       //var url='http://192.168.2.219:8089/mologin';
// 	    	      mui.toast(plus.push.ClientInfo.clientid);
               console.log(_cid);
 	        mui.post(url,{
				   	   username:username,
				   	   password:password,
				   	   deviceid:deviceid,
				   	   cid :_cid
				   	   
				   },function(data){
				   	      if(data.returnCode=='Success'){
				   	      	  //mainPage();
//				   	      	  _username=username;
				   	      	  toMain(username);
				   	      	  if(isauto=='true'){
				   	      	  	console.log(isauto);
					   	      	  setLocalData("username",username);
					   	      	  setLocalData("password",password);
					   	      	  setLocalData("isauto",isauto);
					   	      	  setLocalData("uname",data.rsdata.uname);
					   	      	  if(_cid!=null){
					   	      	     setLocalData("cid",_cid);
					   	      	    }
					   	      	
				   	      	  }else{
				   	      	  	  setLocalData("username",username);
				   	      	  	  setLocalData("uname",data.rsdata.uname);
				   	      	  	  if(_cid!=null){
					   	      	     setLocalData("cid",_cid);
					   	      	    }
				   	      	  }
				   	      	 
				   	      }else{
				   	      	  mui.toast("登录失败:"+data.returnMsg);
				   	      	  document.getElementById("account").value='';
				   	      	  document.getElementById("password").value='';
				   	      }
				   	      
				   },'json')
 };
 
  function setLocalData(key,value){
  	  if(mui.os.plus){
  	  	   plus.storage.setItem(key,value);
  	  }else{
  	  	  localStorage.setItem(key,value);
  	  }
  }
 
 
        function toMain(_username) {

						setTimeout(function() {
							mui.openWindow({
								url:'main.html',
								id: 'main',
								show: {
									aniShow: 'pop-in'
								},
								extras:{
									username:_username
								},
								waiting: {
									autoShow: false
								}
							});
						}, 0);
		 };
