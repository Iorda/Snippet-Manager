define(function(require) {

		var Backbone = require("backbone"),
		$ = require("jquery"),
		AbstractView = require("view/AbstractView"),
        LoginViewTpl = require("text!tpl/LoginViewTpl.html"),
		
		LoginView = AbstractView.extend({
		
			tpl: LoginViewTpl,

            events: {
                'click .loginButton' : 'login',
                'keyup .userInput' : 'checkKeyPress'
            },

            initialize: function(options ){
                this.setElement(options.el);
				AbstractView.prototype.initialize.apply(this);
			},
			
			render: function() {
                if (window.context.find("#loginModal").length == 0) {
                    AbstractView.prototype.render.apply(this);
                }
                var that = this;
                window.context.find("#loginModal").modal();
                //deletes modal on close
                window.context.find("#loginModal").on('hidden.bs.modal', function () {
                    that.undelegateEvents();
                    window.context.find("#loginModal").remove();
                });
			},

            //checks if Enter is pressed
            checkKeyPress: function() {
                if(arguments[0].keyCode == 13) {
                    this.login();
                }
            },

            //sets the new user and triggers an event for the snippets to be updated
            login: function() {
                window.user = window.context.find(".userInput").val();
                if(window.user == "") {
                    window.context.find(".errorLabel").text("Please write an user!");
                    return;
                }
                window.localStorage.setItem("snippetUser", window.user);
                window.navbar.find(".userLabel").text(window.user).trigger('change');
                window.context.find("#loginModal").modal('hide');
            }
		});
		
		return LoginView;

});