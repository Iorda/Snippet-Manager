require.config({
	baseUrl: "",
	
	paths: {
		text : "lib/text",
		bootstrap: "lib/bootstrap/js/bootstrap.min",
		jquery: "lib/jquery.min",
		backbone: "lib/backbone",
        backbonefire: "lib/backbonefire.min",
		underscore: "lib/underscore",
        firebase: "lib/firebase",
		jqueryui: "lib/jquery-ui/js/jquery-ui-1.10.4.custom",
        date: "lib/date"
	},
	
	shim: { 
		'bootstrap': { 
			deps: ['jquery']
		},
		'backbone': {
			deps: ['underscore', 'jquery', 'bootstrap'],
			exports: 'Backbone'
		},
		'underscore': {
			exports: '_'
		},
		'jqueryui': {
			deps: ['jquery']
		},
        'firebase': {
            exports: 'Firebase'
        },
        'backbonefire': {
            deps: ['backbone', 'underscore', 'jquery'],
            exports: 'Backbone.Firebase'
        }
	}
});

require(["jquery",
		"view/SnippetListView",
        "view/NavbarView",
        "model/SnippetCollection",
        "view/LoginView",
        "utils/SnippetUtils"],
         function($,
		 SnippetListView,
         NavbarView,
         SnippetCollection,
         LoginView,
         SnippetUtils) {
		 
             window.context = $("#context");
             window.navbar = $("#navbar");
             window.SnippetUtils = SnippetUtils;

             var navbarView = new NavbarView({el: window.navbar});
             navbarView.render();

             //primary view
             var snippetListView = new SnippetListView({
                 el: window.context,
                 collection: new SnippetCollection()
            });
             snippetListView.render();
             window.currentView = snippetListView;

             //checks if a user has already logged in or shows the login view
             window.user = window.localStorage.getItem("snippetUser");
             if(!window.user) {
                 var loginView = new LoginView({el: window.context});
                 loginView.render();
             } else {
                 window.navbar.find(".userLabel").text(window.user).trigger('change');
             }
});
