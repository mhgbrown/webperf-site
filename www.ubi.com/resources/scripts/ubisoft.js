var Ubisoft = {
	settings : {
		flash : { //Checking for flash greater than or equal to 9.0.48; not supporting 9.0.47 and below
			version : 9,
			rev : 0,
			build : 48
		},
		hasFlash : null,
		debug : {
			Surrounder : false,
			Promo : false
		},
		stopFirefox2Animation : false,
		transition : {
			duration : '350'
		}
	},
	Global : null,
	Navigation : null,
	Login : null,
	Localization : null,
	Promo : null,
	Homepage : null,
	Gamefinder : null,
	GameListing : null,
	Advertisement : null
}

DropdownManager = {
	select : function(obj){
		this.getElement('span').set('html',obj.innerHTML);
		$$('select[id$='+this.get('label')+']')[0].value = obj.get('label');
		this.fireEvent('click');
	}
}

function checkForm(obj,ev){
}

Ubisoft.Global = {
	init : function(){
/*	
		var textInput = $$('input.text')[0];
		if (textInput){
			textInput.addEvent('keypress',function(e){
				if (e.key=='enter'){
					alert('ok');
					return false;
					document.forms[0].submit();
				}
			});
		}
*/	
		if ($('btn-submit-container')){
			$('btn-submit-container').addEvent('mouseenter',function(){
				this.getElement('a').addClass('hover');
			});
			$('btn-submit-container').addEvent('mouseleave',function(){
				this.getElement('a').removeClass('hover');
			});
		}
		$$('input.submit').each( function(el){
			el.addEvent('mouseenter',function(){
				this.addClass("over");
			});
			el.addEvent('mouseleave',function(){
				this.removeClass("over");
			});
		});
		if (BrowserObject.Engine.trident4){
			$$('a.ie6').each( function(el){
				el.addEvent('mouseenter',function(){
					this.addClass('hover');
				});
				el.addEvent('mouseleave',function(){
					this.removeClass('hover');
				});
			});
		}
		$$('input.text').each( function(el){
			if (!el.get("label")){
				el.set("label",el.value);
			}
			el.addEvent('focus',function(){
				if (el.value==el.get("label")){
					el.value = '';
				}
			});
			el.addEvent('blur',function(){
				if (el.value.trim().length==0){
					//el.value = el.get("label");
				}
			});
		});
		var count = 20;
		$$('div.dropdown').each( function(el,i){
			el.setStyle('z-index',count-i)
			var menu = el.getElement('div.nav-wrapper');
			if (menu){
				if (el.get("label")!=null){
					index = 0;
					var fn = DropdownManager.select.bind(el);
					menu.getElements('a').each(function(el,i){
						el.addEvent('click',function(){
							fn(el);
							return false;
						});
						index++;
					});
				}
				el.addEvent('click',function(){
					var element = this.getElement('div.nav-wrapper');
					if (element.getStyle('visibility')=='visible'){
						var fn = Ubisoft.Navigation.closeItem.bind(element);
						fn();
						return;
					}
					Surrounder.hide();
					element.setStyles({
						'height':element.getChildren()[0].getSize().y,
						'visibility':'visible'
					});
					Ubisoft.Navigation.element = element;
				});
				el.addEvent('mouseenter',function(){
					this.addClass('hover');
					var fn = Ubisoft.Navigation.closeItem.bind(this.getElement('div.nav-wrapper'));
					fn();
				});
				el.addEvent('mouseleave',function(){
					this.removeClass('hover');
					var fn = Ubisoft.Navigation.closeItem.bind(this.getElement('div.nav-wrapper'));
					fn();
				});
			} else {
				el.addEvent('mouseenter',function(){
					Surrounder.hide();
				});
			}
		});
	}
}


Ubisoft.Navigation = {
	element : null,
	settings : {
		transition : {
			duration : '200'
		},
		offset : 39
	},
	init : function () {
		var isForefox2andHomepage = (Ubisoft.Homepage && BrowserObject.Engine.gecko && BrowserObject.Engine.version==18);
		if (Ubisoft.settings.stopFirefox2Animation && BrowserObject.Engine.gecko && BrowserObject.Engine.version==18)
			this.settings.transition.duration = '0';
		$$('li.nav').each( function(el,i){
			var menu = el.getElement('div.nav-wrapper');
			if (menu || el.hasClass('dropmenu')){
				var maxwidth = -1;
				menu.getElements('a').each(function(el){
					maxwidth = el.getSize().x>maxwidth ? el.getSize().x : maxwidth;
					el.setStyle('display','block');
				});
				maxwidth = maxwidth==-1?-1:maxwidth<90?90:maxwidth;
				
				if (maxwidth!=-1 && el.hasClass('dropmenu')){
					menu.setStyle('width',maxwidth+15);
				}
				if (navigator.platform && navigator.platform == "MacPPC" && BrowserObject.Engine.gecko19){
					menu.setStyles({
						'background':'black'
					});
				}
				
				el.addEvent('mouseenter',function(){
					if (Ubisoft.Localization.isOpen) return;
					Surrounder.hide();
					var element = this.getElement('div.nav-wrapper');
					element.setStyles({
						'height':element.getChildren()[0].getStyle('height'),
						'visibility':'visible'
					});
					Ubisoft.Navigation.element = element;
					this.addClass("on");
					this.addClass("white");
/*					
					if (!isForefox2andHomepage){
						var fn = Ubisoft.Navigation.closeItem.bind(element);
						Surrounder.draw(element,fn, Ubisoft.Navigation.settings.offset);
					}
*/					
				});
				
//				if (isForefox2andHomepage){
					el.addEvent('mouseleave',function(){
						var fn = Ubisoft.Navigation.closeItem.bind(this.getElement('div.nav-wrapper'));
						fn();
					});
//				}
				
				if (BrowserObject.Engine.webkit){
					var obj = el.getElement('img.arrow');
					if (obj)
						obj.setStyle('left',el.getSize().x-(el.id=='locale'?10:45));
				}
			} else {
				el.addEvent('mouseenter',function(){
					if (Ubisoft.Localization.isOpen) return;
					Surrounder.hide();
				});
			}
		});
	},
	closeItem : function(){
		this.setStyles({
			'height':0,
			'visibility':'hidden'
		});
		this.getParent().removeClass("on");
		this.getParent().removeClass("white");
	}
};

Ubisoft.Localization = {
	searchBar : null,
	settings : {
		transition : {
			duration : '350'
		},
		offset : 25
	},
	isOpen : false,
	list : null,
	subList : null,
	init : function(){
	},
	setLocale : function(obj) {
		$('internaltionalselector').value = obj.name;
		Surrounder.hide();
		$("Default").submit();
	}
}

var Surrounder = {
	elements : {
		parent : null,
		left : null,
		top : null,
		right : null,
		bottom : null
	},
	callback : null,
	initialize : function(){
		if (Ubisoft.settings.debug.Surrounder){
			new Asset.css('resources/css/debug_stylesheet.css',{id:'debugCSS'});
		}
		
		if (this.elements.parent){
			this.elements.parent = $('surround');
			this.elements.top = $('surround-top');
			this.elements.bottom = $('surround-bottom');
			this.elements.left = $('surround-left');
			this.elements.right = $('surround-right');
			this.elements.parent.addEvent('mouseover',this.hide);
		}
	},
	el : null,
	draw : function (el, callback, offset){
		if (!offset) offset = 0;
		this.callback = callback;
		this.el = el;
		var eCoord = el.getCoordinates();
		var wCoord = window.getScrollSize();
		var wCoordAlt = window.getSize();
		wCoordAlt.x = wCoordAlt.x-25;
		Surrounder.elements.top.setStyles({
			'height':eCoord.top - offset,
			'width':wCoordAlt.x
		});
		Surrounder.elements.bottom.setStyles({
			'height':wCoord.y-(eCoord.top+eCoord.height),
			'top':eCoord.top+eCoord.height,
			'width':wCoordAlt.x
		});
		Surrounder.elements.left.setStyles({
			'height':eCoord.height + offset,
			'top':eCoord.top - offset,
			'width':(eCoord.left).limit(0,99999)
		});
		Surrounder.elements.right.setStyles({
			'height':eCoord.height + offset,
			'top':eCoord.top - offset,
			'width':(wCoordAlt.x - (eCoord.width+eCoord.left)).limit(0,99999),
			'left':(eCoord.width+eCoord.left)
		});
		//Surrounder.elements.parent.setStyle("display","block");
	},
	hide : function(){return;
		Surrounder.elements.parent.setStyle("display","none");
		if (Surrounder.callback){
			Surrounder.callback(Surrounder.el);
		}
	}
}

Ubisoft.Advertisement = {
	init : function(){
		if ($('promo-spot')){
			var string = $('promo-spot').get('html');
			if (string.length>=5){
				$('promo-advertisement').setStyle('visibility','visible');
			}
		}
	}
}

window.addEvent('domready',function(){
	Surrounder.initialize();
	Ubisoft.Global.init();
	Ubisoft.Navigation.init();
	Ubisoft.Advertisement.init();
});


function test(status){
	if (status==0){
		$('iframe-container').setStyle('height',27);
		//27
	} else if (status==1){
		$('iframe-container').setStyle('height',397);
	}
	var k = 0;
}