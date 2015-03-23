define(function(require) {

		var Backbone = require("backbone"),
		$ = require("jquery"),
		AbstractView = require("view/AbstractView"),
		SnippetEditorViewTpl = require("text!tpl/SnippetEditorViewTpl.html"),
        Snippet = require("model/Snippet"),
		
		SnippetEditorView = AbstractView.extend({
		
			tpl: SnippetEditorViewTpl,

            events: {
                'click .saveSnippetButton' : 'saveSnippet'
            },
			
			initialize: function(options ){
                this.setElement(options.el);
                this.model = options.model;
				AbstractView.prototype.initialize.apply(this);
			},
			
			render: function() {
                AbstractView.prototype.render.apply(this);
                var that = this;
                window.context.find("#editorModal").modal();
                //deletes modal on close
                window.context.find("#editorModal").on('hidden.bs.modal', function () {
                    that.undelegateEvents();
                    window.context.find("#editorModal").remove();
                });
			},

            //if it updates a snippet it only sets the new values in the snippet and firebase collection knows how to update it
            //if it creates a snippet collection.create must used with an object(not model)
            saveSnippet: function() {
                if(this.model.get("id")) {
                    this.model.set("name", window.context.find(".snippetName").val());
                    this.model.set("code", window.context.find(".snippetCode").val());
                    this.model.set("description", window.context.find(".snippetDescription").val());
                } else {
                    window.currentView.collection.create({
                        author: window.user,
                        name: window.context.find(".snippetName").val(),
                        code: window.context.find(".snippetCode").val(),
                        description: window.context.find(".snippetDescription").val(),
                        creationDate: (new Date()).getTime()
                    });
                }
                window.context.find("#editorModal").modal('hide');
            }
		});
		
		return SnippetEditorView;

});