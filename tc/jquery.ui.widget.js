! function(factory) {
    "function" == typeof define && define.amd ? define(["jquery"], factory) : factory(jQuery)
}(function($, undefined) {
    var uuid = 0,
        slice = Array.prototype.slice,
        _cleanData = $.cleanData;
    $.cleanData = function(elems) {
        for (var elem, i = 0; null != (elem = elems[i]); i++) try {
            $(elem).triggerHandler("remove")
        } catch (e) {}
        _cleanData(elems)
    };
    $.widget = function(name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {},
            namespace = name.split(".")[0];
        name = name.split(".")[1];
        fullName = namespace + "-" + name;
        if (!prototype) {
            prototype = base;
            base = $.Widget
        }
        $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName)
        };
        $[namespace] = $[namespace] || {};
        existingConstructor = $[namespace][name];
        constructor = $[namespace][name] = function(options, element) {
            if (!this._createWidget) return new constructor(options, element);
            arguments.length && this._createWidget(options, element)
        };
        $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        });
        basePrototype = new base;
        basePrototype.options = $.widget.extend({}, basePrototype.options);
        $.each(prototype, function(prop, value) {
            $.isFunction(value) ? proxiedPrototype[prop] = function() {
                var _super = function() {
                        return base.prototype[prop].apply(this, arguments)
                    },
                    _superApply = function(args) {
                        return base.prototype[prop].apply(this, args)
                    };
                return function() {
                    var returnValue, __super = this._super,
                        __superApply = this._superApply;
                    this._super = _super;
                    this._superApply = _superApply;
                    returnValue = value.apply(this, arguments);
                    this._super = __super;
                    this._superApply = __superApply;
                    return returnValue
                }
            }() : proxiedPrototype[prop] = value
        });
        constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix: existingConstructor ? basePrototype.widgetEventPrefix || name : name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        });
        if (existingConstructor) {
            $.each(existingConstructor._childConstructors, function(i, child) {
                var childPrototype = child.prototype;
                $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto)
            });
            delete existingConstructor._childConstructors
        } else base._childConstructors.push(constructor);
        $.widget.bridge(name, constructor)
    };
    $.widget.extend = function(target) {
        for (var key, value, input = slice.call(arguments, 1), inputIndex = 0, inputLength = input.length; inputLength > inputIndex; inputIndex++)
            for (key in input[inputIndex]) {
                value = input[inputIndex][key];
                input[inputIndex].hasOwnProperty(key) && value !== undefined && ($.isPlainObject(value) ? target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value) : target[key] = value)
            }
        return target
    };
    $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = "string" == typeof options,
                args = slice.call(arguments, 1),
                returnValue = this;
            options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options;
            isMethodCall ? this.each(function() {
                var methodValue, instance = $.data(this, fullName);
                if (!instance) return $.error("cannot call methods on " + name + " prior to initialization; attempted to call method '" + options + "'");
                if (!$.isFunction(instance[options]) || "_" === options.charAt(0)) return $.error("no such method '" + options + "' for " + name + " widget instance");
                methodValue = instance[options].apply(instance, args);
                if (methodValue !== instance && methodValue !== undefined) {
                    returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue;
                    return false
                }
            }) : this.each(function() {
                var instance = $.data(this, fullName);
                instance ? instance.option(options || {})._init() : $.data(this, fullName, new object(options, this))
            });
            return returnValue
        }
    };
    $.Widget = function() {};
    $.Widget._childConstructors = [];
    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: false,
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0];
            this.element = $(element);
            this.uuid = uuid++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options);
            this.bindings = $();
            this.hoverable = $();
            this.focusable = $();
            if (element !== this) {
                $.data(element, this.widgetFullName, this);
                this._on(true, this.element, {
                    remove: function(event) {
                        event.target === element && this.destroy()
                    }
                });
                this.document = $(element.style ? element.ownerDocument : element.document || element);
                this.window = $(this.document[0].defaultView || this.document[0].parentWindow)
            }
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: $.noop,
        widget: function() {
            return this.element
        },
        option: function(key, value) {
            var parts, curOption, i, options = key;
            if (0 === arguments.length) return $.widget.extend({}, this.options);
            if ("string" == typeof key) {
                options = {};
                parts = key.split(".");
                key = parts.shift();
                if (parts.length) {
                    curOption = options[key] = $.widget.extend({}, this.options[key]);
                    for (i = 0; i < parts.length - 1; i++) {
                        curOption[parts[i]] = curOption[parts[i]] || {};
                        curOption = curOption[parts[i]]
                    }
                    key = parts.pop();
                    if (1 === arguments.length) return curOption[key] === undefined ? null : curOption[key];
                    curOption[key] = value
                } else {
                    if (1 === arguments.length) return this.options[key] === undefined ? null : this.options[key];
                    options[key] = value
                }
            }
            this._setOptions(options);
            return this
        },
        _setOptions: function(options) {
            var key;
            for (key in options) this._setOption(key, options[key]);
            return this
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            if ("disabled" === key) {
                this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!value).attr("aria-disabled", value);
                this.hoverable.removeClass("ui-state-hover");
                this.focusable.removeClass("ui-state-focus")
            }
            return this
        },
        enable: function() {
            return this._setOption("disabled", false)
        },
        disable: function() {
            return this._setOption("disabled", true)
        },
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            if ("boolean" != typeof suppressDisabledCheck) {
                handlers = element;
                element = suppressDisabledCheck;
                suppressDisabledCheck = false
            }
            if (handlers) {
                element = delegateElement = $(element);
                this.bindings = this.bindings.add(element)
            } else {
                handlers = element;
                element = this.element;
                delegateElement = this.widget()
            }
            $.each(handlers, function(event, handler) {
                function handlerProxy() {
                    return suppressDisabledCheck || true !== instance.options.disabled && !$(this).hasClass("ui-state-disabled") ? ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments) : void 0
                }
                "string" != typeof handler && (handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++);
                var match = event.match(/^(\w+)\s*(.*)$/),
                    eventName = match[1] + instance.eventNamespace,
                    selector = match[2];
                selector ? delegateElement.delegate(selector, eventName, handlerProxy) : element.bind(eventName, handlerProxy)
            })
        },
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            element.unbind(eventName).undelegate(eventName)
        },
        _delay: function(handler, delay) {
            function handlerProxy() {
                return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments)
            }
            var instance = this;
            return setTimeout(handlerProxy, delay || 0)
        },
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element);
            this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(element) {
            this.focusable = this.focusable.add(element);
            this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
            data = data || {};
            event = $.Event(event);
            event.type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase();
            event.target = this.element[0];
            orig = event.originalEvent;
            if (orig)
                for (prop in orig) prop in event || (event[prop] = orig[prop]);
            this.element.trigger(event, data);
            return !($.isFunction(callback) && false === callback.apply(this.element[0], [event].concat(data)) || event.isDefaultPrevented())
        }
    };
    $.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(method, defaultEffect) {
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            "string" == typeof options && (options = {
                effect: options
            });
            var hasOptions, effectName = options ? true === options || "number" == typeof options ? defaultEffect : options.effect || defaultEffect : method;
            options = options || {};
            "number" == typeof options && (options = {
                duration: options
            });
            hasOptions = !$.isEmptyObject(options);
            options.complete = callback;
            options.delay && element.delay(options.delay);
            hasOptions && $.effects && $.effects.effect[effectName] ? element[method](options) : effectName !== method && element[effectName] ? element[effectName](options.duration, options.easing, callback) : element.queue(function(next) {
                $(this)[method]();
                callback && callback.call(element[0]);
                next()
            })
        }
    })
});