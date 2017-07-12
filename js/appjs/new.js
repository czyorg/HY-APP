var  news =new Vue({
	 el:"#news",
	 data:{
	 	 uname:'施超',
	 	 newlist:[]
	 },
	 ready:function(){
	 	 initPage();
	 },
	 methods:{
	 	  setting:function(){
	 	  	    mui.openWindow({
	 	  	    	    url:'setting.html'
	 	  	    });
	 	  }
	 }
	
});

window.addEventListener('refresh',function(e){
	 console.log('公告刷新了');
		querynews ();
});
function initPage(){
	  mui.init();
	  mui.plusReady(function(){
	  	     news.uname=plus.storage.getItem("uname");
	  	     querynews();
//	  	      findWeather();
	  });
	  
	  mui.ready(function(){
	  	
	  	     news.uname=localStorage.getItem("uname");
	  	     querynews();
//	  	     findWeather();
	  })
}

function findWeather() {
      var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
      jQuery.getScript(cityUrl, function (script, textStatus, jqXHR) {
        var citytq = remote_ip_info.city; // 获取城市
 
        citytq = "南京";
        var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0&dfc=3";
        jQuery.ajax({
          url: url,
          dataType: "script",
          scriptCharset: "gbk",
          success: function (data) {
            var _w = window.SWther.w[citytq][0];
            var _f = _w.f1 + "_0.png";
            if (new Date().getHours() > 17) {
              _f = _w.f2 + "_1.png";
            }
            var img = "<img width='16px' height='16px' src='http://i2.sinaimg.cn/dy/main/weather/weatherplugin/wthIco/20_20/" + _f
        + "' />";
            var tq = "今日天气 :　" + citytq + " " + img + " " + _w.s1 + " " + _w.t1 + "℃～" + _w.t2 + "℃ " + _w.d1 + _w.p1 + "级";
            $('#weather').html(tq);
          }
        });
      });
    }


    function querynews (){
    	     var param = new Object();
    	     if(mui.os.plus){
    	     	param.username =plus.storage.getItem("username");
    	     }else{
    	     	param.username =localStorage.getItem("username");
    	     }
    	     console.log("ffff");
    	     sendUrlCmd(this,'wxApprove','querynews',param,function(data){
    	     	  if(data!=null&&data.length>0)
    	     	  		 news.newlist=data;
    	     });
    }
