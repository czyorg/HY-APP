/**
 * Created with IntelliJ IDEA.
 * User: seeker910
 * Date: 13-11-1
 * Time: 上午3:45
 * To change this template use File | Settings | File Templates.
 */
appAjax = function appAjax(url,method){

    this.method = method||'POST';
    this.url=  url||null;
    this.contentType= 'application/x-www-form-urlencoded; charset=UTF-8',
    this.dataType= 'json';
    this.async= false;
    this.username= '';
    this.password= '';
    /*
    *
    * */
    this.complete=function(response)
    {
        //console.debug('request complete:['+this.url+']');
    };

    /*

    * */
    this.error=function(xhr, textStatus, error){
//      Iseer_Loading.hideLoading();
//      Iseer_Loading.alert('网络情况不佳,请稍后再试！');

        console.debug('request failure:['+this.url+'] (' + textStatus + ')');
        console.error(error + '(' + textStatus + ')');
        
    };

    /*
    * */
    this.success=function(response) {
        console.debug('request success:[' + this.url + ']');
    };

    /*
     data：作为Ajax对象请求时的参数中data属性（即远程方法的参数）
     callback:回调函数，callback方法即为：ajax中的success方法。
    * */
    this.request= function request(data,callback) {

        var me = this;
        if(callback)
        {
//      	    console.log("调用成功了");
            this.success = function(response){

                return callback.call(me,response);
            };
        }

        this.data = data;
        return $.ajax( this);
    };
    /*
     data：作为Ajax对象请求时的参数中data属性（即远程方法的参数）
     callback:回调函数，callback方法在success方法执行后执行。
    * */
    this.requestJson =function requestJson(data,callback) {

        var me = this;
        if(callback)
        {
            this.success = function(response){

                return callback.call(me,response);
            };
        }

        this.data = data;

        return $.ajax(this);
    }


    return this;
}




function sendUrlCmd(sender,module,action,param, callback){

//  var _uid = getHttpParams('uid');//"100105"
//  if(_uid== undefined || _uid== null || _uid=='')
//  {
//      Iseer_Loading.hideLoading();
//      Iseer_Loading.alert('请通过微信关注公司企业号！');
//      return;
//
//  }

// console.log("进入了ajax");
    var _args = param||{};
    _args['action'] = action;
//  _args["uid"]= _uid;
//  _args["psncode"]= _uid;
    var _module = module || 'wxApprove';
     var url = 'http://123.207.174.97:9999/'+ action;
    // var url='http://192.168.2.219:8089/'+action;
    //var url = 'http://www.czycloud.xyz:9998/service/' + _module;
    var ajax = appAjax(url);
    ajax.requestJson(_args,callback);
}


function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}

function getHttpParams(name)
{
    var r = new RegExp("(\\?|#|&)"+name+"=([^&#]*)(&|#|$)");
    var m = location.href.match(r);
    return decodeURIComponent(!m?"":m[2]);
}

function setTitle(title) {
    document.title = title || '未命名标题'
}