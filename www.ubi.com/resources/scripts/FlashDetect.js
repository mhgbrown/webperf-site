/*
	Flash Detect
	
	Function Call:	FlashDetect.DetectVersion(major, minor, revision).
	
	Return:			True or False
					If flash detect is successful, function returns true.  Otherwise, returns false
					
	Example:		if (FlashDetect.DetectVersion(9,0,26)) {
						alert('You have the right version of Flash');
					} else {
						alert('You do not have flash');
					}
*/
var FlashDetect = {
	version : {
		Major:0,
		Minor:0,
		Revision:0
	},
	
	isIE  : (navigator.appVersion.indexOf("MSIE") != -1) ? true : false,
	isWin : (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false,
	isOpera : (navigator.userAgent.indexOf("Opera") != -1) ? true : false,	
	
	GetSwfVer : function (){
		// NS/Opera version >= 3 check for Flash plugin in plugin array
		var flashPlugs = new Array;
		if (navigator.plugins != null && navigator.plugins.length > 0) {
			for(x=0; x< navigator.plugins.length; x++){
				if(navigator.plugins[x].name.indexOf('Shockwave Flash')>=0){
					flashPlugs.push(navigator.plugins[x]);
				}
			}

			var version = [0,0,0];
			
			for(x=0; x< flashPlugs.length; x++){
				var flashDescription = flashPlugs[x].description;
				var descArray = flashDescription.split(" ");
				var tempVersion = descArray[2].split(".");
				tempVersion.push(parseInt(descArray[descArray.length-1].substr(1,descArray[descArray.length-1].length)));
				
				var major = parseInt(tempVersion[0]);
				var minor = parseInt(tempVersion[1]);
				var revis = parseInt(tempVersion[2]);
				tempVersion = [major,minor,revis];
				
				if ((tempVersion[0]>version[0]) || (tempVersion[0]==version[0] && tempVersion[1]>version[1]) || (tempVersion[0]==version[0] && tempVersion[1]==version[1] && tempVersion[2]>version[2])){
					version = tempVersion;
				}
			}
			this.version.Major = version[0];
			this.version.Minor = version[1];
			this.version.Revision = version[2];
		}
		// MSN/WebTV 2.6 supports Flash 4
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
		// WebTV 2.5 supports Flash 3
		else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
		// older WebTV supports Flash 2
		else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
		else if ( FlashDetect.isIE && FlashDetect.isWin && !FlashDetect.isOpera ) {
			flashVer = this.ControlVersion();
			if (flashVer==-1) return this.version;
			
			flashVerString = flashVer + '';
			if(flashVerString.indexOf('WIN')>=0){
				flashVer = flashVerString.substr((flashVerString.indexOf('WIN')+4) , flashVerString.length);
			}
			version = flashVer.split(',');
			this.version.Major = version[0];
			this.version.Minor = version[1];
			this.version.Revision = version[2];
		}
		return this.version;
	},
	ControlVersion : function(){
		var version;
		var axo;
		var e;
	
		// NOTE : new ActiveXObject(strFoo) throws an exception if strFoo isn't in the registry
		
		try {
			// version will be set for 7.X or greater players
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.9");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
		
		
		try {
			// version will be set for 7.X or greater players
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.8");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
		
		
		try {
			// version will be set for 7.X or greater players
			axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
			version = axo.GetVariable("$version");
		} catch (e) {
		}
	
		if (!version)
		{
			try {
				// version will be set for 6.X players only
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
				
				// installed player is some revision of 6.0
				// GetVariable("$version") crashes for versions 6.0.22 through 6.0.29,
				// so we have to be careful. 
				
				// default to the first public version
				version = "WIN 6,0,21,0";
	
				// throws if AllowScripAccess does not exist (introduced in 6.0r47)		
				axo.AllowScriptAccess = "always";
	
				// safe to call for 6.0r47 or greater
				version = axo.GetVariable("$version");
	
			} catch (e) {
			}
		}
	
		if (!version)
		{
			try {
				// version will be set for 4.X or 5.X player
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = axo.GetVariable("$version");
			} catch (e) {
			}
		}
	
		if (!version)
		{
			try {
				// version will be set for 3.X player
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
				version = "WIN 3,0,18,0";
			} catch (e) {
			}
		}
	
		if (!version)
		{
			try {
				// version will be set for 2.X player
				axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				version = "WIN 2,0,0,11";
			} catch (e) {
				version = -1;
			}
		}
		
		return version;
	},
	DetectVersion : function (major,minor,revision){
		var compare = this.GetSwfVer();
		return ((compare.Major>major) || (compare.Major==major && compare.Minor>minor) || (compare.Major==major && compare.Minor==minor && compare.Revision>=revision));
	}
}
