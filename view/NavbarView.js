define(function(require) {

    var Backbone = require("backbone"),
        $ = require("jquery"),
        AbstractView = require("view/AbstractView"),
        SnippetEditorView = require("view/SnippetEditorView"),
        NavbarViewTpl = require("text!tpl/NavbarViewTpl.html"),
        Snippet = require("model/Snippet"),
        LoginView = require("view/LoginView"),

        NavbarView = AbstractView.extend({

            tpl: NavbarViewTpl,

            events: {
                'click .addSnippetButton' : 'addSnippet',
                'click .logoutButton' : 'logout'
            },

            initialize: function(options ){
                this.setElement(options.el);
                AbstractView.prototype.initialize.apply(this);
            },

            render: function() {
                AbstractView.prototype.render.apply(this);
            },

            //open the editor with a new snippet
            addSnippet: function() {
                var editor = new SnippetEditorView({
                    el: window.context,
                    model: new Snippet()
                });
                editor.render();
            },

            //opens the login view
            logout:function() {
                var loginView = new LoginView({el: window.context});
                loginView.render();
            }
        });

    return NavbarView;

});