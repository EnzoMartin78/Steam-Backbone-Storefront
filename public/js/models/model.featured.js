(function (window){
    requirejs([
        'underscore',
        'backbone',
        'BB'
    ], function(_, Backbone, BB) {
        BB.model_definitions.featured = Backbone.Model.extend({
            defaults: {

            },

            url: '/api/featuredcategories',

            parse: function(data){
                console.log(data);
                var categories = {};

                for(var category in data){
                    var items = data[category].items;

                    if(typeof items === 'object'){
                        categories[category] = [];
                        var models = [];
                        var i = 0;
                        var len = items.length;

                        while(i < len){
                            var item = items[i];
                            if(typeof item.id !== 'undefined'){
                                categories[category].push(item.id);
                                models.push(new BB.model_definitions.game(item));
                            }
                            i++;
                        }
                        this.collection.add(models);
                    }
                }

                return data;
            }
        });
    });
})(window);