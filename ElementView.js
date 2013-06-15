/*jslint nomen:true */
/*global jQuery, Backbone, window */
(function ($, Backbone) {
    'use strict';
    window.ElementView = Backbone.View.extend({
        slots: 0,
        offset: 0,
        initialize: function () {
            this.slots = this.options.slots;
            this.offset = this.options.offset;
        },
        render: function () {
            if (this.slots) {
                this.$el.addClass('span' + this.slots);
            }
            if (this.offset) {
                this.$el.addClass('offset' + this.offset);
            }
            return this;
        }
    });
}(jQuery, Backbone));
