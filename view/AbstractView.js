define(function(require) {

		var Backbone = require("backbone"),
		$ = require("jquery"),
		
		AbstractView = Backbone.View.extend({
		
		initialize: function() {
		},

        //renders the view
		render: function() {
			if (!this.template) {
				this.template = _.template(this.tpl);
			}
            var $el = null;
            if(!this.el) {
                $el = window.context;
            } else {
                $el = $(this.el);
            }
			if (this.model) {
                $el.append(this.template(this.model.toJSON()));
			} else {
                $el.append(this.template());
			}
			
			return this;
		}
		});
		
		return AbstractView;

});