define(function(require) {

    var $ = require("jquery"),
        date = require("date"),

        SnippetUtils = {
            getDateAsString: function(date) {
                return date.toString("dd/MM/yyyy HH:mm:ss");
            },

            slugify: function slugify(text) {
                return text.toString().toLowerCase()
                .replace(/\s+/g, '-')           // Replace spaces with -
                .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
                .replace(/\-\-+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')             // Trim - from start of text
                .replace(/-+$/, '');            // Trim - from end of text
            }
        };

        return SnippetUtils;
});