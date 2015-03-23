define(function(require) {
	var Backbone = require("backbone"),
		$ = require("jquery"),
	
	Snippet = Backbone.Model.extend({
		
		defaults: {
            name: "",
            code: "",
            author: "",
            description: "",
            creationDate: null
		}
	});
	
	return Snippet;
}); 