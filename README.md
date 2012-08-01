# Web Performance Lab
An exercise in website performance optimization using best practices.

## Rule 1: Make Fewer HTTP Requests

### Stats
The following are load times taken from a few sample requests on a ~10Mbps connection in cold and warm cache conditions.  This information is taken from Google Chrome version 20.0.1132.57.

**Original**

	Cold: 77 requests  |  6.11MB transferred  |  3.65s (onload: 965ms, DOMContentLoaded: 381ms)
	Warm: 77 requests  |  59.16KB transferred  |  2.70s (onload: 835ms, DOMContentLoaded: 322ms)

**Modified**

	Cold: 47 requests  |  1.85MB transferred  |  1.48s (onload: 493ms, DOMContentLoaded: 221ms)
	Warm: 38 requests  |  49.12KB transferred  |  1.19s (onload: 331ms, DOMContentLoaded: 173ms)

### Changes
* **Combined CSS stylesheets into ubi_stylesheet_07112012.css**

	This change combined all the CSS files under the resources folder into one stylesheet. This was done to reduce the number of requests required to gather all the style information. These resources were all hosted at the same location so could easily be concatenated.

* **Combined JS files under the resources folder into ubi_scripts_07112012.js**

	All the javascript files held under the resources folder were combined. Although the JQuery library was included, since it had been downloaded, adding it into the shared file made sense.

* **Combined promo images from the CDN into one sprite**
	
	Though these images may change with some frequency, stitching them together is fast and easy, so the performance benefit is worthwhile. The sprite used the reduced size of the images (original sizes were 100X larger than necessary) than what was originally being used by the site, yielding a significant bandwidth savings as well.

* **Change CSS and HTML to use new sprite**
  
	The names chosen for the ids were specific to this promo, but it could be generalized (promo1, promo2, etc) so that only the sprite
	would have to be changed. These changes may have actually made it easier to update the images, since it is now only two lines that would need to change (CSS background url and adding the new sprite image) as opposed to changing all three anchor tags in the HTML in addition to adding the three individual images.

* **Combined search field images (search field and btn_on and btn_off) and changed HTML and CSS to use it**

  	Since these three images are always used together, it makes
	perfect sense to combine them together.

* **Removed a blank gif used for formatting**
	
	A blank gif was being used to properly format navigation drop down arrows.  The arrows could be reliably styled without this gif and so it was removed, thereby saving a request.
	
* **Remove hidden oddly placed advertisement image**

	Removed an image that was vertically oriented and simply contained the text "Advertisement". The image was styled as hidden.  This eliminated a request.

* **"Inline" search iframe into main page**

	The integration of the iframe's contents into the main page saved a request to fetch the iframe and allowed us to sprite the images associated with the search control, further saving requests.  Assuming that this is supposed to be a reusable component across the site, it could be made a partial and then included on any relevant page when the server renders that page.

* **Remove references to resources that returned 404 responses**

	There's no point in wasting HTTP requests trying to get stuff that doesn't exist.

* **Remove reference to external get adobe flash image**

	The site is inconsistent with its usage of images to tell the user to get flash.  It uses both local and externally referenced ones.  By removing the external reference and replace it with a local one, we save an HTTP request and forego the lag associated with fetching the image from Adobe.
	
## Rules 3-9

**

### Stats
The following are load times taken from a few sample requests on a ~28Mbps connection in cold and warm cache conditions.  This information is taken from Google Chrome version 20.0.1132.57.

**Original**

	Cold: 77 requests  |  6.11MB transferred  |  3.65s (onload: 965ms, DOMContentLoaded: 381ms)
	Warm: 77 requests  |  59.16KB transferred  |  2.70s (onload: 835ms, DOMContentLoaded: 322ms)

**Rule 1**

	Cold: 47 requests  |  1.85MB transferred  |  1.48s (onload: 493ms, DOMContentLoaded: 221ms)
	Warm: 38 requests  |  49.12KB transferred  |  1.19s (onload: 331ms, DOMContentLoaded: 173ms)

**Modified**

	Cold: 48 requests  |  1.85MB transferred  |  1.63s (onload: 479ms, DOMContentLoaded: 380ms)
	Warm: 37 requests  |  42.53KB transferred  |  1.08s (onload: 187ms, DOMContentLoaded: 186ms)

### Changes

* **Move combined script to the end of the HTML document (Rule 6)**

	Simple change to move the combined js file from rule 1 to the bottom of the HTML doc.

* **Externalize CSS. Switched HTML elements that inlined style to use existing classes. Added some new CSS definitions for some divs**

	Some elements were inlining styles that already had classes defined in the css that did what was needed. This change moved those HTML elements to use those external CSS classes. Also added some new CSS classes to finish externalizing the style.

* **Externalize JS. Removed commented out code. Removed GamefinderParams that was being clobbered by definition in JS file itself.**

	Strictly a removal exercise. Unused code had originally been commented out, this removed it. A GamefinderParams variable was being defined inline that was subsequently clobbered by the javascript external file, so the inline definition was removed.

* **Rule 9: Moved files out of rss.ubi.com to static2.cdn.ubi.com. Altered the files that include the xml to pull from the new location.**

	Moved all content to 2 domains, www.ubi.com and static2.cdn.ubi.com. This will limit the DNS requests to only those 2 domains.

* **[Rule 3](https://github.com/discom4rt/webperf-conf): Add a far future expires header to certain assets**

	Adjusted the Apache configuration to add a +10 years expires header to assets with the following formats: ico, xml, jpeg, png, gif, js, css, swf. This reduces the amount of subsequent requests that need to occur because the user agent can serve fresh files from its cache without performing a conditional get request.

* **[Rule 4](https://github.com/discom4rt/webperf-conf): Gzip certain assets**

	Adjusted the Apache configuration to gzip assets with the follow formats: html, plain text, css, js, xml, aspx. Care was taken to not gzip components that were already in a compressed format like jpeg or png. Compression may make these files larger than they originally are.  Gzipping reduces the number of bytes that must be transferred to the client, decreasing response time.

## Rules 2, 10, 11

### Stats
Since the website has moved off of our local machines, we need to get some data about its performance while being served at webperflab.com. The following are load times taken from a few sample requests on a ~10Mbps connection in cold and warm cache conditions.  This information is taken from Google Chrome version 20.0.1132.57.

** Base **

**Assignment 2**

	Cold: 42 requests  ❘  1.74MB transferred  ❘  9.20s (onload: 1.71s, DOMContentLoaded: 1.56s)
	Warm: 36 requests  ❘  37.58KB transferred  ❘  2.19s (onload: 1.01s, DOMContentLoaded: 571ms)

**Assignment 3**

	Cold: 39 requests  ❘  1.73MB transferred  ❘  7.66s (onload: 1.52s, DOMContentLoaded: 648ms)
	Warm: 34 requests  ❘  39.97KB transferred  ❘  1.96s (onload: 449ms, DOMContentLoaded: 448ms)

### Changes

* **Rule 10: Minified unified JavaScript file**

	Used the [Google Closure Compiler](http://closure-compiler.appspot.com/home) to minify the already unified, main JavaScript file. Using the simple optimization setting, approximately 27% was saved off of the original size. This reduces the number of packets that must be sent over the network to retrieve the file.

* **Rule 11: Removed redirect to /US**

	Moved main website files up a level out of the /US folder and removed redirect from the Apache configuration.  This removes the extra http request need to fetch the main page.

* **Removed a CSS expression from the main CSS file**

	Removed a min-width expression from the main stylsheet.   The width was set to  min-width value instead for IE <= 7.

* **Rule 2: Use a CDN**

	Multiple changes to move all static components to the CDN. Due to wanting to test the impacts of this rule in the extreme, everything except the HTML page itself is now served from the CDN.

* **Rule 1: Make fewer HTTP requests, Part 3**

	This should finally complete the journey for rule 1. These changes result in three sprites, and one lone image. The three sprites are a non-repeating sprite (for non-repeating images), a repeat-x sprite, and the promo sprite. The promo sprite remains separate because it is a different set of images that change frequently. The last standalone image repeats on both the x and y, meaning it can't be used in a sprite.
	
