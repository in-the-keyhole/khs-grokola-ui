(function() {
	"use strict";
	window.catalog={};
	require.config({
		waitSeconds: 200,
		shim: {
			underscore: {
			      exports: '_'
			    },
			    backbone: {
			        deps: ["underscore", "jquery"],
			        exports: "Backbone"
			      }
			},
		paths : {
			'underscore' : 'libs/underscore/underscore-loader',
			'backbone' : 'libs/backbone/backbone-loader',
			'text' : 'libs/require/require-text-2.0.0',
			'jquery' : 'libs/jquery-1.7.2',
			'bootstrap' : 'libs/bootstrap.min',
			'sherpa' : 'libs/sherpa',
			'markitup': 'markitup/jquery.markitup',
			'markitup_set':	'markitup/html/set',
			'jquery.cookie' : 'libs/jquery.cookie',
		//	'log' : 'https://raw.github.com/in-the-keyhole/khs-logger/master/khs.logger',
			'log' : 'libs/khs.logger',
			'assert' : 'libs/khs.assert'
		},
				
		baseUrl : ''
		
	});

	require(['underscore', 'require', 'backbone', 'jquery' ], function(_, require, Backbone, $) {
		// framework loaded
		_.noConflict();
		$.noConflict();
		require(['require', 'bootstrap', 'responsive/app','jquery','log','assert'], function(require, Bootstrap, App,Log) {
					
			// turn logging 
			
			$.Log.remoteUrl = "sherpa/log";
			$.Log.remoteLevel = $.LogLevel.error;
			$.Log.level = $.LogLevel.debug;
			$.Log.inspect();
			$.Log.beforeSend = function(xhr,opts) {console.info("made id"); };
			$.Log.logLocal = true;
			$.Log.install($.Log.localStorageLogInspector());
			$.EnableAssertions();
		//	$.Log.install(function(el) { return "Hello World, there are <pre>"+el.children().length+"elements </pre>"; }  );
			
			
		//	window.onerror = function(message, url, linenumber) {
		//		  $.Log.error(message+"line:"+linenumber+"url:"+url);
		//	};
			

			
		});
	});
})();
