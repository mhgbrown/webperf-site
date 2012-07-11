var ubi_system = "WEB";
var ubi_umon_domain;
var ubi_umon_protocol;
var ubi_iid;

function ubi_check_screen()
{
	if (!self.screen) return "";
	
	//ie4+ ns4+
	var result = "hres=" + escape(screen.width)
	+ "&vres=" + escape(screen.height)
	+ "&ahres=" + escape(screen.availWidth)
	+ "&avres=" + escape(screen.availHeight)
	+ "&depth=" + escape(screen.colorDepth);
	
	//ie4+
	if(screen.bufferDepth) result += ("&bufferDepth=" + escape(screen.bufferDepth));
	
	return result
}

function ubi_check_language()
{
	//ie4+
	if(self.navigator.userLanguage) return "userLang=" + escape(navigator.userLanguage) + "&sysLang=" + escape(navigator.systemLanguage) + "&browserLang=" + escape(navigator.browserLanguage);
	return "";
}

function ubi_check_referer()
{
	//ie4+ ns4+
	if(document.referrer) return encodeURIComponent(document.referrer);
	return "";
}

function ubi_check_cpu()
{
	//ie4+
	if(navigator.cpuClass) return "cpu=" + escape(navigator.cpuClass);
	return "";
}

function ubi_check_cookie()
{
	//ie4+ ns6+
	var cookieEnabled = (navigator.cookieEnabled)?true:false;
	
	//brute force
	if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled)
	{ 
		document.cookie="ubitestcookie"; 
		cookieEnabled = (document.cookie.indexOf("ubitestcookie")!=-1)?true:false
	}
	return "cookie=" + cookieEnabled;
}

function ubi_check_flash()
{
	//ns
	if (navigator.plugins && navigator.plugins.length)
	{
		var f=navigator.plugins["Shockwave Flash"];
		if (f && f.description) return "flash=" + f.description.charAt(f.description.indexOf('.')-1);		
		if (navigator.plugins["Shockwave Flash 2.0"]) return "flash=2";
	}
	
	//ie
	for(var i=12; i>0; i--) //brute force
	{
		try
		{
			var f=new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
			return "flash=" + i;
		}
		catch(e){}
	}
	
	return "";
}

function ubi_check_silverlight()
{
    var version = '';
    var container = null;
    try {
        var control = null;
        if (window.navigator.userAgent.indexOf('MSIE') >= 0) {
            control = new ActiveXObject('AgControl.AgControl');
        }
        else {
            if (navigator.plugins['Silverlight Plug-In']) {
                container = document.createElement('div');
                document.body.appendChild(container);
                container.innerHTML= '<embed type="application/x-silverlight" src="data:," />';
                control = container.childNodes[0];
            }
        }
        if (control) {
            if (control.isVersionSupported('1.1')) { version = "1.1"; }
            else if (control.isVersionSupported('1.0')) { version = "1.0"; }
        }
    }
    catch (e) { }
    if (container) {
        document.body.removeChild(container);
    }
    
    if(version != '') return "silverlight=" + version;
    return "";
}

function readCookie(name)
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function ubi_get_url(t, v)
{
	var s = readCookie("ubisession");
	var a = "";
	
	if(!s)
	{
		a = "&sattribute="
			+ escape(ubi_check_screen())
  			+ escape("&" + ubi_check_language())
  			+ escape("&" + ubi_check_cookie())
  			+ escape("&" + ubi_check_flash())
  			+ escape("&" + ubi_check_cpu())
  			+ escape("&" + ubi_check_silverlight())
  			+ escape("&js=true");
  	}
  	
  	if (!ubi_umon_domain) {	ubi_umon_domain = "uts.ubi.com";} if (ubi_umon_domain =="") {	ubi_umon_domain = "uts.ubi.com";} 
		if (!ubi_umon_protocol) { ubi_umon_protocol = "http";} if (ubi_umon_protocol=="") { ubi_umon_protocol = "http";}

  	var ubi_umon_URL = ubi_umon_protocol + "://" + ubi_umon_domain + "/stats.ashx";
  	
  	var u = ubi_umon_URL
		+ '?system=' + ubi_system
		+ '&tag=' + escape(t)
  		+ '&ref=' + ubi_check_referer()
  		+ '&value=' + v
  		+ a
  		+ '&version=3.0'
  		+ '&cacheid=' + Math.floor(Math.random()*100000);
  	
  	if(ubi_iid){ u += '&iid=' + ubi_iid ;}
  	
  	return u;
}

function ubi_do_WT_stat(tag, system, actionvalue, inmemoryonly)
{
	var w = window;
  
	if (!tag){ tag = w.ubi_tag; }
	if (!system){ system = w.ubi_system; }
	if (!system) { system = "webtrack"; } //for backward compatibility <=UM2.0	
	if (!actionvalue)
	{
		if (!w.ubi_actionvalue) { actionvalue = ""; }
		else { actionvalue = w.ubi_actionvalue; }
	}
	
	if (tag && system)
	{
		var url = ubi_get_url(tag, actionvalue);
		if (inmemoryonly)
		{			
			var img=new Image();
			img.src=url;
		}
		else
		{
			document.write("<div style='display:none;'><img src='"+url+"' alt='' /></div>");
		}
  	}
}

function ubi_do_WT_stat_silent(tag, system, actionvalue)
{
	if (!actionvalue)
	{
		ubi_do_WT_stat(tag, system, '', true);
	}
	else
	{
		ubi_do_WT_stat(tag, system, actionvalue, true);	
	}
}
