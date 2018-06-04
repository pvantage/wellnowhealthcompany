var siteurl = "http://vantageappspro.com/wellnowhealth";
var realsiteurl = "http://vantageappspro.com/wellnowhealth/";
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
	localStorage.setItem('Company_Lat',position.coords.latitude);
	localStorage.setItem('Company_Long',position.coords.longitude);
	var uid=localStorage.getItem('Company_ID');
	
	//alert(uid);
	if(typeof uid!='undefine' && uid!='' && uid!=null && (position.coords.latitude!='' || position.coords.longitude!='')){
		var url=siteurl+'/api/account/updatecompanylatilongi';
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 data: {id:uid,lati:position.coords.latitude,longi:position.coords.longitude},  
		 crossDomain: true,  
		 beforeSend: function() {
						
		 },		
		 complete: function() {
					
		 },
		 success: function(res) {  
		   
		 },  
		 error: function(response, d, a){
			jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error in update location.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
			
		 } 
	   });
		setTimeout(getLocation,30000);
	}
    
}
 function showError(error){
	 alert('Message:' + error.message);
 }
 function getLocation() {
     navigator.geolocation.getCurrentPosition(showPosition, showError);
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

/*document.addEventListener("deviceready", onDeviceReady2, false);
function onDeviceReady2(){
	var deviceplatform=device.platform;
	var uid=localStorage.getItem('Company_ID');
	if(deviceplatform=='Android'){
		
		if(typeof uid!='undefined' && uid!='' && uid!=null){
			getLocation();
		}
	}
	else{
		if(typeof uid!='undefined' && uid!='' && uid!=null){
			var path = window.location.pathname;
			var page = path.split("/").pop();
			if(page=='emergancy.html'){
				getLocation();
			}
		}	
	}
}*/
function showimg(imgurl){
	var url=siteurl+'/api/emergencies/showmdeiafile/?file='+imgurl+'&ftype=image';
	cordova.InAppBrowser.open(url, '_blank', 'location=yes');	
}
function showvideo(videourl){
	var url=siteurl+'/api/emergencies/showmdeiafile/?file='+videourl+'&ftype=video';
	cordova.InAppBrowser.open(url, '_blank', 'location=yes');	
}