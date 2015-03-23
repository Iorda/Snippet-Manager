define(function(require) {

		var Backbone = require("backbone"),
		$ = require("jquery"),
		AbstractView = require("view/AbstractView"),
        SnippetListEntryView = require("view/SnippetListEntryView"),
		SnippetListViewTpl = require("text!tpl/SnippetListViewTpl.html"),
		
		SnippetListView = AbstractView.extend({
		
			tpl: SnippetListViewTpl,

            snippetEntries: [],
			
			initialize: function(options ){
                this.setElement(options.el);
                this.collection = options.collection;
				AbstractView.prototype.initialize.apply(this);
                var that = this;

                //checks if a new user logged in
                $(".userLabel").on('change',function(){
                    that.userChanged();
                });
			},
			
			render: function() {
				AbstractView.prototype.render.apply(this);
                this.listenTo(this.collection, 'add', this.createSnippetEntry);
                this.listenTo(this.collection, 'remove', this.removeSnippetEntry);
			},

            //adds a new Snippet in list
            createSnippetEntry: function(snippet) {
                var entryView = new SnippetListEntryView({
                    el: window.context.find(".snippetList"),
                    model: snippet
                });
                entryView.render();
                this.snippetEntries.push(entryView);
            },

            //removes a Snippet
            removeSnippetEntry: function(snippet) {
                for (var i = 0; i < this.snippetEntries.length; i++) {
                    if (this.snippetEntries[i].model.get("id") == snippet.get("id")) {
                        this.snippetEntries[i].removeView();
                        break;
                    }
                }
            },

            //updates all snippet entry view with the new user
            userChanged: function() {
                for (var i = 0; i < this.snippetEntries.length; i++) {
                    this.snippetEntries[i].userChanged();
                }
            }
		});
		
		return SnippetListView;

});