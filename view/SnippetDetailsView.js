define(function(require) {

		var Backbone = require("backbone"),
		$ = require("jquery"),
		AbstractView = require("view/AbstractView"),
        SnippetDetailsViewTpl = require("text!tpl/SnippetDetailsViewTpl.html"),
		
		SnippetDetailsView = AbstractView.extend({
		
			tpl: SnippetDetailsViewTpl,

            events:{
                'click .choiceButton' : 'changeText'
            },
			
			initialize: function(options ){
                this.setElement(options.el);
                this.model = options.model;
				AbstractView.prototype.initialize.apply(this);
			},
			
			render: function() {
                AbstractView.prototype.render.apply(this);
                var that = this;
                window.context.find("#detailsModal").modal();
                window.context.find("#detailsModal").on('hidden.bs.modal', function () {
                    window.context.find("#detailsModal").remove();
                });
			},

            //changes the text based on which tab is pressed
            changeText: function() {
                var buttons = $(this.el).find(".choiceButton");
                for(var i = 0; i < buttons.length; i++) {
                    $(buttons[i]).removeClass("active");
                }
                $(arguments[0].currentTarget).addClass("active");
                var type = $($(arguments[0].currentTarget)[0].children[0]).text();
                switch(type) {
                    case "Code":
                        $(this.el).find(".primary").text(this.model.get("code"));
                        $(this.el).find(".secondary").text("");
                        break;
                    case "Description":
                        $(this.el).find(".primary").text(this.model.get("description"));
                        $(this.el).find(".secondary").text("");
                        break;
                    case "Info":
                        $(this.el).find(".primary").text("Author: " + this.model.get("author"));
                        $(this.el).find(".secondary").text("Creation Date: " + window.SnippetUtils.getDateAsString(new Date(this.model.get("creationDate"))));
                        break;
                };
            }
		});
		
		return SnippetDetailsView;

});