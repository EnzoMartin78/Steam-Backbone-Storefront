// requestAnimationFrame() shim by Paul Irish
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback){
			window.setTimeout(callback,1000 / 60);
		};
}());

(function (root, factory) {
    define([
        'backbone',
        'BB',
        'lib',
        'exports'
    ], function (Backbone, BB, lib, exports) {
        return factory(root, exports, Backbone, BB, lib);
    });
}(this, function (root, BBS, Backbone, BB, Lib) {
	BBS = {
		// Object Variables
		main_ele: '#content',
        $el: null,
		timers: {},
		title: 'BB Steam',
		Lib: typeof Lib !== 'undefined'? Lib : false
	};

    /**
     * Pass in the view to render as the main active view, it will recycle the previously active view unless persist is passed in
     * @param view {*} View object
     */
    BBS.render = function(view){
        var _this = this;
        if(this.current_view){
            var old_view = BB.get({view: this.current_view});
            // Delete any subviews
            if(old_view.subviews){
                for(var i in old_view.subviews){
                    var sub = old_view.subviews[i];
                    sub.remove();
                }
            }

            old_view.remove();
        }
        this.current_view = view.name;
        var title = this.title;
        var type = typeof view.title;
        if(type !== 'undefined'){
            if(type === 'function'){
                title = view.title();
            } else {
                title = view.title;
            }
        }
        root.document.title = title;
        view.render();
        _this.$el.html(view.$el);
    };

    /**
     * Set the options passed in and cache the primary selector
     * @param options
     */
    BBS.set_options = function(options){
        for (var index in options) {
            var option = options[index];
            this[index] = option;
        }

        // Cache the content selector
        this.$el = $(this.main_ele);
    };

    /**
     * Initializes the main object, makes references to the lib's properties, applies options if passed in, starts backbone's router
     * @param options
     */
    BBS.init = function(router,options){
        // Create references to the lib's properties
        if(this.Lib){
            for(var i in this.Lib){
                this[i] = this.Lib[i];
            }
        }

        // Set the options
        this.set_options(options);

        // Make new instance of the router
        this.active_router = new router();
        Backbone.history.start({pushState: true});
    };

    return BBS;
}));