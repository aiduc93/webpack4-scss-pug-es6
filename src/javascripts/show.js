/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
; (function ($, window, undefined) {
    'use strict';

    var pluginName = 'show';

    function Plugin(element, options) {
        this.element = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
        this.init();
    }

    Plugin.prototype = {
        init: function () {
            console.log('a123');
            $(this.element).on('click.' + pluginName, function () {
                alert($(this).text());
            })
        },

        destroy: function () {
            // remove events
            // deinitialize
            $.removeData(this.element[0], pluginName);
        }
    };

    $.fn[pluginName] = function (options, params) {
        return this.each(function () {
            var instance = $.data(this, pluginName);
            if (!instance) {
                $.data(this, pluginName, new Plugin(this, options));
            } else if (instance[options]) {
                instance[options](params);
            }
        });
    };

    $.fn[pluginName].defaults = {
        key: 'value',
        onCallback: null
    };

    $(function () {
        $('[data-' + pluginName + ']').on('customEvent', function () {
            // to do
        });

        $('[data-' + pluginName + ']')[pluginName]({
            key: 'custom'
        });
    });

}(jQuery, window));
