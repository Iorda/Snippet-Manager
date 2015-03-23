define(function(require) {

		var Backbone = require("backbone"),
		$ = require("jquery"),
		AbstractView = require("view/AbstractView"),
		SnippetListEntryView = require("text!tpl/SnippetListEntryViewTpl.html"),
        Jqueryui = require("jqueryui"),
        SnippetEditorView = require("view/SnippetEditorView"),
        SnippetDetailsView = require("view/SnippetDetailsView"),
		
		SnippetListEntryView = AbstractView.extend({
		
			tpl: SnippetListEntryView,

            events: {},
			
			initialize: function(options ){
                this.setElement(options.el);
                this.model = options.model;
                var that = this;
                this.events["click [data-modelid=" + this.model.get("id") + "] .viewButton"] = 'viewSnippet';
                this.events["click [data-modelid=" + this.model.get("id") + "] .editButton"] = 'editSnippet';
                this.events["click [data-modelId=" + this.model.get("id") + "] .removeButton"] = 'removeSnippet';
                AbstractView.prototype.initialize.apply(this);

                this.listenTo(this.model, "change", function(snippet) {
                    that.model = snippet;
                    that.removeView(true);
                    that.render();
                });
			},
			
			render: function() {
				AbstractView.prototype.render.apply(this);
                $(this.el).find(".entry").show("Blind");
                this.userChanged();
			},

            //show the screen for viewing a snippet
            //anyone has access to it
            viewSnippet: function() {
                //extra verification in case another event is triggered
                if (arguments[0].currentTarget.dataset["modelid"] != this.model.get("id")) {
                    return;
                }
                var snippetDetailsView = new SnippetDetailsView({
                    el: window.context,
                    model: this.model
                });
                snippetDetailsView.render();
            },

            //show the screen for editing a snippet
            //only the user who created it has access to it
            editSnippet: function() {
                if (arguments[0].currentTarget.dataset["modelid"] != this.model.get("id")) {
                    return;
                }
                var snippetEditorView = new SnippetEditorView({
                    el: window.context,
                    model: this.model
                });
                snippetEditorView.render();
            },

            //removes a snippet
            //only the user who created it has access to it
            removeSnippet: function() {
                if (arguments[0].currentTarget.dataset["modelid"] != this.model.get("id")) {
                    return;
                }
                window.currentView.collection.remove(this.model);
            },

            //removes the template for re-rendering
            //removes both the template and the events for permanent deletion
            removeView: function(withoutEvents) {
                if(!withoutEvents) {
                    this.undelegateEvents();
                }
                window.context.find("[data-modelId = " + this.model.get("id") + "]").remove();
            },

            //checks if the new user can view the edit and remove buttons
            userChanged: function() {
                if ($(".userLabel").text() == this.model.get("author")) {
                    $(this.el).find("[data-modelid=" + this.model.get("id") + "] .editButton").show();
                    $(this.el).find("[data-modelid=" + this.model.get("id") + "] .removeButton").show();
                } else {
                    $(this.el).find("[data-modelid=" + this.model.get("id") + "] .editButton").hide();
                    $(this.el).find("[data-modelid=" + this.model.get("id") + "] .removeButton").hide();
                }
            }
		});

		return SnippetListEntryView;

});