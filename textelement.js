/*jslint browser: true */
/*global jQuery, Backbone */
(function ($, Backbone) {
    'use strict';
    $(function () {
        var RowView = window.RowView,
            ElementVIew = window.ElementView,
            DropGridView = window.DropGridView,
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
            dropDownGrid = new DropGridView({el: $('.droprow')});
        window.DropDownGrid = DropGridView;
        $('#editor .row-fluid:not(.droprow)').each(function (i, element) {
            var t = new RowView({
                el: element
            });
        });
    });
}(jQuery, Backbone));
