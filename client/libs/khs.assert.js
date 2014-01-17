//     khs.logger.js 0.0.5

//     (c) 2013 David Pitt, Keyhole Software LLC. www.keyholesoftware.com
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     https://github.com/in-the-keyhole/khs-logger


// Maintain AMD compatibility along with ability to be loaded without AMD, as described here: https://github.com/umdjs/umd/blob/master/jqueryPlugin.js
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
       
    var enable = false;
    
    $.EnableAssertions = function() { enable = true;  };
    $.DisableAssertions = function() { enable = false; };
    
    $.Assert = 
	     function(test, msg) {
	        msg = msg || "(no error message)";
	        if (!enable) {return;}
	        if(!test) {
	            try {
	                    throw Error();
	                } catch(e) {
	                    var foo = e;
	                    var lines = e.stack.split('\n');
	                    var stack = "";
	                    for(i in lines) {
	                       if ( i > 0  )
	                        stack = stack + lines[i];
	                        break;
	                    }
	                  //  errorLog(msg+stack);
	                    
	                     throw("Assertion failed :" + msg+"-> "+stack);
	                }

                
	           }
    };

    
    errorLog = function(msg) {
        if(typeof console.error == 'function') { 
            console.error(msg);
        } else {
            function errorLog(msg) {
                console.log("foo");
                setTimeout(function() {
                    throw new Error(msg);
                }, 0);
            }
        }
    };

 
    //return for AMD so that can be used like below, without shim configuration if desired
    // require( ["assert"], function(logger) {
    //    logger.info("Here I am");
    //});
    return $.Assert;
}));

