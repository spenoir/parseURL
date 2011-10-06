(function ($) {
                 /* This function parses a given url. relative or absolute
                 *  It works in a similar way to window.location and returns a url Object
                 *  url: the url to parse eg. 
                 *      /category/spenoir/parseurl,
                 *      category/spenoir/parseurl, (untested) 
                 *      http://www.github.com/spenoir/parseurl,
                 *      www.github.com/spenoir/parseurl,
                 */
                
                $.fn.parseURL = function(url, catId) {
                	var urlArr, urlObj = {}, queryStringArr, hasQueryString=false, pathArr=false, part=false, arrOfUrls = [];
                	
                	buildUrlObj = function(url) {
	                    
	                    //if url has query string then save it
	                    if ( $.inArray('?', url) >= 0 ) {                        
	                        hasQueryString = true;
	                        queryStringArr = url.split('?');   
	                        url = queryStringArr.shift();             
	                        urlObj.queryString = queryStringArr.shift().split("&");
	                    }
	                                        
	                    // if theres a hash then split and save that too
	                    if (url.match(/\#/)) {
	                        pathArr = url.split('#');
	                        url = pathArr.shift();
	                        urlObj.hash = pathArr.shift();      // returns '/some/hash'
	                    }
	                    
	                    urlArr = url.split('/');  
	                    if (urlArr[0].length === 0) { // remove leading slash
	                        urlArr.shift();
	                    }
	
	                    if ( $.inArray('http:', urlArr) >= 0 ) {
	                        urlObj.protocol = urlArr.shift();   // returns 'http:'
	                        urlArr.shift();                     // removes empty item
	                        urlObj.host = urlArr.shift();       // returns 'www.github.com'
	                        urlObj.path = urlArr.join('/');     // returns 'spenoir/parseurl'
	                        urlObj.parts = urlArr;              // returns [spenoir, parseurl]
	                    
	                    // if url string starts with www. and no prtocol                                    
	                    } else if ( url.match(/www/) ) {  
	                        urlObj.protocol = null;
	                        urlObj.host = urlArr.shift();
	                        urlObj.path = urlArr.join('/');     // should add a leading slash here really
	                        urlObj.parts = urlArr;                      
	                    
	                    // if no protocol or host      
	                    } else {
	                        urlObj.protocol = null;
	                        urlObj.host = null
	                        urlObj.path = urlArr.join('/');
	                        urlObj.parts = urlArr;                        
	                    }                    
	                    
	                    // loop through url parts and save the category slug to urlObj
	                    for (i=0;i<urlObj.parts.length;i++) {
	                        part = urlObj.parts[i];
	                        if ( catId && $.inArray(catId, part) ) {
	                            urlObj.categorySlug = part;     // returns 'spenoir'
	                            break;
	                        }                        
	                    }
	                    urlObj.url = url;                       // returns 'http://www.github.com/spenoir/parseurl'
	                    return urlObj;
	                }

                	if (!url && this != $) {
                		url = $this.attr('href');
                		
                		return this.each(function() {
	                    	var $this = $(this);
	                    	arrOfUrls.push(buildUrlObj($this.attr('href')));
	                    	
	                    	console.log(arrOfUrls);
	                    	
	                    	return arrOfUrls;
	                    });
                	} 
                	
                	return buildUrlObj(url);
                }
})(jQuery);