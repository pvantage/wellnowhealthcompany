var siteurl = "http://178.128.186.105";
var realsiteurl = "http://178.128.186.105/";
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

function showimg(imgurl){
	var url=siteurl+'/api/emergencies/showmdeiafile/?file='+imgurl+'&ftype=image';
	cordova.InAppBrowser.open(url, '_blank', 'location=yes');	
}
function showvideo(videourl){
	var url=siteurl+'/api/emergencies/showmdeiafile/?file='+videourl+'&ftype=video';
	cordova.InAppBrowser.open(url, '_blank', 'location=yes');	
}