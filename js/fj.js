

function openFJ(billid,src){
	 if(mui.os.plus){
	 	    mui.plusReady(function(){
	 	    	
	 	     var filename = getFileName(src);
	 	    	 if(filename==null||filename=='')
	 	    	     return '附件名不正确';
	 	    	     var url ='_downloads/'+billid+'/'+filename;
//	 	    	     console.log(url);
	 	    	 plus.io.resolveLocalFileSystemURL(url,function(entry){
	 	    	 	    console.log("文件已存在");
	 	    	 	    var isFile =entry.isFile;
	 	    	 	    if(isFile){
	 	    	 	    	       openFile(entry.fullPath);
	 	    	 	    }
	 	    	 },function (e){
	 	    	 	    //如果文件不存在，下载文件
	 	    	 	     createFile(billid,src);
	 	    	 });	 	    	
	    })
	 	    
	 }
}


function getFileName(src){
	 var filenames =src.split("/");
	 if(filenames==null)
	    return '';
//	 console.log(filenames[filenames.length-1]);
	 
	 return filenames[filenames.length-1]
}

function checkFileHZ(filename){
	 var fileHZ =filename.split(".");
	 if(fileHZ==null)
	   return '';
	 return fileHZ[fileHZ.length-1];
}

function createFile(billid,src){
	    var filepath='_downloads/'+billid+'/';
//	    console.log(filepath);
	    console.log(src);
//	    plus.downloader.c
	    var dtask = plus.downloader.createDownload( src, {filename:filepath}, function ( d, status ) {
		// 下载完成
				if ( status == 200 ) { 
					var sd_path = plus.io.convertLocalFileSystemURL(d.filename);
				//	console.log("sssss");//
					//plus.runtime.openFile(d.filename);
					openFile(sd_path);
				} else {
					 console.log( "Download failed: " + status ); 
				}  
		});
		dtask.start(); 
 }


 function openFile(localUrl){
 	      // console.log(localUrl);
 	       var filehz =checkFileHZ(localUrl);
 	       
 	       if(filehz=='')
 	          return ;
 	          
 	       if(filehz=='doc'||filehz=='docx'||filehz=='xls'||filehz=='xlsx'||filehz=='ppt'||filehz=='pptx'||filehz=='pdf'){
	 	       	  if(mui.os.android){
		 	           plus.runtime.openFile(localUrl,function(error){
		 	           	    console.log(error);
		 	           });
	 	          }else{
	 	          	var newurl = plus.io.convertAbsoluteFileSystem(localUrl);
	 	          	console.log(newurl);
//	 	          	  mui.openWindow({
//	 	          	  	  url:newurl
//	 	          	  });
                      plus.runtime.openFile(newurl);
	 	          }
 	         }
 	       else if (filehz=='zip'||filehz=='rar'){
 	       	    mui.toast("不支持此类文件");
 	       }else if(filehz=='bmp'||filehz=='jpg'||filehz=='png'||filehz=='gif'||filehz=='jepg'){
 	       	      mui.openWindow({
   	     	        	      url:'fjimage.html',
   	     	        	      id:'fjimage.html',
   	     	        	       extras:{
   	     	        	       	      src:localUrl
   	     	        	       }
   	     	        });
 	       }else{
 	       	    mui.toast("不支持此类文件");
 	       }
 }
