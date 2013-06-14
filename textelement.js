/*global jQuery, Backbone */
(function ($, Backbone) {
    'use strict';
    $(function () {
        var EditorView = Backbone.View.extend({
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
                        slots = $(ui.draggable).data('slots');
                    this.$droprow.before('<div class="row-fluid"><div class="span' + slots + ' offset' + offset + '"></div></div>');
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
    });
}(jQuery, Backbone));
