/*global jQuery, Backbone */
(function ($, Backbone) {
    'use strict';
    $(function () {
        var RowView = Backbone.View.extend({
                className: '.row-fluid',
                events: {
                    'mouseover': 'addGrid',
                    'mouseleave': 'removeGrid'
                },
                initialize: function () {
                    this.$el.css('position', 'relative');
                    this.$droprow = $('.droprow:first');
                },
                addGrid: function () {
                    if (!this.grid) {
                        this.grid = this.$droprow.clone();
                        this.grid.css({
                            position: 'absolute'
                        });
                        this.$el.append(this.grid);
                    }
                },
                removeGrid: function () {
                    if (this.grid) {
                        this.grid.remove();
                        this.grid = null;
                    }
                }
            }),
            EditorView = Backbone.View.extend({
                el: '#editor',
                events: {
                    'drop .span1': 'dropHandler'
                },
                initialize: function () {
                    this.$('.span1').droppable();
                    this.$droprow = this.$('.droprow');
                },
                dropHandler: function (event, ui) {
                    var offset = $(event.target).data('slot') - 1,
                        slots = $(ui.draggable).data('slots'),
                        newElement = $('<div class="row-fluid"><div class="span' + slots + ' offset' + offset + '"></div></div>'),
                        t;
                    this.$droprow.before(newElement);
                    t = new RowView({
                        el: newElement
                    });
                }
            }),
            TextElementView = Backbone.View.extend({
                el: '#dragme',
                dragHelper: function () {
                    return '<div class="drag-helper span2" id="draggableHelper">Textelement</div>';
                },
                initialize: function () {
                    this.$el.data('view', this);
                    this.$el.data('slots', 2);
                    this.$el.draggable({
                        cursor: 'move',
                        container: '#editor',
                        helper: this.dragHelper
                    });
                }
            }),
            editorView = new EditorView(),
            textElementView = new TextElementView();
        $('#editor .row-fluid:not(.droprow)').each(function (i, element) {
            var t = new RowView({
                el: element
            });
        });
    });
}(jQuery, Backbone));
