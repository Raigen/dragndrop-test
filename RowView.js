/*jslint nomen:true */
/*global jQuery, Backbone, _, window */
(function ($, _, Backbone) {
    'use strict';
    window.RowView = Backbone.View.extend({
        className: 'row-fluid',
        events: {
            'mouseover': 'addGrid',
            'mouseleave': 'removeGrid'
        },
        gridViews: [],
        slots: 0,
        initialize: function () {
            this.$el.css('position', 'relative');
            this.$droprow = $('.droprow:first');
            this.slots = this.$el.data('slots') || 0;
        },
        render: function () {
            this.$el.data('slots', this.slots);
            return this;
        },
        addElement: function (slots, offset) {
            offset = offset - this.slots;
            var elementView = new window.ElementView({
                slots: slots,
                offset: offset
            });
            this.gridViews.push(elementView);
            this.$el.append(elementView.render().$el);
            this.slots = this.slots + offset + slots;
            return elementView;
        },
        addGrid: function () {
            var that = this;
            if (!this.grid) {
                this.grid = new window.DropDownGrid({
                    el: this.$droprow.clone(),
                    dropHandler: function (event, ui) {
                        var offset = $(event.target).data('slot') - 1,
                            slots = $(ui.draggable).data('slots');
                        that.addElement(slots, offset);
                    }
                });
                this.grid.$el.css({
                    position: 'absolute'
                });
                this.$el.append(this.grid.$el);
            }
        },
        removeGrid: function () {
            if (this.grid) {
                this.grid.remove();
                this.grid = null;
            }
        }
    });
}(jQuery, _, Backbone));

