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
			'text' : 'libs/require/text',
			'jquery' : 'libs/jquery-1.7.2',
			'bootstrap' : 'libs/bootstrap.min',
			'sherpa' : 'libs/sherpa',
			'markitup': 'markitup/jquery.markitup',
			'markitup_set':	'markitup/html/set',
			'log' : 'https://raw.github.com/in-the-keyhole/khs-logger/master/khs.logger'
			
		},
		baseUrl : ''
		
	});

	require(['require', 'backbone', 'jquery', 'underscore'], function(require, Backbone, $, _) {
		// framework loaded
		_.noConflict();
		$.noConflict();
		require(['require', 'bootstrap', 'admin/app','log'], function(require, Bootstrap, App,Log) {
			
			
			
		});
	});
})();
