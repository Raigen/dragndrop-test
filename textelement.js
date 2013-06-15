/*jslint browser: true */
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
                    var that = this;
                    if (!this.grid) {
                        this.grid = new window.DropDownGrid({
                            el: this.$droprow.clone(),
                            dropHandler: function (event, ui) {
                                debugger;
                                var offset = $(event.target).data('slot') - 1,
                                    slots = $(ui.draggable).data('slots'),
                                    newElement = $('<div class="span' + slots + ' offset' + offset + '"></div>');
                                this.$el.after(newElement);
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
            }),
            DropGridView = Backbone.View.extend({
                el: '.droprow',
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
                        newElement = $('<div class="row-fluid"><div class="span' + slots + ' offset' + offset + '"></div></div>'),
                        t;
                    this.$el.before(newElement);
                    t = new RowView({
                        el: newElement
                    });
                }
            }),
            EditorView = Backbone.View.extend({
                el: '#editor',
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
            textElementView = new TextElementView(),
            dropDownGrid = new DropGridView();
        window.DropDownGrid = DropGridView;
        $('#editor .row-fluid:not(.droprow)').each(function (i, element) {
            var t = new RowView({
                el: element
            });
        });
    });
}(jQuery, Backbone));
