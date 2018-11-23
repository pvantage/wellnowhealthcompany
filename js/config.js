//var siteurl = "http://178.128.186.105";
//var realsiteurl = "http://178.128.186.105/";
var siteurl = "http://vantageappspro.com/wellnowhealth";
var realsiteurl = "http://vantageappspro.com/wellnowhealth/";
var db = window.openDatabase("wnhcompany", "1.0", "Wellnowhealth Company", 200000);
var days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var times = {'07:00:00':'7:00 AM','07:30:00':'7:30 AM','08:00:00':'8:00 AM','08:30:00':'8:30 AM','09:00:00':'9:00 AM','09:30:00':'9:30 AM','10:00:00':'10:00 AM', '10:30:00':'10:30 AM','11:00:00':'11:00 AM', '11:30:00':'11:30 AM','12:00:00':'12:00 PM','12:30:00':'12:30 PM','13:00:00':'01:00 PM', '13:30:00':'01:30 PM','14:00:00':'02:00 PM','14:30:00':'02:30 PM','15:00:00':'03:00 PM', '15:30:00':'03:30 PM','16:00:00':'04:00 PM','16:30:00':'04:30 PM','17:00:00':'05:00 PM','17:30:00':'05:30 PM','18:00:00':'06:00 PM'};

var d = new Date();
var m=d.getMonth();
if(parseInt(m)<12){m=parseInt(m)+1;}
if(parseInt(m)<10){m='0'+m;}
var d1=d.getDate();
if(parseInt(d1)<10){d1='0'+d1;}
var today=d.getFullYear()+'-'+m+'-'+d1;
function addasecondintime(){
	d = new Date(); // just for example, can be any other time
	myTimeSpan = 1000; // 1 second in milliseconds
	d.setTime(d.getTime() + myTimeSpan);	
	var mint=d.getMinutes();
	if(parseInt(mint)<10){mint='0'+mint;}
	var h=d.getHours();
	if(parseInt(h)<10){h='0'+h;}
	var sec=d.getSeconds();
	if(parseInt(sec)<10){sec='0'+sec;}
	return h+':'+mint+':'+sec;
}
function getcurrenttime(){
	var d = new Date();
	var mint=d.getMinutes();
	if(parseInt(mint)<10){mint='0'+mint;}
	var h=d.getHours();
	if(parseInt(h)<10){h='0'+h;}
	var sec=d.getSeconds();
	if(parseInt(sec)<10){sec='0'+sec;}
	return h+':'+mint+':'+sec;
}
var currenttime=getcurrenttime();
function getdatetime(){
	var d = new Date();
	var mint=d.getMinutes();
	if(parseInt(mint)<10){mint='0'+mint;}
	var h=d.getHours();
	if(parseInt(h)<10){h='0'+h;}
	var sec=d.getSeconds();
	if(parseInt(sec)<10){sec='0'+sec;}
	return today+' '+h+':'+mint+':'+sec;
}
var currentdatetime=getdatetime();
function gup(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
function gup2(sParam,url) {
  var results = new RegExp('[\?&]' + sParam + '=([^&#]*)').exec(url);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

var uid=localStorage.getItem('Company_ID');

function checkloggedin(uid)
{
	
	var url=siteurl+'/api/patientlogin/checkloggedin';
	
	jQuery.ajax({  
	 type: 'POST',  
	 url: url,  
	 //contentType: contentType,  
	 dataType: 'json',  
	 data: {uid:uid},  
	 crossDomain: true,  
	 beforeSend: function() {
	 },		
	 complete: function() {
					
	 },
	 success: function(res) {  
	   if(res['loggedin']!='success')
	   {
		window.location='login.html';   
	   }
		else
		{
			window.location='dashboard.html';	
		}
	 },  
	 error: function(response, d, a){
		jQuery('body .showmessage').remove();
		var html='<div class="showmessage">Server Error.</div>';
		jQuery('body').append(html);
		setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
	 } 
   });
}




function showPosition(position) {
	var lat=position.coords.latitude;
	var lon=position.coords.longitude;
	localStorage.setItem('Company_Lat',lat);
	localStorage.setItem('Company_Long',lon);
	var uid=localStorage.getItem('Company_ID');
	var deviceuuid=localStorage.getItem('deviceuuid');
	var deviceplatform=localStorage.getItem('deviceplatform');
	if(typeof uid!='undefined' && uid!='' && uid!=null && (lat!='' || lon!='')){
		var url=siteurl+'/api/account/updatecompanylatilongi';
		if(typeof deviceuuid=='undefined' || deviceuuid==null || deviceuuid=='null'){ deviceuuid='';}
		if(typeof deviceplatform=='undefined' || deviceplatform==null || deviceplatform=='null'){ deviceplatform='';}
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 data: {id:uid,lati:lat,longi:lon,deviceuuid:deviceuuid,deviceplatform:deviceplatform},  
		 crossDomain: true,  
		 beforeSend: function() {
						
		 },		
		 complete: function() {
			db.transaction(function(tx){
				var qr="UPDATE wnh_company SET current_lati='"+lat+"', current_longi='"+lon+"' WHERE company_id='"+uid+"'";
				tx.executeSql(qr);	
			});
		 },
		 success: function(res) {  
		   //alert(res);
		 },  
		 error: function(response, d, a){
			jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error in update location.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
			
		 } 
	   });
		
	}
    
}
 function showpostionError(error){
	 alert('Message:' + JSON.stringify(error));
 }
 function getLocation() {
     navigator.geolocation.getCurrentPosition(showPosition, showpostionError, { enableHighAccuracy: true});
}
 
var uid=localStorage.getItem('Company_ID');
		
function ValidateEmail(inputText)  
{  
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	if(inputText.match(mailformat))  
	{  
		return true;  
	}  
	else  
	{  
		return false;  
	}  
}
getLocation();
setInterval(getLocation,30000);

function showvideo(videourl){
	//showvideo('http://vantageappspro.com/wellnowhealth/uploads/emergencies/1_1542891378.mp4')
	//var url=siteurl+'/api/emergencies/showmdeiafile/?file='+videourl+'&ftype=video';
	//cordova.InAppBrowser.open(url, '_blank', 'location=yes');	
	//cordova.InAppBrowser.open('showvideo.html?file='+videourl, '_blank', 'location=yes');	
	var wh=jQuery(window).height()-20;
	var ww=jQuery(window).width();
	var vd='<video id="videoplayer" style="width:100%; height:100%; margin:0px;" controls><source src="'+videourl+'" type="video/mp4"><source src="'+videourl+'" type="video/webm"><source src="'+videourl+'" type="video/ogg">Your browser does not support the video tag.</video>';
	jQuery('#playvideos .modal-body').html(vd);
	jQuery('#emergency').modal('hide');
	jQuery('#playvideos').modal();
}
function closevideo(){
	
	jQuery('#playvideos').modal('hide');
	jQuery('#emergency').modal();
	var myVideo=document.getElementById("videoplayer"); 
	if(typeof myVideo!='undefined'){
		 myVideo.pause(); 
	}
		
}