/*
Author: AKQA
Date: 10-24-2008

This file supports the use of SIFR by dynamically setting the absolute path for whichever environment the application run on.

For example, development sites run on http://SOME_DOMAIN/portal, where as UAT or live sites run on http://SOME_DOMAIN.  For development sites,
this file will add "portal" to the src string.
*/

if (!(navigator.platform && navigator.platform == "MacPPC" && BrowserObject.Engine.gecko19)){
	var gotham = {
		src: '/resources/assets/flash/gotham.swf'
	}

	sIFR.activate(gotham);

	sIFR.replace(gotham, {
		wmode:'transparent',
		forceWidth:true,
		selector: 'h1#global-header',
		css: {
			'.sIFR-root': {
				'font-size':'28px',
				'color':'#FFFFFF',
				'text-transform':'uppercase'
			}
		}
	});
}
