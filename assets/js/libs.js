jQuery.ui || (function ($) {
	var _remove = $.fn.remove, isFF2 = $.browser.mozilla && (parseFloat($.browser.version) < 1.9);
	$.ui = {version: "1.7.2", plugin: {add: function (module, option, set) {
		var proto = $.ui[module].prototype;
		for (var i in set) {
			proto.plugins[i] = proto.plugins[i] || [];
			proto.plugins[i].push([option, set[i]]);
		}
	}, call                               : function (instance, name, args) {
		var set = instance.plugins[name];
		if (!set || !instance.element[0].parentNode) {
			return;
		}
		for (var i = 0; i < set.length; i++) {
			if (instance.options[set[i][0]]) {
				set[i][1].apply(instance.element, args);
			}
		}
	}}, contains   : function (a, b) {
		return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b);
	}, hasScroll   : function (el, a) {
		if ($(el).css('overflow') == 'hidden') {
			return false;
		}
		var scroll = (a && a == 'left') ? 'scrollLeft' : 'scrollTop', has = false;
		if (el[scroll] > 0) {
			return true;
		}
		el[scroll] = 1;
		has = (el[scroll] > 0);
		el[scroll] = 0;
		return has;
	}, isOverAxis  : function (x, reference, size) {
		return(x > reference) && (x < (reference + size));
	}, isOver      : function (y, x, top, left, height, width) {
		return $.ui.isOverAxis(y, top, height) && $.ui.isOverAxis(x, left, width);
	}, keyCode     : {BACKSPACE: 8, CAPS_LOCK: 20, COMMA: 188, CONTROL: 17, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, INSERT: 45, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SHIFT: 16, SPACE: 32, TAB: 9, UP: 38}};
	if (isFF2) {
		var attr = $.attr, removeAttr = $.fn.removeAttr, ariaNS = "http://www.w3.org/2005/07/aaa", ariaState = /^aria-/, ariaRole = /^wairole:/;
		$.attr = function (elem, name, value) {
			var set = value !== undefined;
			return(name == 'role' ? (set ? attr.call(this, elem, name, "wairole:" + value) : (attr.apply(this, arguments) || "").replace(ariaRole, "")) : (ariaState.test(name) ? (set ? elem.setAttributeNS(ariaNS, name.replace(ariaState, "aaa:"), value) : attr.call(this, elem, name.replace(ariaState, "aaa:"))) : attr.apply(this, arguments)));
		};
		$.fn.removeAttr = function (name) {
			return(ariaState.test(name) ? this.each(function () {
				this.removeAttributeNS(ariaNS, name.replace(ariaState, ""));
			}) : removeAttr.call(this, name));
		};
	}
	$.fn.extend({remove: function () {
		$("*", this).add(this).each(function () {
			$(this).triggerHandler("remove");
		});
		return _remove.apply(this, arguments);
	}, enableSelection : function () {
		return this.attr('unselectable', 'off').css('MozUserSelect', '').unbind('selectstart.ui');
	}, disableSelection: function () {
		return this.attr('unselectable', 'on').css('MozUserSelect', 'none').bind('selectstart.ui', function () {
			return false;
		});
	}, scrollParent    : function () {
		var scrollParent;
		if (($.browser.msie && (/(static|relative)/).test(this.css('position'))) || (/absolute/).test(this.css('position'))) {
			scrollParent = this.parents().filter(function () {
				return(/(relative|absolute|fixed)/).test($.curCSS(this, 'position', 1)) && (/(auto|scroll)/).test($.curCSS(this, 'overflow', 1) + $.curCSS(this, 'overflow-y', 1) + $.curCSS(this, 'overflow-x', 1));
			}).eq(0);
		} else {
			scrollParent = this.parents().filter(function () {
				return(/(auto|scroll)/).test($.curCSS(this, 'overflow', 1) + $.curCSS(this, 'overflow-y', 1) + $.curCSS(this, 'overflow-x', 1));
			}).eq(0);
		}
		return(/fixed/).test(this.css('position')) || !scrollParent.length ? $(document) : scrollParent;
	}});
	$.extend($.expr[':'], {data: function (elem, i, match) {
		return!!$.data(elem, match[3]);
	}, focusable               : function (element) {
		var nodeName = element.nodeName.toLowerCase(), tabIndex = $.attr(element, 'tabindex');
		return(/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : 'a' == nodeName || 'area' == nodeName ? element.href || !isNaN(tabIndex) : !isNaN(tabIndex)) && !$(element)['area' == nodeName ? 'parents' : 'closest'](':hidden').length;
	}, tabbable                : function (element) {
		var tabIndex = $.attr(element, 'tabindex');
		return(isNaN(tabIndex) || tabIndex >= 0) && $(element).is(':focusable');
	}});
	function getter(namespace, plugin, method, args) {
		function getMethods(type) {
			var methods = $[namespace][plugin][type] || [];
			return(typeof methods == 'string' ? methods.split(/,?\s+/) : methods);
		}

		var methods = getMethods('getter');
		if (args.length == 1 && typeof args[0] == 'string') {
			methods = methods.concat(getMethods('getterSetter'));
		}
		return($.inArray(method, methods) != -1);
	}

	$.widget = function (name, prototype) {
		var namespace = name.split(".")[0];
		name = name.split(".")[1];
		$.fn[name] = function (options) {
			var isMethodCall = (typeof options == 'string'), args = Array.prototype.slice.call(arguments, 1);
			if (isMethodCall && options.substring(0, 1) == '_') {
				return this;
			}
			if (isMethodCall && getter(namespace, name, options, args)) {
				var instance = $.data(this[0], name);
				return(instance ? instance[options].apply(instance, args) : undefined);
			}
			return this.each(function () {
				var instance = $.data(this, name);
				(!instance && !isMethodCall && $.data(this, name, new $[namespace][name](this, options))._init());
				(instance && isMethodCall && $.isFunction(instance[options]) && instance[options].apply(instance, args));
			});
		};
		$[namespace] = $[namespace] || {};
		$[namespace][name] = function (element, options) {
			var self = this;
			this.namespace = namespace;
			this.widgetName = name;
			this.widgetEventPrefix = $[namespace][name].eventPrefix || name;
			this.widgetBaseClass = namespace + '-' + name;
			this.options = $.extend({}, $.widget.defaults, $[namespace][name].defaults, $.metadata && $.metadata.get(element)[name], options);
			this.element = $(element).bind('setData.' + name,function (event, key, value) {
				if (event.target == element) {
					return self._setData(key, value);
				}
			}).bind('getData.' + name,function (event, key) {
				if (event.target == element) {
					return self._getData(key);
				}
			}).bind('remove', function () {
				return self.destroy();
			});
		};
		$[namespace][name].prototype = $.extend({}, $.widget.prototype, prototype);
		$[namespace][name].getterSetter = 'option';
	};
	$.widget.prototype = {_init: function () {
	}, destroy                 : function () {
		this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled').removeAttr('aria-disabled');
	}, option                  : function (key, value) {
		var options = key, self = this;
		if (typeof key == "string") {
			if (value === undefined) {
				return this._getData(key);
			}
			options = {};
			options[key] = value;
		}
		$.each(options, function (key, value) {
			self._setData(key, value);
		});
	}, _getData                : function (key) {
		return this.options[key];
	}, _setData                : function (key, value) {
		this.options[key] = value;
		if (key == 'disabled') {
			this.element[value ? 'addClass' : 'removeClass'](this.widgetBaseClass + '-disabled' + ' ' + this.namespace + '-state-disabled').attr("aria-disabled", value);
		}
	}, enable                  : function () {
		this._setData('disabled', false);
	}, disable                 : function () {
		this._setData('disabled', true);
	}, _trigger                : function (type, event, data) {
		var callback = this.options[type], eventName = (type == this.widgetEventPrefix ? type : this.widgetEventPrefix + type);
		event = $.Event(event);
		event.type = eventName;
		if (event.originalEvent) {
			for (var i = $.event.props.length, prop; i;) {
				prop = $.event.props[--i];
				event[prop] = event.originalEvent[prop];
			}
		}
		this.element.trigger(event, data);
		return!($.isFunction(callback) && callback.call(this.element[0], event, data) === false || event.isDefaultPrevented());
	}};
	$.widget.defaults = {disabled: false};
	$.ui.mouse = {_mouseInit: function () {
		var self = this;
		this.element.bind('mousedown.' + this.widgetName,function (event) {
			return self._mouseDown(event);
		}).bind('click.' + this.widgetName, function (event) {
			if (self._preventClickEvent) {
				self._preventClickEvent = false;
				event.stopImmediatePropagation();
				return false;
			}
		});
		if ($.browser.msie) {
			this._mouseUnselectable = this.element.attr('unselectable');
			this.element.attr('unselectable', 'on');
		}
		this.started = false;
	}, _mouseDestroy        : function () {
		this.element.unbind('.' + this.widgetName);
		($.browser.msie && this.element.attr('unselectable', this._mouseUnselectable));
	}, _mouseDown           : function (event) {
		event.originalEvent = event.originalEvent || {};
		if (event.originalEvent.mouseHandled) {
			return;
		}
		(this._mouseStarted && this._mouseUp(event));
		this._mouseDownEvent = event;
		var self = this, btnIsLeft = (event.which == 1), elIsCancel = (typeof this.options.cancel == "string" ? $(event.target).parents().add(event.target).filter(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}
		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function () {
				self.mouseDelayMet = true;
			}, this.options.delay);
		}
		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}
		this._mouseMoveDelegate = function (event) {
			return self._mouseMove(event);
		};
		this._mouseUpDelegate = function (event) {
			return self._mouseUp(event);
		};
		$(document).bind('mousemove.' + this.widgetName, this._mouseMoveDelegate).bind('mouseup.' + this.widgetName, this._mouseUpDelegate);
		($.browser.safari || event.preventDefault());
		event.originalEvent.mouseHandled = true;
		return true;
	}, _mouseMove           : function (event) {
		if ($.browser.msie && !event.button) {
			return this._mouseUp(event);
		}
		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}
		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}
		return!this._mouseStarted;
	}, _mouseUp             : function (event) {
		$(document).unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate).unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
		if (this._mouseStarted) {
			this._mouseStarted = false;
			this._preventClickEvent = (event.target == this._mouseDownEvent.target);
			this._mouseStop(event);
		}
		return false;
	}, _mouseDistanceMet    : function (event) {
		return(Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance);
	}, _mouseDelayMet       : function (event) {
		return this.mouseDelayMet;
	}, _mouseStart          : function (event) {
	}, _mouseDrag           : function (event) {
	}, _mouseStop           : function (event) {
	}, _mouseCapture        : function (event) {
		return true;
	}};
	$.ui.mouse.defaults = {cancel: null, distance: 1, delay: 0};
})(jQuery);
(function ($) {
	$.widget("ui.slider", $.extend({}, $.ui.mouse, {_init: function () {
		var self = this, o = this.options;
		this._keySliding = false;
		this._handleIndex = null;
		this._detectOrientation();
		// TODO! check something
		// this._mouseInit();
		this.element.addClass("ui-slider" + " ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all");
		this.range = $([]);
		if (o.range) {
			if (o.range === true) {
				this.range = $('<div></div>');
				if (!o.values)o.values = [this._valueMin(), this._valueMin()];
				if (o.values.length && o.values.length != 2) {
					o.values = [o.values[0], o.values[0]];
				}
			} else {
				this.range = $('<div></div>');
			}
			this.range.appendTo(this.element).addClass("ui-slider-range");
			if (o.range == "min" || o.range == "max") {
				this.range.addClass("ui-slider-range-" + o.range);
			}
			this.range.addClass("ui-widget-header");
		}
		if ($(".ui-slider-handle", this.element).length == 0)
			$('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle");
		if (o.values && o.values.length) {
			while ($(".ui-slider-handle", this.element).length < o.values.length)
				$('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle");
		}
		this.handles = $(".ui-slider-handle", this.element).addClass("ui-state-default" + " ui-corner-all");
		this.handle = this.handles.eq(0);
		this.handles.add(this.range).filter("a").click(function (event) {
			event.preventDefault();
		}).hover(function () {
			if (!o.disabled) {
				$(this).addClass('ui-state-hover');
			}
		},function () {
			$(this).removeClass('ui-state-hover');
		}).focus(function () {
			if (!o.disabled) {
				$(".ui-slider .ui-state-focus").removeClass('ui-state-focus');
				$(this).addClass('ui-state-focus');
			} else {
				$(this).blur();
			}
		}).blur(function () {
			$(this).removeClass('ui-state-focus');
		});
		this.handles.each(function (i) {
			$(this).data("index.ui-slider-handle", i);
		});
		this.handles.keydown(function (event) {
			var ret = true;
			var index = $(this).data("index.ui-slider-handle");
			if (self.options.disabled)
				return;
			switch (event.keyCode) {
				case $.ui.keyCode.HOME:
				case $.ui.keyCode.END:
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					ret = false;
					if (!self._keySliding) {
						self._keySliding = true;
						$(this).addClass("ui-state-active");
						self._start(event, index);
					}
					break;
			}
			var curVal, newVal, step = self._step();
			if (self.options.values && self.options.values.length) {
				curVal = newVal = self.values(index);
			} else {
				curVal = newVal = self.value();
			}
			switch (event.keyCode) {
				case $.ui.keyCode.HOME:
					newVal = self._valueMin();
					break;
				case $.ui.keyCode.END:
					newVal = self._valueMax();
					break;
				case $.ui.keyCode.UP:
				case $.ui.keyCode.RIGHT:
					if (curVal == self._valueMax())return;
					newVal = curVal + step;
					break;
				case $.ui.keyCode.DOWN:
				case $.ui.keyCode.LEFT:
					if (curVal == self._valueMin())return;
					newVal = curVal - step;
					break;
			}
			self._slide(event, index, newVal);
			return ret;
		}).keyup(function (event) {
				var index = $(this).data("index.ui-slider-handle");
				if (self._keySliding) {
					self._stop(event, index);
					self._change(event, index);
					self._keySliding = false;
					$(this).removeClass("ui-state-active");
				}
			});
		this._refreshValue();
	}, destroy                                           : function () {
		this.handles.remove();
		this.range.remove();
		this.element.removeClass("ui-slider" + " ui-slider-horizontal" + " ui-slider-vertical" + " ui-slider-disabled" + " ui-widget" + " ui-widget-content" + " ui-corner-all").removeData("slider").unbind(".slider");
		this._mouseDestroy();
	}, _mouseCapture                                     : function (event) {
		var o = this.options;
		if (o.disabled)
			return false;
		this.elementSize = {width: this.element.outerWidth(), height: this.element.outerHeight()};
		this.elementOffset = this.element.offset();
		var position = {x: event.pageX, y: event.pageY};
		var normValue = this._normValueFromMouse(position);
		var distance = this._valueMax() - this._valueMin() + 1, closestHandle;
		var self = this, index;
		this.handles.each(function (i) {
			var thisDistance = Math.abs(normValue - self.values(i));
			if (distance > thisDistance) {
				distance = thisDistance;
				closestHandle = $(this);
				index = i;
			}
		});
		if (o.range == true && this.values(1) == o.min) {
			closestHandle = $(this.handles[++index]);
		}
		this._start(event, index);
		self._handleIndex = index;
		closestHandle.addClass("ui-state-active").focus();
		var offset = closestHandle.offset();
		var mouseOverHandle = !$(event.target).parents().andSelf().is('.ui-slider-handle');
		this._clickOffset = mouseOverHandle ? {left: 0, top: 0} : {left: event.pageX - offset.left - (closestHandle.width() / 2), top: event.pageY - offset.top - (closestHandle.height() / 2) - (parseInt(closestHandle.css('borderTopWidth'), 10) || 0) - (parseInt(closestHandle.css('borderBottomWidth'), 10) || 0) + (parseInt(closestHandle.css('marginTop'), 10) || 0)};
		normValue = this._normValueFromMouse(position);
		this._slide(event, index, normValue);
		return true;
	}, _mouseStart                                       : function (event) {
		return true;
	}, _mouseDrag                                        : function (event) {
		var position = {x: event.pageX, y: event.pageY};
		var normValue = this._normValueFromMouse(position);
		this._slide(event, this._handleIndex, normValue);
		return false;
	}, _mouseStop                                        : function (event) {
		this.handles.removeClass("ui-state-active");
		this._stop(event, this._handleIndex);
		this._change(event, this._handleIndex);
		this._handleIndex = null;
		this._clickOffset = null;
		return false;
	}, _detectOrientation                                : function () {
		this.orientation = this.options.orientation == 'vertical' ? 'vertical' : 'horizontal';
	}, _normValueFromMouse                               : function (position) {
		var pixelTotal, pixelMouse;
		if ('horizontal' == this.orientation) {
			pixelTotal = this.elementSize.width;
			pixelMouse = position.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0);
		} else {
			pixelTotal = this.elementSize.height;
			pixelMouse = position.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0);
		}
		var percentMouse = (pixelMouse / pixelTotal);
		if (percentMouse > 1)percentMouse = 1;
		if (percentMouse < 0)percentMouse = 0;
		if ('vertical' == this.orientation)
			percentMouse = 1 - percentMouse;
		var valueTotal = this._valueMax() - this._valueMin(), valueMouse = percentMouse * valueTotal, valueMouseModStep = valueMouse % this.options.step, normValue = this._valueMin() + valueMouse - valueMouseModStep;
		if (valueMouseModStep > (this.options.step / 2))
			normValue += this.options.step;
		return parseFloat(normValue.toFixed(5));
	}, _start                                            : function (event, index) {
		var uiHash = {handle: this.handles[index], value: this.value()};
		if (this.options.values && this.options.values.length) {
			uiHash.value = this.values(index);
			uiHash.values = this.values();
		}
		this._trigger("start", event, uiHash);
	}, _slide                                            : function (event, index, newVal) {
		var handle = this.handles[index];
		if (this.options.values && this.options.values.length) {
			var otherVal = this.values(index ? 0 : 1);
			if ((this.options.values.length == 2 && this.options.range === true) && ((index == 0 && newVal > otherVal) || (index == 1 && newVal < otherVal))) {
				newVal = otherVal;
			}
			if (newVal != this.values(index)) {
				var newValues = this.values();
				newValues[index] = newVal;
				var allowed = this._trigger("slide", event, {handle: this.handles[index], value: newVal, values: newValues});
				var otherVal = this.values(index ? 0 : 1);
				if (allowed !== false) {
					this.values(index, newVal, (event.type == 'mousedown' && this.options.animate), true);
				}
			}
		} else {
			if (newVal != this.value()) {
				var allowed = this._trigger("slide", event, {handle: this.handles[index], value: newVal});
				if (allowed !== false) {
					this._setData('value', newVal, (event.type == 'mousedown' && this.options.animate));
				}
			}
		}
	}, _stop                                             : function (event, index) {
		var uiHash = {handle: this.handles[index], value: this.value()};
		if (this.options.values && this.options.values.length) {
			uiHash.value = this.values(index);
			uiHash.values = this.values();
		}
		this._trigger("stop", event, uiHash);
	}, _change                                           : function (event, index) {
		var uiHash = {handle: this.handles[index], value: this.value()};
		if (this.options.values && this.options.values.length) {
			uiHash.value = this.values(index);
			uiHash.values = this.values();
		}
		this._trigger("change", event, uiHash);
	}, value                                             : function (newValue) {
		if (arguments.length) {
			this._setData("value", newValue);
			this._change(null, 0);
		}
		return this._value();
	}, values                                            : function (index, newValue, animated, noPropagation) {
		if (arguments.length > 1) {
			this.options.values[index] = newValue;
			this._refreshValue(animated);
			if (!noPropagation)this._change(null, index);
		}
		if (arguments.length) {
			if (this.options.values && this.options.values.length) {
				return this._values(index);
			} else {
				return this.value();
			}
		} else {
			return this._values();
		}
	}, _setData                                          : function (key, value, animated) {
		$.widget.prototype._setData.apply(this, arguments);
		switch (key) {
			case'disabled':
				if (value) {
					this.handles.filter(".ui-state-focus").blur();
					this.handles.removeClass("ui-state-hover");
					this.handles.attr("disabled", "disabled");
				} else {
					this.handles.removeAttr("disabled");
				}
			case'orientation':
				this._detectOrientation();
				this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
				this._refreshValue(animated);
				break;
			case'value':
				this._refreshValue(animated);
				break;
		}
	}, _step                                             : function () {
		var step = this.options.step;
		return step;
	}, _value                                            : function () {
		var val = this.options.value;
		if (val < this._valueMin())val = this._valueMin();
		if (val > this._valueMax())val = this._valueMax();
		return val;
	}, _values                                           : function (index) {
		if (arguments.length) {
			var val = this.options.values[index];
			if (val < this._valueMin())val = this._valueMin();
			if (val > this._valueMax())val = this._valueMax();
			return val;
		} else {
			return this.options.values;
		}
	}, _valueMin                                         : function () {
		var valueMin = this.options.min;
		return valueMin;
	}, _valueMax                                         : function () {
		var valueMax = this.options.max;
		return valueMax;
	}, _refreshValue                                     : function (animate) {
		var oRange = this.options.range, o = this.options, self = this;
		if (this.options.values && this.options.values.length) {
			var vp0, vp1;
			this.handles.each(function (i, j) {
				var valPercent = (self.values(i) - self._valueMin()) / (self._valueMax() - self._valueMin()) * 100;
				var _set = {};
				_set[self.orientation == 'horizontal' ? 'left' : 'bottom'] = valPercent + '%';
				$(this).stop(1, 1)[animate ? 'animate' : 'css'](_set, o.animate);
				if (self.options.range === true) {
					if (self.orientation == 'horizontal') {
						(i == 0) && self.range.stop(1, 1)[animate ? 'animate' : 'css']({left: valPercent + '%'}, o.animate);
						(i == 1) && self.range[animate ? 'animate' : 'css']({width: (valPercent - lastValPercent) + '%'}, {queue: false, duration: o.animate});
					} else {
						(i == 0) && self.range.stop(1, 1)[animate ? 'animate' : 'css']({bottom: (valPercent) + '%'}, o.animate);
						(i == 1) && self.range[animate ? 'animate' : 'css']({height: (valPercent - lastValPercent) + '%'}, {queue: false, duration: o.animate});
					}
				}
				lastValPercent = valPercent;
			});
		} else {
			var value = this.value(), valueMin = this._valueMin(), valueMax = this._valueMax(), valPercent = valueMax != valueMin ? (value - valueMin) / (valueMax - valueMin) * 100 : 0;
			var _set = {};
			_set[self.orientation == 'horizontal' ? 'left' : 'bottom'] = valPercent + '%';
			this.handle.stop(1, 1)[animate ? 'animate' : 'css'](_set, o.animate);
			(oRange == "min") && (this.orientation == "horizontal") && this.range.stop(1, 1)[animate ? 'animate' : 'css']({width: valPercent + '%'}, o.animate);
			(oRange == "max") && (this.orientation == "horizontal") && this.range[animate ? 'animate' : 'css']({width: (100 - valPercent) + '%'}, {queue: false, duration: o.animate});
			(oRange == "min") && (this.orientation == "vertical") && this.range.stop(1, 1)[animate ? 'animate' : 'css']({height: valPercent + '%'}, o.animate);
			(oRange == "max") && (this.orientation == "vertical") && this.range[animate ? 'animate' : 'css']({height: (100 - valPercent) + '%'}, {queue: false, duration: o.animate});
		}
	}}));
	$.extend($.ui.slider, {getter: "value values", version: "1.7.2", eventPrefix: "slide", defaults: {animate: false, delay: 0, distance: 0, max: 100, min: 0, orientation: 'horizontal', range: false, step: 1, value: 0, values: null}});
})(jQuery);

var pcicard = new Array();
pcicard[0] = 18;
var cflash = 40;
empty_cflash = 50;
var md = new Array();
md[0] = 170;
md[1] = 195;
md[2] = 140;
var mz = new Array();
mz[0] = 0;
mz[1] = 12;
mz[2] = 20;
mz[3] = 40;
var ps = new Array();
ps[0] = 0;
ps[1] = 18;
ps[2] = 38;
ps[3] = 26;
var c = new Array();
c[0] = 0;
c[1] = 20;
c[2] = 20;
c[3] = 49;
c[4] = 26;
var mps = new Array();
mps[0] = 0;
mps[1] = 70;
var pcm1 = new Array();
pcm1[0] = 0;
pcm1[1] = 125;
var pcm2 = new Array();
pcm2[0] = 0;
pcm2[1] = 125;
var ros = new Array();
ros[0] = 0;
ros[1] = 45;
ros[2] = 65;
ros[3] = 95;
ros[4] = 250;
var pcis = new Array();
pcis[0] = 0;
pcis[1] = 18;
pcir = new Array();
pcir[0] = 0;
pcir[1] = 95;
pcir[2] = 95;
pcir[3] = 65;
minipci1 = new Array();
minipci1[0] = 0;
minipci1[1] = 70;
minipci2 = new Array();
minipci2[0] = 0;
minipci2[1] = 70;
minipci3 = new Array();
minipci3[0] = 0;
minipci3[1] = 70;
minipci4 = new Array();
minipci4[0] = 0;
minipci4[1] = 70;
ps_500 = new Array();
ps_500[0] = 0;
ps_500[1] = 9;
ps_500[2] = 18;
ps_500[3] = 18;
ps_500[4] = 26;
c_500 = new Array();
c_500[0] = 0;
c_500[1] = 20;
c_500[2] = 45;
ros_500 = new Array();
ros_500[0] = 0;
ros_500[1] = 20;
ros_500[2] = 25;
ros_500[3] = 200;
function chlist(lst, status) {
	if (status == 1) {
		document.getElementById(lst).style.display = 'block';
	} else document.getElementById(lst).style.display = 'none';
}

function RB500_pos(bit, res) {
	chlist('list66', (bit ? 0 : 1));
	chlist('list67', (bit ? 1 : 0));
	chlist('list68', (bit ? 0 : 1));
	chlist('list69', (bit ? 0 : 1));
	chlist('list70', (bit ? 1 : 0));
	if (res != 1) {
		chlist('list4', (bit ? 0 : 1));
		chlist('list2', (bit ? 0 : 1));
	}
	chlist('list71', (bit ? 1 : 0));
	chlist('list72', (bit ? 0 : 1));
	chlist('list73', (bit ? 0 : 1));
	chlist('list74', (bit ? 1 : 0));
}
function put_stand() {
	if (document.form.model.value == '220' || document.form.cases.value == 'Indoor')chlist('list2', 0); else if (document.form.cases.value != 'Indoor' || document.form.model.value != '220')chlist('list2', 1);
	if (document.form.power.value != 'None')chlist('list1', 1); else chlist('list1', 0);
	if (document.form.cases.value != 'Indoor') {
		chlist('list4', 1);
		chlist('list6', 1);
	} else {
		chlist('list4', 0);
		chlist('list6', 0);
	}
	if (document.form.model.value == "230" && (document.form.cases.value == "None" || document.form.cases.value == "Outdoor" || document.form.cases.value == "Big Indoor case") && document.form.mslot.value == "None") {
		RB500_pos(0, 0);
		chlist('list12', 1);
		if (document.form.slot.value == "PCI riser card") {
			chlist('list13', 1);
			if (document.form.rcard.value == "\'RouterBOARD 14\' Four slot miniPCI - PCI adapter")chlist('list14', 1); else chlist('list14', 0);
		} else {
			chlist('list13', 0);
			if (document.form.rcard.value == "\'RouterBOARD 14\' Four slot miniPCI - PCI adapter")chlist('list14', 0);
		}
	} else if (document.form.model.value != "532") {
		RB500_pos(0, 1);
		chlist('list12', 0);
		chlist('list13', 0);
		chlist('list14', 0);
	} else {
		chlist('list6', 1);
		chlist('list4', 1);
		chlist('list12', 0);
		RB500_pos(1, 0);
	}
	if (document.form.model.value == "532" && document.form.cases_500.value == "Outdoor") {
		put_ros(1, 'list70');
		put_ros(0, 'list170');
	} else if (document.form.model.value == "532") {
		put_ros(0, 'list70');
		put_ros(1, 'list170');
	}
};
var radio = 0, showobj;
function put_ros(v, obj) {
	if (v == 0) {
		document.getElementById(obj).style.display = 'block';
		radio = 0;
	} else {
		document.getElementById(obj).style.display = 'none';
		radio = 1;
	}
};
function checkform(obj, param, text, key) {
	s = obj.value;
	l = s.length;
	dot = 0;
	at = 0;
	if (s == key) {
		alert('Incorrect' + text + '!');
		obj.focus();
		return false;
	} else if (l == 0 || s == "") {
		alert('Incorrect' + text + '!');
		obj.value = "";
		obj.focus();
		return false;
	} else if (s == '0') {
		alert('Invalid value, positive number required!');
		obj.value = "";
		obj.focus();
		return false;
	}
	;
	if (param == 'phone') {
		for (i = 0; i < l; ++i) {
			if ((s.charAt(i) > "9") || (s.charAt(i) < "0")) {
				alert('Incorrect value, number required!');
				obj.value = "";
				obj.focus();
				return false;
			}
			;
		}
	} else if (param == 'email') {
		for (i = 0; i < l; ++i) {
			if (s.charAt(i) == ".")dot = true; else if (s.charAt(i) == "@")at = true;
		}
		if (!dot || !at) {
			alert('Incorrect email!');
			obj.focus();
			return false;
		}
	}
	return true;
};
function ale(i) {
	if (i == 0)alert("Nothing to order!");
}
function deselect() {
	document.getElementById('selall').checked = false;
}
function ifs(p) {
	if (p != null)return 1; else return 0;
}
function selectall(mn) {
	for (i = 0; i < 50; i++)if (ifs(document.getElementById('rb' + i)))document.getElementById('rb' + i).checked = mn.checked;
}
function prices() {
	var item;
	if (document.form.units.value != "" && document.form.units.value != 0) {
		price = 0;
		price += md[document.form.model.selectedIndex];
		if (document.form.model.value != "532") {
			price += mz[document.form.memsize.selectedIndex];
			price += ps[document.form.power.selectedIndex];
			price += c[document.form.cases.selectedIndex];
		} else {
			if (document.form.cases_500.value == "Outdoor") {
				ps_500[1] = ps_500[2];
				item = document.form.power_500_.selectedIndex;
			} else item = document.form.power_500.selectedIndex;
			price += ps_500[item];
			price += c_500[document.form.cases_500.selectedIndex];
			price += mps[document.form.mslot1_500.selectedIndex];
			price += mps[document.form.mslot2_500.selectedIndex];
		}
		if (document.form.cases.value != 'Indoor' && document.form.model.value != "532")
			price += mps[document.form.mslot.selectedIndex];
		if (document.form.model.value != '220' && document.form.cases.value != 'Indoor' && document.form.model.value != "532") {
			price += pcm1[document.form.slot1.selectedIndex];
			price += pcm2[document.form.slot2.selectedIndex];
		}
		if (document.form.model.value == "230" && (document.form.cases.value == "None" || document.form.cases.value == "Outdoor" || document.form.cases.value == "Big Indoor case") && document.form.mslot.value == "None") {
			if (document.form.slot.value == "PCI riser card") {
				price += pcis[document.form.slot.selectedIndex];
				price += pcir[document.form.rcard.selectedIndex];
				if (document.form.rcard.value == "\'RouterBOARD 14\' Four slot miniPCI - PCI adapter") {
					price += minipci1[document.form.mpci1.selectedIndex];
					price += minipci2[document.form.mpci2.selectedIndex];
					price += minipci3[document.form.mpci3.selectedIndex];
					price += minipci4[document.form.mpci4.selectedIndex];
				}
			}
		}
		if (radio == 0 && document.form.model.value != "532") {
			price += ros[document.form.rsoft.selectedIndex];
			price += (document.form.rsoft.selectedIndex > 0 ? cflash : empty_cflash);
		} else price += ros_500[document.form.rsoft_500.selectedIndex];
		document.form.price.value = price + "$";
	} else document.form.units.value = 1;
}
function openNew(kods, sess, justCode) {
	var url = "popup.php?kods=" + kods + "&sess=" + sess;
	if (!justCode) {
		window.open(url, null, "height=600,width=850,status=yes,toolbar=no,menubar=no,location=no");
	}
	return url;
}
function getElementsByClassName(oElm, strTagName, strClassName) {
	var arrElements = (strTagName == "*" && oElm.all) ? oElm.all : oElm.getElementsByTagName(strTagName);
	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");
	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	var oElement;
	for (var i = 0; i < arrElements.length; i++) {
		oElement = arrElements[i];
		if (oRegExp.test(oElement.className)) {
			arrReturnElements.push(oElement);
		}
	}
	return(arrReturnElements)
}
function changeVisibility(classname) {
	var list = getElementsByClassName(document, "tr", classname);
	var elem;
	var display;
	for (elem in list) {
		if (list[elem].style.display != 'none') {
			display = 'none';
		} else {
			display = '';
		}
		list[elem].style.display = display;
	}
	var bild = document.getElementById('image_' + classname);
	if (bild.innerHTML.indexOf('Less') > 0) {
		bild.innerHTML = '<img src="/img/tabledown.png"/> More';
	} else {
		bild.innerHTML = '<img src="/img/tableup.png"/> Less';
	}
}
function setDisplayNone(classname) {
	var list = getElementsByClassName(document, "tr", classname);
	var elem;
	for (elem in list) {
		list[elem].style.display = 'none';
	}
}
function checkSmall(formname) {
	eval("document." + formname + ".submit();");
}
function getCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ')c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0)return c.substring(nameEQ.length, c.length);
	}
	return null;
}
/*
 function setCompareImages(){for(i=0;i<3;i++){$('.compare_img').attr("style","");}
 //for(var i=0;i<=2;i++){document.getElementById('compare_img'+i).innerHTML='';}
 if(compared_images<1){document.getElementById('compare_box').style.display='none';}else{document.getElementById('compare_box').style.display='block';}
 if(compared_images>=3){var all_compare_icons=getElementsByClassName('compare_icon');if(all_compare_icons){for(j=0;j<=all_compare_icons.length;j++){if(all_compare_icons[j]){all_compare_icons[j].src='/img/icons/balance-plus-grey.png';}}}}else{var all_compare_icons=getElementsByClassName('compare_icon');if(all_compare_icons){for(j=0;j<=all_compare_icons.length;j++){if(all_compare_icons[j]){all_compare_icons[j].src='/img/icons/balance-plus.png';}}}}
 var cookie=getCookie('compare_products');if(cookie){var compared=cookie.split('||||');var image_index=0;for(var i=0;i<=compared.length;i++){if(compared[i]&&compared[i]!=''){var compare_details=compared[i].split('|||');if(compare_details){var compare_icon=document.getElementById('compare_icon_'+compare_details[0]);if(compare_icon){compare_icon.src='/img/icons/balance-plus-grey.png';compare_icon.onclick='';}
 var image_tag='<img title=\"'+compare_details[1]+'\" src=\"'+compare_details[2]+'_s.png\">\n';var delete_ico_tag='<a href=\"#\" id=\"delete_compare\" onclick=\"deleteCompareCookie(\''+compared[i]+'\')\"><img id=\"delete_compare_img\" src=\"/img/icons/cross-small.png\"></a>\n';document.getElementById('compare_img'+image_index).innerHTML=image_tag+delete_ico_tag;image_index+=1;}}}}}
 */
var ico_norm = 'http://img.routerboard.com/ico/balance-plus.png';
var ico_gray = BASE_URL + 'assets/img/balance-plus-gray.png';
var ico_del = 'http://img.routerboard.com/ico/cross-small.png';
function getElementsByClassName(classname, node) {
	if (!node) {
		node = document.getElementsByTagName("body")[0];
	}
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for (var i = 0, j = els.length; i < j; i++) {
		if (re.test(els[i].className)) {
			a.push(els[i]);
		}
	}
	return a;
}
function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g, "");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/, "");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/, "");
}
function checkCompare() {
	cookie = $.cookie('compareProducts');
	if (cookie && cookie != "") {
		return true;
	} else {
		nothingToCompare();
		return false;
	}
}
function setCompareProduct(id) {
	$('#compare_box').show();
	cmp_img = $("#pbox_img_" + id).attr("style");
	cmp_img = cmp_img.replace('no-repeat', 'no-repeat 40% 0');
	prod_name = $("#pname_" + id).html();
	del_ico = '<img onclick="deleteCompareProduct(' + id + ')" id="delete_ico_' + id + '" src="' + ico_del + '" style="cursor:pointer">';
	$('.compare_img').each(function () {
		if ($(this).attr('style') == cmp_img) {
			return false;
		}
	});
	tmp = "";
	cookie = $.cookie('compareProducts');
	if (cookie) {
		cookie = cookie.split('||||')
	}
	for (i = 0; i < 3; i++) {
		if (!$('.compare_img:eq(' + i + ')').attr("style") && cmp_img != "") {
			$('.compare_img:eq(' + i + ')').attr({style: cmp_img, id: "compare_img_" + id, title: prod_name});
			$('#box_' + id + ' .compare_icon').attr('src', ico_gray);
			$('.compare_img:eq(' + i + ')').after(del_ico);
			cmp_img = "";
			if (tmp == "") {
				tmp = id;
			} else {
				tmp = tmp + '||||' + id;
			}
		} else {
			if (cookie && cookie[i]) {
				if (tmp == "") {
					tmp = cookie[i];
				} else {
					tmp = tmp + '||||' + cookie[i];
				}
			}
		}
	}
	if (tmp != "") {
		$.cookie('compareProducts', tmp);
	}
}
function deleteCompareProduct(id) {
	$('#delete_ico_' + id).remove();
	$('#compare_img_' + id).removeAttr("style");
	$('#compare_img_' + id).removeAttr("title");
	$('#compare_img_' + id).removeAttr("id");
	$('#comp_balance_ico_' + id).attr('src', ico_norm);
	cookie = $.cookie('compareProducts');
	if (cookie) {
		cookie = cookie.split('||||');
		tmp = "";
		$(cookie).each(function (index) {
			if (cookie[index] == id) {
				delete cookie[index];
			} else {
				if (cookie[index]) {
					tmp = tmp + '||||' + cookie[index]
				}
			}
		});
		$.cookie('compareProducts', tmp);
	}
}
function nothingToCompare() {
	$('#compare_error').html('Nothing to compare! Please, select at least one product.');
	$('#compare_error').show('fast', function () {
		setTimeout("$('#compare_error').hide('fast')", 5000)
	});
}
var range_filters = new Array();
range_filters.push('price');
var checkbox_filters = new Array();
var radio_button_filters = new Array();
range_filters.push('CPU_speed');
range_filters.push('RAM');
range_filters.push('MiniPCI');
range_filters.push('LAN_ports');
range_filters.push('SFP_ports');
range_filters.push('RouterOS_License');
checkbox_filters.push('USB');
checkbox_filters.push('Memory_Cards');
checkbox_filters.push('Integrated_Wireless');
checkbox_filters.push('Gigabit');
checkbox_filters.push('Voltage_Monitor');
checkbox_filters.push('Temperature_sensor');
radio_button_filters['Color'] = new Array();
radio_button_filters['Color'].push('White');
radio_button_filters['Color'].push('Black');
radio_button_filters['Color'].push('Aluminium');
radio_button_filters['Material'] = new Array();
radio_button_filters['Material'].push('Plastic');
radio_button_filters['Material'].push('Metal');
radio_button_filters['Material'].push('Aluminium');
radio_button_filters['Purpose'] = new Array();
radio_button_filters['Purpose'].push('Indoor');
radio_button_filters['Purpose'].push('Outdoor');
range_filters.push('Output_power');
checkbox_filters.push('802.11a');
checkbox_filters.push('802.11b');
checkbox_filters.push('802.11g');
checkbox_filters.push('802.11n');
checkbox_filters.push('2GHz');
checkbox_filters.push('5GHz');
radio_button_filters['Connector'] = new Array();
radio_button_filters['Connector'].push('uFl;UFL');
radio_button_filters['Connector'].push('MMCX');
radio_button_filters['Format'] = new Array();
radio_button_filters['Format'].push('PCI');
radio_button_filters['Format'].push('PCIe;PCI-express');
radio_button_filters['Format'].push('miniPCI');
radio_button_filters['Format'].push('miniPCI-e');
function sliderTemplate(idElem, tMin, tMax, idHolder, prfx, sufx) {
	$(idElem).slider({range: true, min: tMin, max: tMax, values: [tMin, tMax], slide: function (event, ui) {
		$(idHolder).val('' + prfx + ui.values[0] + ' - ' + prfx + ui.values[1] + sufx);
	}, stop                : function (event, ui) {
		applyFilters();
	}});
	$(idHolder).val('' + prfx + $(idElem).slider("values", 0) + ' - ' + prfx + $(idElem).slider("values", 1) + sufx);
}
function setSlider() {
	sliderTemplate("#slider-range_price", 0, 995.00, "#amount_price", '$', '');
	sliderTemplate("#slider-range_CPU_speed", 0, $("#maxCPU").val(), '#amount_CPU_speed', '', ' Mhz');
	sliderTemplate("#slider-range_RAM", 0, $("#maxRAM").val(), '#amount_RAM', '', ' MB');
	sliderTemplate("#slider-range_MiniPCI", 0, $("#miniPCI").val(), '#amount_MiniPCI', '', '');
	sliderTemplate("#slider-range_LAN_ports", 0, $("#maxLAN").val(), '#amount_LAN_ports', '', '');
	sliderTemplate("#slider-range_RouterOS_License", 0, $("#maxLIC").val(), '#amount_RouterOS_License', '', '');
	sliderTemplate("#slider-range_SFP_ports", 0, $("#maxSFP").val(), '#amount_SFP_ports', '', '');
	sliderTemplate("#slider-range_Output_power", 0, $("#outputPower").val(), '#amount_Output_power', '', ' dBm');
}
var animation = 'on';
function countElements(obj) {
	var prop;
	var propCount = 0;
	for (prop in obj) {
		propCount++;
	}
	return propCount
}

/* filters.js */
function hideBox(id) {
	if ($('#box_' + id).html() != null) {
		$('#box_' + id).addClass('hideBox');
		$('#box_' + id).removeClass('showBox');
	}
	var this_box_group_id = parameters_array_sorted['group_id'][id];
	if ($('.hideBox.group_class_' + this_box_group_id).length == $('.group_class_' + this_box_group_id).length) {
		$('#group_' + this_box_group_id).hide("slow");
		$('#description_group_' + this_box_group_id).hide("slow");
	}
	return;
}
function showBox(id) {
	if ($('#box_' + id).html() != null) {
		$('#box_' + id).addClass('showBox');
		$('#box_' + id).removeClass('hideBox');
	}
	var this_box_group_id = parameters_array_sorted['group_id'][id];
	if ($('.hideBox.group_class_' + this_box_group_id).length > 0) {
		$('#group_' + this_box_group_id).show("slow");
		$('#description_group_' + this_box_group_id).show("slow");
	}
	return;
}
function applyFilters() {
	var id_array_show = new Array();
	var id_array_hide = new Array()
	for (i in range_filters) {
		var param = range_filters[i];
		if (document.getElementById("slider-range_" + param)) {
			minval = $("#slider-range_" + param).slider("values", 0);
			maxval = $("#slider-range_" + param).slider("values", 1);
			if (parameters_array_sorted[range_filters[i]]) {
				var param_val = parameters_array_sorted[range_filters[i]];
				dis = true;
				for (id in parameters_array_sorted['id']) {
					if (param_val[id]) {
						param_value = param_val[id].match(/\d+/g);
						param_value2 = param_value;
					} else {
						param_value = $("#slider-range_" + param).slider('option', 'min');
						param_value2 = $("#slider-range_" + param).slider('option', 'max');
					}
					if (param_value) {
						if (param_value[0]) {
							param_value = param_value[0];
						}
					}
					if (dis) {
						dis = false;
					}
					if ((Math.floor(param_value) < Math.floor(minval) || Math.floor(param_value) > Math.floor(maxval)) || (Math.floor(param_value2) < Math.floor(minval) || Math.floor(param_value2) > Math.floor(maxval))) {
						hideBox(id);
						id_array_hide[id] = id;
					} else {
						id_array_show[id] = id;
					}
				}
			}
		}
	}
	for (k in checkbox_filters) {
		var param = checkbox_filters[k];
		var curr_checkbox = document.getElementById('checkbox_' + param);
		if (curr_checkbox && parameters_array_sorted[param]) {
			if (curr_checkbox.checked) {
				var param_val = parameters_array_sorted[param]
				for (id in parameters_array_sorted['id']) {
					if (parameters_array_sorted[param][id]) {
						param_value = parameters_array_sorted[checkbox_filters[k]][id];
						if (param_value == 'yes' || param_value == 'YES' || param_value == 'y' || param_value == 'Yes' || param_value == 'Y') {
							param_value = '1';
						} else {
							param_value = param_value.match(/\d+/g);
						}
						if (!param_value)param_value = '';
						if (param_value[0])param_value = param_value[0];
						if (Math.floor(param_value) == Math.floor('0') || Math.floor(param_value) == Math.floor('')) {
							hideBox(id);
							id_array_hide[id] = id;
						} else {
							id_array_show[id] = id;
						}
					} else {
						hideBox(id);
						id_array_hide[id] = id;
					}
				}
			} else {
			}
		}
	}
	for (param in radio_button_filters) {
		if (parameters_array_sorted[param]) {
			var show_all = false;
			if (document.getElementById('radio_all_' + param).checked == true) {
				show_all = true;
			}
			for (r in radio_button_filters[param]) {
				var curr_value = radio_button_filters[param][r];
				if (typeof(curr_value.split) == 'function') {
					curr_value_arr = curr_value.split(';');
					for (var i = 0; i < curr_value_arr.length; i++) {
						var this_radio = document.getElementById('radio_' + param + '_' + curr_value_arr[i]);
						if (this_radio) {
							var curr_radio = this_radio;
						}
					}
					if (curr_radio) {
						if (curr_radio.checked) {
							for (id in parameters_array_sorted['id']) {
								if (show_all) {
									id_array_show[id] = id;
								} else {
									if (parameters_array_sorted[param][id]) {
										if (curr_radio.checked) {
											var something_to_show = false;
											for (var i = 0; i < curr_value_arr.length; i++) {
												var curr_value = curr_value_arr[i];
												if (parameters_array_sorted[param][id] == curr_value) {
													id_array_show[id] = id;
													something_to_show = true;
												}
											}
											if (!something_to_show) {
												hideBox(id);
												id_array_hide[id] = id;
											}
										}
									} else {
										hideBox(id);
										id_array_hide[id] = id;
									}
								}
							}
						}
					} else {
					}
				}
			}
		}
	}
	for (j in id_array_show) {
		if (!id_array_hide[j]) {
			showBox(j);
		}
	}
	fT = 1000;
	if (animation == 'on') {
		$('.hideBox').hide(fT);
		$('.showBox').show(fT);
	} else {
		$('.hideBox').css("display", "none");
		$('.showBox').css("display", "")
	}
}
$(function () {
	if ($("input")) {
		$("input").checkBox();
	}
});
(function ($) {
	$.bind = function (object, method) {
		var args = Array.prototype.slice.call(arguments, 2);
		if (args.length) {
			return function () {
				var args2 = [this].concat(args, $.makeArray(arguments));
				return method.apply(object, args2);
			};
		} else {
			return function () {
				var args2 = [this].concat($.makeArray(arguments));
				return method.apply(object, args2);
			};
		}
	};
})(jQuery);
(function ($) {
	$.widget('ui.checkBox', {_init: function () {
		var that = this, opts = this.options, toggleHover = function (e) {
			if (this.disabledStatus) {
				return false;
			}
			that.hover = (e.type == 'focus' || e.type == 'mouseenter');
			that._changeStateClassChain();
		};
		if (!this.element.is(':radio,:checkbox')) {
			return false;
		}
		this.labels = $([]);
		this.checkedStatus = false;
		this.disabledStatus = false;
		this.hoverStatus = false;
		this.radio = (this.element.is(':radio'));
		this.visualElement = $('<span />').addClass(this.radio ? 'ui-radio' : 'ui-checkbox').bind('mouseenter.checkBox mouseleave.checkBox', toggleHover).bind('click.checkBox', function (e) {
			that.element[0].click();
			return false;
		});
		if (opts.replaceInput) {
			this.element.addClass('ui-helper-hidden-accessible').after(this.visualElement[0]).bind('usermode', function (e) {
				(e.enabled && that.destroy.call(that, true));
			});
		}
		this.element.bind('click.checkBox', $.bind(this, this.reflectUI)).bind('focus.checkBox blur.checkBox', toggleHover);
		if (opts.addLabel) {
			this.labels = $('label[for=' + this.element.attr('id') + ']').bind('mouseenter.checkBox mouseleave.checkBox', toggleHover);
		}
		this.reflectUI({type: 'initialReflect'});
	}, _changeStateClassChain     : function () {
		var stateClass = (this.checkedStatus) ? '-checked' : '', baseClass = 'ui-' + ((this.radio) ? 'radio' : 'checkbox') + '-state';
		stateClass += (this.disabledStatus) ? '-disabled' : '';
		stateClass += (this.hover) ? '-hover' : '';
		if (stateClass) {
			stateClass = baseClass + stateClass;
		}
		function switchStateClass() {
			var classes = this.className.split(' '), found = false;
			$.each(classes, function (i, classN) {
				if (classN.indexOf(baseClass) === 0) {
					found = true;
					classes[i] = stateClass;
					return false;
				}
			});
			if (!found) {
				classes.push(stateClass);
			}
			this.className = classes.join(' ');
		}

		if (this.labels) {
			this.labels.each(switchStateClass);
		}
		if (this.visualElement) {
			this.visualElement.each(switchStateClass);
		}
	}, destroy                    : function (onlyCss) {
		this.element.removeClass('ui-helper-hidden-accessible');
		this.visualElement.addClass('ui-helper-hidden');
		if (!onlyCss) {
			var o = this.options;
			this.element.unbind('.checkBox');
			this.visualElement.remove();
			this.labels.unbind('.checkBox').removeClass('ui-state-hover ui-state-checked ui-state-disabled');
		}
	}, disable                    : function () {
		this.element[0].disabled = true;
		this.reflectUI({type: 'manuallyDisabled'});
	}, enable                     : function () {
		this.element[0].disabled = false;
		this.reflectUI({type: 'manuallyenabled'});
	}, toggle                     : function (e) {
		this.changeCheckStatus((this.element.is(':checked')) ? false : true, e);
	}, changeCheckStatus          : function (status, e) {
		if (e && e.type == 'click' && this.element[0].disabled) {
			return false;
		}
		this.element.attr({'checked': status});
		this.reflectUI(e || {type: 'changeCheckStatus'});
	}, propagate                  : function (n, e, _noGroupReflect) {
		if (!e || e.type != 'initialReflect') {
			if (this.radio && !_noGroupReflect) {
				$(document.getElementsByName(this.element.attr('name'))).checkBox('reflectUI', e, true);
			}
			return this._trigger(n, e, {options: this.options, checked: this.checkedStatus, labels: this.labels, disabled: this.disabledStatus});
		}
	}, reflectUI                  : function (elm, e) {
		var oldChecked = this.checkedStatus, oldDisabledStatus = this.disabledStatus;
		e = e || elm;
		this.disabledStatus = this.element.is(':disabled');
		this.checkedStatus = this.element.is(':checked');
		if (this.disabledStatus != oldDisabledStatus || this.checkedStatus !== oldChecked) {
			this._changeStateClassChain();
			(this.disabledStatus != oldDisabledStatus && this.propagate('disabledChange', e));
			(this.checkedStatus !== oldChecked && this.propagate('change', e));
		}
	}});
	$.ui.checkBox.defaults = {replaceInput: true, addLabel: true};
})(jQuery);
var delayLength = 10000;
function doMove(panelWidth, tooFar) {
	var leftValue = $("#mover").css("left");
	if (leftValue == "auto") {
		leftValue = 0;
	}
	;
	var movement = parseFloat(leftValue, 10) - panelWidth;
	if (movement == tooFar) {
		$(".slide img").animate({"margin-top": "0px"}, function () {
			$("#mover").animate({"left": 0}, function () {
				$(".slide img").animate({"margin-top": "0px"});
			});
		});
	}
	else {
		$(".slide img").animate({"margin-top": "0px"}, function () {
			$("#mover").animate({"left": movement}, function () {
				$(".slide img").animate({"margin-top": "0px"});
			});
		});
	}
}
$(document).ready(function () {
	var $slide1 = $("#slide_1");
	if (!$slide1) {
		alert(1);
	} else {
		var panelWidth = $slide1.css("width");
		var panelPaddingLeft = $slide1.css("paddingLeft");
		var panelPaddingRight = $slide1.css("paddingRight");
		panelWidth = parseFloat(panelWidth, 10);
		panelPaddingLeft = parseFloat(panelPaddingLeft, 10);
		panelPaddingRight = parseFloat(panelPaddingRight, 10);
		panelWidth = panelWidth + panelPaddingLeft + panelPaddingRight;
		var numPanels = $(".slide").length;
		var tooFar = -(panelWidth * numPanels);
		var totalMoverwidth = numPanels * panelWidth;
		$("#mover").css("width", totalMoverwidth);
		sliderIntervalID = setInterval(function () {
			doMove(panelWidth, tooFar);
		}, delayLength);
		$("#slider-stopper").click(function () {
			if ($(this).text() == "Stop") {
				clearInterval(sliderIntervalID);
				$(this).text("Start");
			}
			else {
				sliderIntervalID = setInterval(function () {
					doMove(panelWidth, tooFar);
				}, delayLength);
				$(this).text("Stop");
			}
		});
	}
});
jQuery.cookie = function (name, value, options) {
	if (typeof value != 'undefined') {
		options = options || {};
		if (value === null) {
			value = '';
			options.expires = -1;
		}
		var expires = '';
		if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
			var date;
			if (typeof options.expires == 'number') {
				date = new Date();
				date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
			} else {
				date = options.expires;
			}
			expires = '; expires=' + date.toUTCString();
		}
		var path = options.path ? '; path=' + (options.path) : '';
		var domain = options.domain ? '; domain=' + (options.domain) : '';
		var secure = options.secure ? '; secure' : '';
		document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	} else {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = jQuery.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
};

/*anythingslider*/
(function (d) {
	d.anythingSlider = function (h, i) {
		var a = this, b;
		a.el = h;
		a.$el = d(h).addClass("anythingBase").wrap('<div class="anythingSlider"><div class="anythingWindow" /></div>');
		a.$el.data("AnythingSlider", a);
		a.init = function () {
			a.options = b = d.extend({}, d.anythingSlider.defaults, i);
			a.initialized = false;
			d.isFunction(b.onBeforeInitialize) && a.$el.bind("before_initialize", b.onBeforeInitialize);
			a.$el.trigger("before_initialize", a);
			a.$wrapper = a.$el.parent().closest("div.anythingSlider").addClass("anythingSlider-" + b.theme);
			a.$window = a.$el.closest("div.anythingWindow");
			a.win = window;
			a.$win = d(a.win);
			a.$controls = d('<div class="anythingControls"></div>').appendTo(b.appendControlsTo !== null && d(b.appendControlsTo).length ? d(b.appendControlsTo) : a.$wrapper);
			a.$startStop = d('<a href="#" class="start-stop"></a>');
			b.buildStartStop && a.$startStop.appendTo(b.appendStartStopTo !== null && d(b.appendStartStopTo).length ? d(b.appendStartStopTo) : a.$controls);
			a.$nav = d('<ul class="thumbNav" />').appendTo(b.appendNavigationTo !== null && d(b.appendNavigationTo).length ? d(b.appendNavigationTo) : a.$controls);
			a.flag = false;
			a.playing = b.autoPlay;
			a.slideshow = false;
			a.hovered = false;
			a.panelSize = [];
			a.currentPage = b.startPanel = parseInt(b.startPanel, 10) || 1;
			b.changeBy = parseInt(b.changeBy, 10) || 1;
			a.adj = b.infiniteSlides ? 0 : 1;
			a.width = a.$el.width();
			a.height = a.$el.height();
			a.outerPad = [a.$wrapper.innerWidth() - a.$wrapper.width(), a.$wrapper.innerHeight() - a.$wrapper.height()];
			b.playRtl && a.$wrapper.addClass("rtl");
			if (b.expand)a.$outer = a.$wrapper.parent(), a.$window.css({width: "100%", height: "100%"}), a.checkResize();
			b.buildStartStop && a.buildAutoPlay();
			b.buildArrows && a.buildNextBackButtons();
			if (!b.autoPlay)b.autoPlayLocked = false;
			a.updateSlider();
			a.$lastPage = a.$currentPage;
			a.runTimes = d("div.anythingSlider").index(a.$wrapper) + 1;
			a.regex = RegExp("panel" + a.runTimes + "-(\\d+)", "i");
			a.runTimes === 1 && a.makeActive();
			if (!d.isFunction(d.easing[b.easing]))b.easing = "swing";
			b.pauseOnHover && a.$wrapper.hover(function () {
				a.playing && (a.$el.trigger("slideshow_paused", a), a.clearTimer(true))
			}, function () {
				a.playing && (a.$el.trigger("slideshow_unpaused", a), a.startStop(a.playing, true))
			});
			a.setCurrentPage(a.gotoHash() || b.startPage, false);
			a.slideControls(false);
			a.$wrapper.bind("mouseenter mouseleave", function (b) {
				a.hovered = b.type === "mouseenter" ? true : false;
				a.slideControls(a.hovered, false)
			});
			d(document).keyup(function (c) {
				if (b.enableKeyboard && a.$wrapper.is(".activeSlider") && !c.target.tagName.match("TEXTAREA|INPUT|SELECT") && (b.vertical || !(c.which === 38 || c.which === 40)))switch (c.which) {
					case 39:
					case 40:
						a.goForward();
						break;
					case 37:
					case 38:
						a.goBack()
				}
			});
			a.$items.delegate("a", "focus.AnythingSlider", function (c) {
				var e = d(this).closest(".panel"), e = a.$items.index(e) + a.adj;
				a.$items.find(".focusedLink").removeClass("focusedLink");
				d(this).addClass("focusedLink");
				a.$window.scrollLeft(0);
				if (e >= a.currentPage + b.showMultiple || e < a.currentPage)a.gotoPage(e), c.preventDefault()
			});
			var c = "slideshow_paused slideshow_unpaused slide_init slide_begin slideshow_stop slideshow_start initialized swf_completed".split(" ");
			d.each("onShowPause onShowUnpause onSlideInit onSlideBegin onShowStop onShowStart onInitialized onSWFComplete".split(" "), function (f, e) {
				d.isFunction(b[e]) && a.$el.bind(c[f], b[e])
			});
			d.isFunction(b.onSlideComplete) && a.$el.bind("slide_complete", function () {
				setTimeout(function () {
					b.onSlideComplete(a)
				}, 0)
			});
			a.initialized = true;
			a.$el.trigger("initialized", a);
			a.startStop(a.playing)
		};
		a.updateSlider = function () {
			a.$el.children(".cloned").remove();
			a.$nav.empty();
			a.currentPage = a.currentPage || 1;
			a.$items = a.$el.children();
			a.pages = a.$items.length;
			a.dir = b.vertical ? "top" : "left";
			b.showMultiple = b.vertical ? 1 : parseInt(b.showMultiple, 10) || 1;
			if (b.showMultiple > 1) {
				if (b.showMultiple > a.pages)b.showMultiple = a.pages;
				a.adjustMultiple = b.infiniteSlides && a.pages > 1 ? 0 : b.showMultiple - 1;
				a.pages = a.$items.length - a.adjustMultiple
			}
			a.$controls.add(a.$nav).add(a.$startStop).add(a.$forward).add(a.$back)[a.pages <= 1 ? "hide" : "show"]();
			a.pages > 1 && a.buildNavigation();
			b.infiniteSlides && a.pages > 1 && (a.$el.prepend(a.$items.filter(":last").clone().removeAttr("id").addClass("cloned")), b.showMultiple > 1 ? a.$el.append(a.$items.filter(":lt(" + b.showMultiple + ")").clone().removeAttr("id").addClass("cloned").addClass("multiple")) : a.$el.append(a.$items.filter(":first").clone().removeAttr("id").addClass("cloned")), a.$el.find(".cloned").each(function () {
				d(this).find("a,input,textarea,select,button,area").attr("disabled", "disabled");
				d(this).find("[id]").removeAttr("id")
			}));
			a.$items = a.$el.children().addClass("panel" + (b.vertical ? " vertical" : ""));
			a.setDimensions();
			b.resizeContents ? (a.$items.css("width", a.width), a.$wrapper.css("width", a.getDim(a.currentPage)[0]), a.$wrapper.add(a.$items).css("height", a.height)) : a.$win.load(function () {
				a.setDimensions()
			});
			if (a.currentPage > a.pages)a.currentPage = a.pages;
			a.setCurrentPage(a.currentPage, false);
			a.$nav.find("a").eq(a.currentPage - 1).addClass("cur")
		};
		a.buildNavigation = function () {
			if (b.buildNavigation && a.pages > 1) {
				var c, f;
				a.$items.filter(":not(.cloned)").each(function (e) {
					var g = e + 1;
					c = (g === 1 ? "first" : "") + (g === a.pages ? "last" : "");
					f = d('<a href="#"></a>').addClass("panel" + g).wrap('<li class="' + c + '" />');
					a.$nav.append(f.parent());
					d.isFunction(b.navigationFormatter) ? (c = b.navigationFormatter(g, d(this)), f.html("<span>" + c + "</span>"), parseInt(f.find("span").css("text-indent"), 10) < 0 && f.addClass(b.tooltipClass).attr("title", c)) : f.html("<span>" + g + "</span>");
					f.bind(b.clickControls, function (c) {
						if (!a.flag && b.enableNavigation)a.flag = true, setTimeout(function () {
							a.flag = false
						}, 100), a.gotoPage(g), b.hashTags && a.setHash(g);
						c.preventDefault()
					})
				});
				if (b.navigationSize !== false && parseInt(b.navigationSize, 10) < a.pages)a.$controls.find(".anythingNavWindow").length || a.$nav.before('<ul><li class="prev"><a href="#"><span>' + b.backText + "</span></a></li></ul>").after('<ul><li class="next"><a href="#"><span>' + b.forwardText + "</span></a></li></ul>").wrap('<div class="anythingNavWindow"></div>'), a.navWidths = a.$nav.find("li").map(function () {
					return d(this).innerWidth() + Math.ceil(parseInt(d(this).find("span").css("left"), 10) / 2 || 0)
				}).get(), a.navLeft = 1, a.$nav.width(a.navWidth(1, a.pages + 1) + 5), a.$controls.find(".anythingNavWindow").width(a.navWidth(1, b.navigationSize + 1)).end().find(".prev,.next").bind(b.clickControls, function (c) {
					if (!a.flag)a.flag = true, setTimeout(function () {
						a.flag = false
					}, 200), a.navWindow(a.navLeft + b.navigationSize * (d(this).is(".prev") ? -1 : 1));
					c.preventDefault()
				})
			}
		};
		a.navWidth = function (b, f) {
			var d;
			d = Math.min(b, f);
			for (var g = Math.max(b, f), j = 0; d < g; d++)j += a.navWidths[d - 1] || 0;
			return j
		};
		a.navWindow = function (c) {
			var d = a.pages - b.navigationSize + 1, c = c <= 1 ? 1 : c > 1 && c < d ? c : d;
			if (c !== a.navLeft)a.$controls.find(".anythingNavWindow").animate({scrollLeft: a.navWidth(1, c), width: a.navWidth(c, c + b.navigationSize)}, {queue: false, duration: b.animationTime}), a.navLeft = c
		};
		a.buildNextBackButtons = function () {
			a.$forward = d('<span class="arrow forward"><a href="#"><span>' + b.forwardText + "</span></a></span>");
			a.$back = d('<span class="arrow back"><a href="#"><span>' + b.backText + "</span></a></span>");
			a.$back.bind(b.clickBackArrow, function (c) {
				if (b.enableArrows && !a.flag)a.flag = true, setTimeout(function () {
					a.flag = false
				}, 100), a.goBack();
				c.preventDefault()
			});
			a.$forward.bind(b.clickForwardArrow, function (c) {
				if (b.enableArrows && !a.flag)a.flag = true, setTimeout(function () {
					a.flag = false
				}, 100), a.goForward();
				c.preventDefault()
			});
			a.$back.add(a.$forward).find("a").bind("focusin focusout", function () {
				d(this).toggleClass("hover")
			});
			a.$back.appendTo(b.appendBackTo !== null && d(b.appendBackTo).length ? d(b.appendBackTo) : a.$wrapper);
			a.$forward.appendTo(b.appendForwardTo !== null && d(b.appendForwardTo).length ? d(b.appendForwardTo) : a.$wrapper);
			a.$arrowWidth = a.$forward.width()
		};
		a.buildAutoPlay = function () {
			a.$startStop.html("<span>" + (a.playing ? b.stopText : b.startText) + "</span>").bind(b.clickSlideshow,function (c) {
				b.enableStartStop && (a.startStop(!a.playing), a.makeActive(), a.playing && !b.autoPlayDelayed && a.goForward(true));
				c.preventDefault()
			}).bind("focusin focusout", function () {
				d(this).toggleClass("hover")
			})
		};
		a.checkResize = function (c) {
			clearTimeout(a.resizeTimer);
			a.resizeTimer = setTimeout(function () {
				var d = a.$outer.width() - a.outerPad[0], e = (a.$outer[0].tagName === "BODY" ? a.$win.height() : a.$outer.height()) - a.outerPad[1];
				if (a.width * b.showMultiple !== d || a.height !== e)a.setDimensions(), a.gotoPage(a.currentPage, a.playing, null, -1);
				typeof c === "undefined" && a.checkResize()
			}, 500)
		};
		a.setDimensions = function () {
			var c, f, e, g = 0, j = {width: "100%", height: "100%"}, h = b.showMultiple > 1 ? a.width || a.$window.width() / b.showMultiple : a.$window.width(), i = a.$win.width();
			if (b.expand)c = a.$outer.width() - a.outerPad[0], a.height = f = a.$outer.height() - a.outerPad[1], a.$wrapper.add(a.$window).add(a.$items).css({width: c, height: f}), a.width = h = b.showMultiple > 1 ? c / b.showMultiple : c;
			a.$items.each(function (k) {
				e = d(this).children();
				if (b.resizeContents)c = a.width, f = a.height, d(this).css({width: c, height: f}), e.length && e[0].tagName === "EMBED" && e.attr(j), e[0].tagName === "OBJECT" && e.find("embed").attr(j), e.length === 1 && e.css(j); else {
					c = d(this).width() || a.width;
					e.length === 1 && c >= i && (c = e.width() >= i ? h : e.width(), e.css("max-width", c));
					d(this).css("width", c);
					f = e.length === 1 ? e.outerHeight(true) : d(this).height();
					if (f <= a.outerPad)f = a.height;
					d(this).css("height", f)
				}
				a.panelSize[k] = [c, f, g];
				g += b.vertical ? f : c
			});
			a.$el.css(b.vertical ? "height" : "width", g)
		};
		a.getDim = function (c) {
			if (a.pages < 1 || isNaN(c))return[a.width, a.height];
			var c = b.infiniteSlides && a.pages > 1 ? c : c - 1, d, e = a.panelSize[c][0], g = a.panelSize[c][1];
			if (b.showMultiple > 1)for (d = 1; d < b.showMultiple; d++)e += a.panelSize[(c + d) % b.showMultiple][0], g = Math.max(g, a.panelSize[c + d][1]);
			return[e, g]
		};
		a.goForward = function (c) {
			a.gotoPage(a.currentPage + b.changeBy * (b.playRtl ? -1 : 1), c)
		};
		a.goBack = function (c) {
			a.gotoPage(a.currentPage + b.changeBy * (b.playRtl ? 1 : -1), c)
		};
		a.gotoPage = function (c, f, e, g) {
			f !== true && (f = false, a.startStop(false), a.makeActive());
			/^[#|.]/.test(c) && d(c).length && (c = d(c).closest(".panel").index() + a.adj);
			b.changeBy !== 1 && (c < 0 && (c += a.pages), c > a.pages && (c -= a.pages));
			if (!(a.pages <= 1)) {
				a.$lastPage = a.$currentPage;
				if (typeof c !== "number")c = b.startPanel, a.setCurrentPage(c);
				if (!f || !b.isVideoPlaying(a))c > a.pages + 1 - a.adj && (c = !b.infiniteSlides && !b.stopAtEnd ? 1 : a.pages), c < a.adj && (c = !b.infiniteSlides && !b.stopAtEnd ? a.pages : 1), a.currentPage = c > a.pages ? a.pages : c < 1 ? 1 : a.currentPage, a.$currentPage = a.$items.eq(a.currentPage - a.adj), a.exactPage = c, a.targetPage = c === 0 ? a.pages - a.adj : c > a.pages ? 1 - a.adj : c - a.adj, a.$targetPage = a.$items.eq(a.targetPage), g = g || b.animationTime, g >= 0 && a.$el.trigger("slide_init", a), a.slideControls(true, false), f !== true && (f = false), (!f || b.stopAtEnd && c === a.pages) && a.startStop(false), g >= 0 && a.$el.trigger("slide_begin", a), setTimeout(function (d) {
					b.resizeContents || (d = a.getDim(c), a.$wrapper.filter(":not(:animated)").animate({width: d[0] || a.width, height: d[1] || a.height}, {queue: false, duration: g < 0 ? 0 : g, easing: b.easing}));
					d = {};
					d[a.dir] = -a.panelSize[b.infiniteSlides && a.pages > 1 ? c : c - 1][2];
					a.$el.filter(":not(:animated)").animate(d, {queue: false, duration: g, easing: b.easing, complete: function () {
						a.endAnimation(c, e, g)
					}})
				}, parseInt(b.delayBeforeAnimate, 10) || 0)
			}
		};
		a.endAnimation = function (c, d, e) {
			c === 0 ? (a.$el.css(a.dir, -a.panelSize[a.pages][2]), c = a.pages) : c > a.pages && (a.$el.css(a.dir, -a.panelSize[1][2]), c = 1);
			a.exactPage = c;
			a.setCurrentPage(c, false);
			a.$items.removeClass("activePage").eq(c - a.adj).addClass("activePage");
			a.hovered || a.slideControls(false);
			e >= 0 && a.$el.trigger("slide_complete", a);
			typeof d === "function" && d(a);
			b.autoPlayLocked && !a.playing && setTimeout(function () {
				a.startStop(true)
			}, b.resumeDelay - (b.autoPlayDelayed ? b.delay : 0))
		};
		a.setCurrentPage = function (c, d) {
			c = parseInt(c, 10);
			if (!(a.pages < 1 || c === 0 || isNaN(c))) {
				c > a.pages + 1 - a.adj && (c = a.pages - a.adj);
				c < a.adj && (c = 1);
				b.buildNavigation && a.$nav.find(".cur").removeClass("cur").end().find("a").eq(c - 1).addClass("cur");
				!b.infiniteSlides && b.stopAtEnd && (a.$wrapper.find("span.forward")[c === a.pages ? "addClass" : "removeClass"]("disabled").end().find("span.back")[c === 1 ? "addClass" : "removeClass"]("disabled"), c === a.pages && a.playing && a.startStop());
				if (!d) {
					var e = a.getDim(c);
					a.$wrapper.css({width: e[0], height: e[1]}).add(a.$window).scrollLeft(0);
					a.$el.css(a.dir, -a.panelSize[b.infiniteSlides && a.pages > 1 ? c : c - 1][2])
				}
				a.currentPage = c;
				a.$currentPage = a.$items.removeClass("activePage").eq(c - a.adj).addClass("activePage")
			}
		};
		a.makeActive = function () {
			a.$wrapper.is(".activeSlider") || (d(".activeSlider").removeClass("activeSlider"), a.$wrapper.addClass("activeSlider"))
		};
		a.gotoHash = function () {
			var c = a.win.location.hash, f = c.indexOf("&"), e = c.match(a.regex);
			e === null && !/^#&/.test(c) ? (c = c.substring(0, f >= 0 ? f : c.length), e = d(c).closest(".anythingBase")[0] === a.el ? d(c).closest(".panel").index() : null) : e !== null && (e = b.hashTags ? parseInt(e[1], 10) : null);
			return e
		};
		a.setHash = function (b) {
			var d = "panel" + a.runTimes + "-", e = a.win.location.hash;
			if (typeof e !== "undefined")a.win.location.hash = e.indexOf(d) > 0 ? e.replace(a.regex, d + b) : e + "&" + d + b
		};
		a.slideControls = function (c) {
			var d = c ? 0 : b.animationTime, e = c ? b.animationTime : 0, g = c ? 1 : 0, h = c ? 0 : 1;
			b.toggleControls && a.$controls.stop(true, true).delay(d)[c ? "slideDown" : "slideUp"](b.animationTime / 2).delay(e);
			b.buildArrows && b.toggleArrows && (!a.hovered && a.playing && (h = 1, g = 0), a.$forward.stop(true, true).delay(d).animate({right: h * a.$arrowWidth, opacity: g}, b.animationTime / 2), a.$back.stop(true, true).delay(d).animate({left: h * a.$arrowWidth, opacity: g}, b.animationTime / 2))
		};
		a.clearTimer = function (b) {
			if (a.timer && (a.win.clearInterval(a.timer), !b && a.slideshow))a.$el.trigger("slideshow_stop", a), a.slideshow = false
		};
		a.startStop = function (c, d) {
			c !== true && (c = false);
			if ((a.playing = c) && !d)a.$el.trigger("slideshow_start", a), a.slideshow = true;
			b.buildStartStop && (a.$startStop.toggleClass("playing", c).find("span").html(c ? b.stopText : b.startText), parseInt(a.$startStop.find("span").css("text-indent"), 10) < 0 && a.$startStop.addClass(b.tooltipClass).attr("title", c ? b.stopText : b.startText));
			c ? (a.clearTimer(true), a.timer = a.win.setInterval(function () {
				b.isVideoPlaying(a) ? b.resumeOnVideoEnd || a.startStop() : a.goForward(true)
			}, b.delay)) : a.clearTimer()
		};
		a.init()
	};
	d.anythingSlider.defaults = {theme: "default", expand: false, resizeContents: true, vertical: false, showMultiple: false, easing: "swing", buildArrows: true, buildNavigation: true, buildStartStop: true, appendForwardTo: null, appendBackTo: null, appendControlsTo: null, appendNavigationTo: null, appendStartStopTo: null, toggleArrows: false, toggleControls: false, startText: "Start", stopText: "Stop", forwardText: "&raquo;", backText: "&laquo;", tooltipClass: "tooltip", enableArrows: true, enableNavigation: true, enableStartStop: true, enableKeyboard: true, startPanel: 1, changeBy: 1, hashTags: true, infiniteSlides: true, navigationFormatter: null, navigationSize: false, autoPlay: false, autoPlayLocked: false, autoPlayDelayed: false, pauseOnHover: true, stopAtEnd: false, playRtl: false, delay: 3E3, resumeDelay: 15E3, animationTime: 600, delayBeforeAnimate: 0, clickForwardArrow: "click", clickBackArrow: "click", clickControls: "click focusin", clickSlideshow: "click", resumeOnVideoEnd: true, addWmodeToObject: "opaque", isVideoPlaying: function () {
		return false
	}};
	d.fn.anythingSlider = function (h, i) {
		return this.each(function () {
			var a, b = d(this).data("AnythingSlider");
			(typeof h).match("object|undefined") ? b ? b.updateSlider() : new d.anythingSlider(this, h) : /\d/.test(h) && !isNaN(h) && b ? (a = typeof h === "number" ? h : parseInt(d.trim(h), 10), a >= 1 && a <= b.pages && b.gotoPage(a, false, i)) : /^[#|.]/.test(h) && d(h).length && b.gotoPage(h, false, i)
		})
	}
})(jQuery);

/*new category*/
function hidespot() {
	$("#spotcontainer").hide();
	$("#bgspot").hide();
	return false;
}
function slideUp() {
	$("#categoryHolder").slideUp("slow");
}

//ColorBox v1.3.19.3 - jQuery lightbox plugin
//(c) 2011 Jack Moore - jacklmoore.com
//License: http://www.opensource.org/licenses/mit-license.php
(function (a, b, c) {
	function Z(c, d, e) {
		var g = b.createElement(c);
		return d && (g.id = f + d), e && (g.style.cssText = e), a(g)
	}

	function $(a) {
		var b = y.length, c = (Q + a) % b;
		return c < 0 ? b + c : c
	}

	function _(a, b) {
		return Math.round((/%/.test(a) ? (b === "x" ? z.width() : z.height()) / 100 : 1) * parseInt(a, 10))
	}

	function ab(a) {
		return K.photo || /\.(gif|png|jpe?g|bmp|ico)((#|\?).*)?$/i.test(a)
	}

	function bb() {
		var b, c = a.data(P, e);
		c == null ? (K = a.extend({}, d), console && console.log && console.log("Error: cboxElement missing settings object")) : K = a.extend({}, c);
		for (b in K)a.isFunction(K[b]) && b.slice(0, 2) !== "on" && (K[b] = K[b].call(P));
		K.rel = K.rel || P.rel || "nofollow", K.href = K.href || a(P).attr("href"), K.title = K.title || P.title, typeof K.href == "string" && (K.href = a.trim(K.href))
	}

	function cb(b, c) {
		a.event.trigger(b), c && c.call(P)
	}

	function db() {
		var a, b = f + "Slideshow_", c = "click." + f, d, e, g;
		K.slideshow && y[1] ? (d = function () {
			F.text(K.slideshowStop).unbind(c).bind(j,function () {
				if (K.loop || y[Q + 1])a = setTimeout(W.next, K.slideshowSpeed)
			}).bind(i,function () {
				clearTimeout(a)
			}).one(c + " " + k, e), r.removeClass(b + "off").addClass(b + "on"), a = setTimeout(W.next, K.slideshowSpeed)
		}, e = function () {
			clearTimeout(a), F.text(K.slideshowStart).unbind([j, i, k, c].join(" ")).one(c, function () {
				W.next(), d()
			}), r.removeClass(b + "on").addClass(b + "off")
		}, K.slideshowAuto ? d() : e()) : r.removeClass(b + "off " + b + "on")
	}

	function eb(b) {
		U || (P = b, bb(), y = a(P), Q = 0, K.rel !== "nofollow" && (y = a("." + g).filter(function () {
			var b = a.data(this, e), c;
			return b && (c = b.rel || this.rel), c === K.rel
		}), Q = y.index(P), Q === -1 && (y = y.add(P), Q = y.length - 1)), S || (S = T = !0, r.show(), K.returnFocus && a(P).blur().one(l, function () {
			a(this).focus()
		}), q.css({opacity: +K.opacity, cursor: K.overlayClose ? "pointer" : "auto"}).show(), K.w = _(K.initialWidth, "x"), K.h = _(K.initialHeight, "y"), W.position(), o && z.bind("resize." + p + " scroll." + p,function () {
			q.css({width: z.width(), height: z.height(), top: z.scrollTop(), left: z.scrollLeft()})
		}).trigger("resize." + p), cb(h, K.onOpen), J.add(D).hide(), I.html(K.close).show()), W.load(!0))
	}

	function fb() {
		!r && b.body && (Y = !1, z = a(c), r = Z(X).attr({id: e, "class": n ? f + (o ? "IE6" : "IE") : ""}).hide(), q = Z(X, "Overlay", o ? "position:absolute" : "").hide(), s = Z(X, "Wrapper"), t = Z(X, "Content").append(A = Z(X, "LoadedContent", "width:0; height:0; overflow:hidden"), C = Z(X, "LoadingOverlay").add(Z(X, "LoadingGraphic")), D = Z(X, "Title"), E = Z(X, "Current"), G = Z(X, "Next"), H = Z(X, "Previous"), F = Z(X, "Slideshow").bind(h, db), I = Z(X, "Close")), s.append(Z(X).append(Z(X, "TopLeft"), u = Z(X, "TopCenter"), Z(X, "TopRight")), Z(X, !1, "clear:left").append(v = Z(X, "MiddleLeft"), t, w = Z(X, "MiddleRight")), Z(X, !1, "clear:left").append(Z(X, "BottomLeft"), x = Z(X, "BottomCenter"), Z(X, "BottomRight"))).find("div div").css({"float": "left"}), B = Z(X, !1, "position:absolute; width:9999px; visibility:hidden; display:none"), J = G.add(H).add(E).add(F), a(b.body).append(q, r.append(s, B)))
	}

	function gb() {
		return r ? (Y || (Y = !0, L = u.height() + x.height() + t.outerHeight(!0) - t.height(), M = v.width() + w.width() + t.outerWidth(!0) - t.width(), N = A.outerHeight(!0), O = A.outerWidth(!0), r.css({"padding-bottom": L, "padding-right": M}), G.click(function () {
			W.next()
		}), H.click(function () {
			W.prev()
		}), I.click(function () {
			W.close()
		}), q.click(function () {
			K.overlayClose && W.close()
		}), a(b).bind("keydown." + f, function (a) {
			var b = a.keyCode;
			S && K.escKey && b === 27 && (a.preventDefault(), W.close()), S && K.arrowKey && y[1] && (b === 37 ? (a.preventDefault(), H.click()) : b === 39 && (a.preventDefault(), G.click()))
		}), a("." + g, b).live("click", function (a) {
			a.which > 1 || a.shiftKey || a.altKey || a.metaKey || (a.preventDefault(), eb(this))
		})), !0) : !1
	}

	var d = {transition: "elastic", speed: 300, width: !1, initialWidth: "600", innerWidth: !1, maxWidth: !1, height: !1, initialHeight: "450", innerHeight: !1, maxHeight: !1, scalePhotos: !0, scrolling: !0, inline: !1, html: !1, iframe: !1, fastIframe: !0, photo: !1, href: !1, title: !1, rel: !1, opacity: .9, preloading: !0, current: "image {current} of {total}", previous: "previous", next: "next", close: "close", xhrError: "This content failed to load.", imgError: "This image failed to load.", open: !1, returnFocus: !0, reposition: !0, loop: !0, slideshow: !1, slideshowAuto: !0, slideshowSpeed: 2500, slideshowStart: "start slideshow", slideshowStop: "stop slideshow", onOpen: !1, onLoad: !1, onComplete: !1, onCleanup: !1, onClosed: !1, overlayClose: !0, escKey: !0, arrowKey: !0, top: !1, bottom: !1, left: !1, right: !1, fixed: !1, data: undefined}, e = "colorbox", f = "cbox", g = f + "Element", h = f + "_open", i = f + "_load", j = f + "_complete", k = f + "_cleanup", l = f + "_closed", m = f + "_purge", n = !a.support.opacity && !a.support.style, o = n && !c.XMLHttpRequest, p = f + "_IE6", q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X = "div", Y;
	if (a.colorbox)return;
	a(fb), W = a.fn[e] = a[e] = function (b, c) {
		var f = this;
		b = b || {}, fb();
		if (gb()) {
			if (!f[0]) {
				if (f.selector)return f;
				f = a("<a/>"), b.open = !0
			}
			c && (b.onComplete = c), f.each(function () {
				a.data(this, e, a.extend({}, a.data(this, e) || d, b))
			}).addClass(g), (a.isFunction(b.open) && b.open.call(f) || b.open) && eb(f[0])
		}
		return f
	}, W.position = function (a, b) {
		function i(a) {
			u[0].style.width = x[0].style.width = t[0].style.width = a.style.width, t[0].style.height = v[0].style.height = w[0].style.height = a.style.height
		}

		var c = 0, d = 0, e = r.offset(), g, h;
		z.unbind("resize." + f), r.css({top: -9e4, left: -9e4}), g = z.scrollTop(), h = z.scrollLeft(), K.fixed && !o ? (e.top -= g, e.left -= h, r.css({position: "fixed"})) : (c = g, d = h, r.css({position: "absolute"})), K.right !== !1 ? d += Math.max(z.width() - K.w - O - M - _(K.right, "x"), 0) : K.left !== !1 ? d += _(K.left, "x") : d += Math.round(Math.max(z.width() - K.w - O - M, 0) / 2), K.bottom !== !1 ? c += Math.max(z.height() - K.h - N - L - _(K.bottom, "y"), 0) : K.top !== !1 ? c += _(K.top, "y") : c += Math.round(Math.max(z.height() - K.h - N - L, 0) / 2), r.css({top: e.top, left: e.left}), a = r.width() === K.w + O && r.height() === K.h + N ? 0 : a || 0, s[0].style.width = s[0].style.height = "9999px", r.dequeue().animate({width: K.w + O, height: K.h + N, top: c, left: d}, {duration: a, complete: function () {
			i(this), T = !1, s[0].style.width = K.w + O + M + "px", s[0].style.height = K.h + N + L + "px", K.reposition && setTimeout(function () {
				z.bind("resize." + f, W.position)
			}, 1), b && b()
		}, step                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         : function () {
			i(this)
		}})
	}, W.resize = function (a) {
		S && (a = a || {}, a.width && (K.w = _(a.width, "x") - O - M), a.innerWidth && (K.w = _(a.innerWidth, "x")), A.css({width: K.w}), a.height && (K.h = _(a.height, "y") - N - L), a.innerHeight && (K.h = _(a.innerHeight, "y")), !a.innerHeight && !a.height && (A.css({height: "auto"}), K.h = A.height()), A.css({height: K.h}), W.position(K.transition === "none" ? 0 : K.speed))
	}, W.prep = function (b) {
		function g() {
			return K.w = K.w || A.width(), K.w = K.mw && K.mw < K.w ? K.mw : K.w, K.w
		}

		function h() {
			return K.h = K.h || A.height(), K.h = K.mh && K.mh < K.h ? K.mh : K.h, K.h
		}

		if (!S)return;
		var c, d = K.transition === "none" ? 0 : K.speed;
		A.remove(), A = Z(X, "LoadedContent").append(b), A.hide().appendTo(B.show()).css({width: g(), overflow: K.scrolling ? "auto" : "hidden"}).css({height: h()}).prependTo(t), B.hide(), a(R).css({"float": "none"}), o && a("select").not(r.find("select")).filter(function () {
			return this.style.visibility !== "hidden"
		}).css({visibility: "hidden"}).one(k, function () {
			this.style.visibility = "inherit"
		}), c = function () {
			function s() {
				n && r[0].style.removeAttribute("filter")
			}

			var b, c, g = y.length, h, i = "frameBorder", k = "allowTransparency", l, o, p, q;
			if (!S)return;
			l = function () {
				clearTimeout(V), C.hide(), cb(j, K.onComplete)
			}, n && R && A.fadeIn(100), D.html(K.title).add(A).show();
			if (g > 1) {
				typeof K.current == "string" && E.html(K.current.replace("{current}", Q + 1).replace("{total}", g)).show(), G[K.loop || Q < g - 1 ? "show" : "hide"]().html(K.next), H[K.loop || Q ? "show" : "hide"]().html(K.previous), K.slideshow && F.show();
				if (K.preloading) {
					b = [$(-1), $(1)];
					while (c = y[b.pop()])q = a.data(c, e), q && q.href ? (o = q.href, a.isFunction(o) && (o = o.call(c))) : o = c.href, ab(o) && (p = new Image, p.src = o)
				}
			} else J.hide();
			K.iframe ? (h = Z("iframe")[0], i in h && (h[i] = 0), k in h && (h[k] = "true"), h.name = f + +(new Date), K.fastIframe ? l() : a(h).one("load", l), h.src = K.href, K.scrolling || (h.scrolling = "no"), a(h).addClass(f + "Iframe").appendTo(A).one(m, function () {
				h.src = "//about:blank"
			})) : l(), K.transition === "fade" ? r.fadeTo(d, 1, s) : s()
		}, K.transition === "fade" ? r.fadeTo(d, 0, function () {
			W.position(0, c)
		}) : W.position(d, c)
	}, W.load = function (b) {
		var c, d, e = W.prep;
		T = !0, R = !1, P = y[Q], b || bb(), cb(m), cb(i, K.onLoad), K.h = K.height ? _(K.height, "y") - N - L : K.innerHeight && _(K.innerHeight, "y"), K.w = K.width ? _(K.width, "x") - O - M : K.innerWidth && _(K.innerWidth, "x"), K.mw = K.w, K.mh = K.h, K.maxWidth && (K.mw = _(K.maxWidth, "x") - O - M, K.mw = K.w && K.w < K.mw ? K.w : K.mw), K.maxHeight && (K.mh = _(K.maxHeight, "y") - N - L, K.mh = K.h && K.h < K.mh ? K.h : K.mh), c = K.href, V = setTimeout(function () {
			C.show()
		}, 100), K.inline ? (Z(X).hide().insertBefore(a(c)[0]).one(m, function () {
			a(this).replaceWith(A.children())
		}), e(a(c))) : K.iframe ? e(" ") : K.html ? e(K.html) : ab(c) ? (a(R = new Image).addClass(f + "Photo").error(function () {
			K.title = !1, e(Z(X, "Error").html(K.imgError))
		}).load(function () {
			var a;
			R.onload = null, K.scalePhotos && (d = function () {
				R.height -= R.height * a, R.width -= R.width * a
			}, K.mw && R.width > K.mw && (a = (R.width - K.mw) / R.width, d()), K.mh && R.height > K.mh && (a = (R.height - K.mh) / R.height, d())), K.h && (R.style.marginTop = Math.max(K.h - R.height, 0) / 2 + "px"), y[1] && (K.loop || y[Q + 1]) && (R.style.cursor = "pointer", R.onclick = function () {
				W.next()
			}), n && (R.style.msInterpolationMode = "bicubic"), setTimeout(function () {
				e(R)
			}, 1)
		}), setTimeout(function () {
			R.src = c
		}, 1)) : c && B.load(c, K.data, function (b, c, d) {
			e(c === "error" ? Z(X, "Error").html(K.xhrError) : a(this).contents())
		})
	}, W.next = function () {
		!T && y[1] && (K.loop || y[Q + 1]) && (Q = $(1), W.load())
	}, W.prev = function () {
		!T && y[1] && (K.loop || Q) && (Q = $(-1), W.load())
	}, W.close = function () {
		S && !U && (U = !0, S = !1, cb(k, K.onCleanup), z.unbind("." + f + " ." + p), q.fadeTo(200, 0), r.stop().fadeTo(300, 0, function () {
			r.add(q).css({opacity: 1, cursor: "auto"}).hide(), cb(m), A.remove(), setTimeout(function () {
				U = !1, cb(l, K.onClosed)
			}, 1)
		}))
	}, W.remove = function () {
		a([]).add(r).add(q).remove(), r = null, a("." + g).removeData(e).removeClass(g).die()
	}, W.element = function () {
		return a(P)
	}, W.settings = d
})(jQuery, document, this);

function openLarge(img) {
	$(".lrgimg" + img).click();
}

/*!
 * jQuery Blinds
 * http://www.littlewebthings.com/projects/blinds
 *
 * Copyright 2010, Vassilis Dourdounis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
(function ($) {
	$.fn.blinds = function (options) {
		settings = {};
		settings.height = 200;
		settings.width = 200;
		$(this).find('li').hide();
		$(this).addClass('blinds_slideshow');
		settings.tile_orchestration = this.tile_orchestration;
		settings.h_res = 12;
		settings.v_res = 1;
		jQuery.extend(settings, options);
		tiles_width = settings.width / settings.h_res;
		tiles_height = settings.height / settings.v_res;
		blinds_images = [];
		$(this).find('img').each(function (i, e) {
			blinds_images[blinds_images.length] = {'title': e.alt, 'src': e.src}
		});
		$(this).append('<div class="blinds_container" onclick=""></div>');
		blinds_container = $(this).find('.blinds_container');
		blinds_container.css({
			'position'  : 'relative',
			'display'   : 'block',
			'width'     : settings.width,
			'height'    : settings.height,
			'background': 'transparent url("' + blinds_images[0]['src'] + '") 0px 0px no-repeat'
		});
		for (i = 0; i < settings.h_res; i++) {
			for (j = 0; j < settings.v_res; j++) {
				if (tile = $(this).find('.tile_' + i + '_' + j)) {
					h = '<div class="outer_tile_' + i + '_' + j + '"><div class="tile_' + i + '_' + j + '"></div></div>';
					blinds_container.append(h);
					outer_tile = $(this).find('.outer_tile_' + i + '_' + j);
					outer_tile.css({
						'position': 'absolute',
						'width'   : tiles_width,
						'height'  : tiles_height,
						'left'    : i * tiles_width,
						'top'     : j * tiles_height
					})
					tile = $(this).find('.tile_' + i + '_' + j);
					tile.css({
						'position'  : 'absolute',
						'width'     : tiles_width,
						'height'    : tiles_height,
						'left'      : 0,
						'top'       : 0,
						'background': 'transparent url("' + blinds_images[0]['src'] + '") -' + (i * tiles_width) + 'px -' + (j * tiles_height) + 'px no-repeat'
					})
					jQuery.data($(tile)[0], 'blinds_position', {'i': i, 'j': j});
				}
			}
		}
		jQuery.data(this[0], 'blinds_config', {
			'h_res'             : settings.h_res,
			'v_res'             : settings.v_res,
			'tiles_width'       : tiles_width,
			'tiles_height'      : tiles_height,
			'images'            : blinds_images,
			'img_index'         : 0,
			'change_buffer'     : 0,
			'tile_orchestration': settings.tile_orchestration
		});
	}
	$.fn.blinds_change = function (img_index) {
		config = jQuery.data($(this)[0], 'blinds_config');
		for (i = 0; i < config.h_res; i++) {
			for (j = 0; j < config.v_res; j++) {
				$(this).find('.tile_' + i + '_' + j).show().css('background', 'transparent ' + 'url("' + config.images[config.img_index]['src'] + '") -' + (i * config.tiles_width) + 'px -' + (j * config.tiles_height) + 'px no-repeat');
			}
		}
		$(this).children('.blinds_container').css('background', 'transparent url("' + blinds_images[img_index]['src'] + '") 0px 0px no-repeat');
		$(this).children('.blinds_container').unbind("click");
		$(this).children('.blinds_container').click(function () {
			openLarge(img_index);
		});
		config.img_index = img_index;
		jQuery.data($(this)[0], 'blinds_config', config);
		for (i = 0; i < config.h_res; i++) {
			for (j = 0; j < config.v_res; j++) {
				t = config.tile_orchestration(i, j, config.h_res, config.v_res);
				config = jQuery.data($(this)[0], 'blinds_config');
				config.change_buffer = config.change_buffer + 1;
				jQuery.data(this[0], 'blinds_config', config);
				$(this).find('.tile_' + i + '_' + j).fadeOut(t, function () {
					blinds_pos = jQuery.data($(this)[0], 'blinds_position');
					config = jQuery.data($(this).parents('.blinds_slideshow')[0], 'blinds_config');
					$(this).css('background', 'transparent ' + 'url("' + config.images[config.img_index]['src'] + '") -' + (blinds_pos.i * config.tiles_width) + 'px -' + (blinds_pos.j * config.tiles_height) + 'px no-repeat');
					config.change_buffer = config.change_buffer - 1;
					jQuery.data($(this).parents('.blinds_slideshow')[0], 'blinds_config', config);
					if (config.change_buffer == 0) {
						$(this).parent().parent().children().children().show();
					}
				});
			}
		}
	}
	$.fn.tile_orchestration = function (i, j, total_x, total_y) {
		return (Math.abs(i - total_x / 2) + Math.abs(j - total_y / 2)) * 100;
	}
})(jQuery);