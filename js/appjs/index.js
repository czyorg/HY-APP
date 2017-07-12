  var  _username=null;
  var  _password=null;
  var  _deviceid='test';
  var  _isauto =false;
  (function (){
  	  mui.init({
  	  		keyEventBind: {
      		  backbutton: true , //关闭back按键监听
//    		  meunbutton:false
    			}}
  	  	);
  	  if(mui.os.plus){
	      mui.plusReady(function(){
	   	        _username=plus.storage.getItem("username");
	   	        _password=plus.storage.getItem("password");
	   	        _isauto =plus.storage.getItem("isauto");
	   	        _deviceid=plus.device.uuid;
	   	        login(_username,_password,_isauto);
	   	        
	   	        
	   	         var first = null;  
				            plus.key.addEventListener('backbutton', function(){  
				                //首次按键，提示‘再按一次退出应用’  
				                if(!first){  
				                    first = new Date().getTime();
				                    console.log(first);
				                    mui.toast('再按一次退出应用1');  
				                    setTimeout(function(){  
				                        first = null;  
				                    },2000);  
				                } else {  
				                    if(new Date().getTime() - first < 2000){  
				                        plus.runtime.quit(); 
				                    }  
				                }  
				            }, true);  
	      			mui.back=function(){
//	      				     console.log("ccccc");
	      			}
	   	        
	      });
      }else {
              	_username=localStorage.getItem("username");
	   	        _password=localStorage.getItem("password");
	   	         _isauto =localStorage.getItem("isauto");
	   	         login(_username,_password,_isauto);
      	
      }
  })();
  
   function login (username,password,isauto){
   	    if(isauto&&username!=null&&password!=null){
   	    	       //var url ='http://192.168.2.219:8089/mologin';
   	    	       var url='http://123.207.174.97:9999/mologin';
   	    	       mui.post(url,{
				   	   username:username,
				   	   password:password,
				   	   deviceid:_deviceid
				   },function(data){
				   	console.log(JSON.stringify(data));
				   	      if(data.returnCode=='Success'){
				   	      	  //mainPage();
				   	      	  _username=username;
				   	      	//  console.log("ffffffff");
				   	      	  toMain();
				   	      }else{
				   	      	 mui.openWindow('login.html','login');
				   	      }
				   	      
				   },'json')
   	    }else{
   	    	      mui.openWindow('login.html','login');
   	    }
   	
//	    if(username==null||password==null){
//	    	    
//	    	     mui.openWindow('login.html','login');
//	    }else{
//	    	      mui.post('http://192.168.2.46:8089/mologin',{
//				   	   username:username,
//				   	   password:password,
//				   	   deviceid:_deviceid
//				   },function(data){
//				   	      if(data.returnCode=='Success'){
//				   	      	  //mainPage();
//				   	      	  _username=username;
//				   	      	  toMain();
//				   	      }else{
//				   	      	 mui.openWindow('login.html','login');
//				   	      }
//				   	      
//				   },'json')
//	    }
   };
   
         //登录成功后跳转主页面
         function toMain(){
                  	{
                  		//console.log("跳转");
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
         }
  