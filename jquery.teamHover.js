;(function ( $, window, document, undefined ) {

    // Create the defaults once
    var pluginName  = 'teamHover';
    var defaults    = {
        classes: {
            1: 'first',
            2: 'second',
            3: 'third'
        }
    };

    function Plugin( element, options ) {
        this.element            = element;
        this.options            = $.extend( {}, defaults, options) ;
        this._defaults          = defaults;
        this._name              = pluginName;
        this.$hoverElements     = $(this.element);
        this.blockWidth         = 0;
        this.blockHeight        = 0;
        this.blockOneThird      = 0;
        this.blockTwoThird      = 0;

        this.init();
    }

    Plugin.prototype.init = function () {
        this.getBlockDimensions();
        this.hoverAction();
    };

    Plugin.prototype.getBlockDimensions = function () {
        this.blockWidth     = this.$hoverElements.first().parent().width();
        this.blockHeight    = this.$hoverElements.first().parent().height();
        this.blockOneThird  = parseInt( this.blockWidth / 3, 10 );
        this.blockTwoThird  = this.blockOneThird * 2;
    };

    Plugin.prototype.hoverAction = function () {
        var that = this;

        this.$hoverElements.mousemove(function (event) {
            var left     = event.pageX - $(this).parent().offset().left;
            var getClass = that.getHoverClass( $(this), left );

            that.hoverAddClass( $(this), that.options.classes[getClass] );

            for(var key in that.options.classes) {
                if( that.options.classes.hasOwnProperty(key) ) {
                    if( key != getClass ) {
                        that.hoverRemoveClass( $(this), that.options.classes[key] );
                    }
                }
            }
        });

        this.$hoverElements.mouseout( function() {
            $(this).removeClass('team-block__image--first team-block__image--second team-block__image--third');
        });
    }

    Plugin.prototype.getHoverClass = function ($el, pos) {
        if( pos < this.blockOneThird ) {
            return 1;
        }else if( pos > this.blockOneThird && pos < this.blockTwoThird ){
            return 2;
        }else{
            return 3;
        }
    };

    Plugin.prototype.hoverAddClass = function ($el, c) {
        $el.addClass('team-block__image--' + c);
    };

    Plugin.prototype.hoverRemoveClass = function ($el, c) {
        $el.removeClass('team-block__image--' + c);
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );