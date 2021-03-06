/**
 * @name Featured View
 * @module Games
 * @memberOf Views
 */
(function (){
    requirejs([
        'BB',
        'backbone',
        'dust'
    ], function(BB,Backbone,dust) {
        return BB.view_definitions.featured = Backbone.View.extend({
            id: 'featured',

            title: 'Featured',

            template: 'tpl_featured',

            events: {

            },

            initialize: function(){
                this.listenTo(this.model, 'sync', this.render);
            },

            render: function(){
                var items = this.model.toJSON();
                var view = this;
                dust.render(this.template, items, function(err, out) {
                    view.$el.html(out);
                });
            }
        });
    });
})();