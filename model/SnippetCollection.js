define(function(require) {
	var Backbone = require("backbone"),
        BackboneFirebase = require("backbonefire"),
        Firebase = require("firebase"),
		$ = require("jquery"),
		Snippet = require("model/Snippet")

	SnippetCollection = BackboneFirebase.Collection.extend({

		model: Snippet,

        url: "https://snippet.firebaseio.com/"

	});
	return SnippetCollection;
});