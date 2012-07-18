# Web Performance Lab
An exercise in website performance optimization using best practices.

## Rule 1: Make Fewer HTTP Requests

### Stats
The following are load times taken from a few sample requests on a ~10Mbps connection in cold and warm cache conditions.

**Original**

	Cold: 77 requests  ❘  6.11MB transferred  ❘  3.65s (onload: 965ms, DOMContentLoaded: 381ms)
	Warm: 77 requests  ❘  59.16KB transferred  ❘  2.70s (onload: 835ms, DOMContentLoaded: 322ms)

**Modified**

	Cold: 48 requests  ❘  1.84MB transferred  ❘  1.50s (onload: 677ms, DOMContentLoaded: 226ms)
	Warm: 38 requests  ❘  49.12KB transferred  ❘  1.19s (onload: 331ms, DOMContentLoaded: 173ms)

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
	