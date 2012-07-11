var GamefinderParams = {
	"keyword" : "",
	"featured" : "1",
	"genre" : "0",
	"platform" : "0",
	"rating" : "0",
	"sort" : "ReleaseDate_DESC"
}

function rand ( n )
{
  return ( Math.floor ( Math.random ( ) * n + 1 ) );
}

function hideFlashPromo()
{
	Ubisoft.Homepage.loadGamefinder();
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

Ubisoft.Homepage = {
	Cookie : {
		getValue : function(){
			if (Cookie.read('gamefinderagegate')){
				return Cookie.read('gamefinderagegate');
			} else {
				return -1;
			}
		},
		setValue : function(age){
			Cookie.write('gamefinderagegate',age);
		}
	},
	init : function(){
		$$('a.anim-link').each( function(el){
			el.addEvent('mouseenter',function(){
				this.getElement('span').addClass('on');
				this.getElement('span').removeClass('off');
			});
			el.addEvent('mouseleave',function(){
				this.getElement('span').addClass('off');
				this.getElement('span').removeClass('on');
			});
		});
		
		Ubisoft.settings.hasFlash = FlashDetect.DetectVersion(Ubisoft.settings.flash.version,Ubisoft.settings.flash.rev,Ubisoft.settings.flash.build);
		
		if (!Ubisoft.settings.hasFlash){
			$('flash-container').addClass('noflash');
			return;
		}
		
		this.openPromotion();
		
		return;
	},
	openPromotion : function(){
		Ubisoft.Homepage.initFlashArea();
		$('game-finder').setStyles({
			'width':'100%'
		});
		
		var country = document.getElementById('locale').firstChild.nodeValue.substr(0,2).toLowerCase();
		var strLocale = trim(document.getElementById('locale').firstChild.nodeValue.toLowerCase());
		//alert(country + '___' + strLocale);
		/*if(country == 'us' || country == 'ca' || country == 'es' || country == 'it' || country == 'de'
		|| country == 'dn' || country == 'fi' || country == 'no' || country == 'sw' || country == 'no'
		|| country == 'uk' || country == 'fr' || country == 'au' || country == 'pl')*/
		
		/*if(strLocale == 'can-fr')
		{
			jQuery.get('../resources/GRFSPromo2/frca/index.html?' + rand(10000000), function(data) {
					jQuery("#game-finder-flash").html(data);
				});
		}
		else if(country == 'us')
		{
			jQuery.get('../resources/GRFSPromo2/us/index.html?' + rand(10000000), function(data) {
					jQuery("#game-finder-flash").html(data);
				});
		}
		else if (strLocale == 'can-en')
		{
			jQuery.get('../resources/GRFSPromo2/enca/index.html?' + rand(10000000), function(data) {
					jQuery("#game-finder-flash").html(data);
				});
		}
		else
		{
			hideFlashPromo();
		}*/
		//hideFlashPromo();
		//jQuery("#game-finder-flash").html(jQuery('#dvTakeover').html());
		if(trim(jQuery('#dvTakeover').html()).length > 0)
		{
			jQuery("#game-finder-flash").html(jQuery('#dvTakeover').html());
		}
		else
		{
			hideFlashPromo();
		}
	},
	closePromotion : function(){
		dialog.hide();
		Ubisoft.Homepage.loadGamefinder();
	},
	initFlashArea : function(){
		if ($('flash-container').getStyle('height')=="0px"){
			$('flash-container').setStyles({
				'border-bottom':'none',
				'height':'auto'
			});
			$('game-finder').setStyles({
				'height':446,
				'width':996
			});
		}
		
		$('primary-spotlight').setStyle('display','none');
	},
	loadGamefinder : function(){
		Ubisoft.Homepage.initFlashArea();
		$('game-finder').setStyles({
			'width':996
		});

		var flashvars = {
			configUrl : 'config/application.xml'
			,configUrlMain : 'config/mainApplication.xml'
			,search : escape(JSON.encode(GamefinderParams))
		};
		var attributes = {};
		var params = {
			wmode:'opaque',
			align:'middle',
			scale:'noscale',
			allowFullScreen:'false',
			allowScriptAccess:'sameDomain',
			play:'true',
			quality:'high'
		};
		swfobject.embedSWF('../resources/assets/flash/main.swf?' + rand(1000000),'game-finder-flash',996,441,"9.0.0",null,flashvars,params,attributes);
	}
}

window.addEvent('domready',function(){
	Ubisoft.Homepage.init();
});

/* UTILS */
function openWindow(pageUrl,win){
	var winNew = window.open(pageUrl,win);
	if (!winNew){
		Ubisoft.Gamefinder.openWindowFromSwf(pageUrl,win);
	} else {
		winNew.focus();
	}
}