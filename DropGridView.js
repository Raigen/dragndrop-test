/*jslint nomen:true */
/*global jQuery, Backbone, window */
(function ($, Backbone, RowView) {
    'use strict';
    window.DropGridView = Backbone.View.extend({
        events: {
            'drop .span1': 'dropHandler'
        },
        initialize: function () {
            this.$('.span1').droppable();
            if (this.options.dropHandler) {
                this.dropHandler = this.options.dropHandler;
            }
        },
        dropHandler: function (event, ui) {
            var offset = $(event.target).data('slot') - 1,
                slots = $(ui.draggable).data('slots'),
                parentSlots = offset + slots,
                newRow = new RowView({});
            this.$el.before(newRow.render().$el);
            newRow.addElement(slots, offset);
        }
    });
}(jQuery, Backbone, window.RowView));

