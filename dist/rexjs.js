/*!
 * RexJS v1.0.0
 * (c) 2017 nerdslabs
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.RexJS = factory());
}(this, (function () { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var Module = function () {
    function Module(context, worker, module, callback) {
        classCallCheck(this, Module);

        this._context = context;
        this._callback = callback;
        this.worker = worker;
        this.module = module;
        this.data = {};

        this.bind();
    }

    createClass(Module, [{
        key: 'bind',
        value: function bind() {
            var _this = this;

            this.connection = new WebSocket(this._context._options.websocketUrl + '?worker=' + this.worker + '&module=' + this.module);
            this.connection.onopen = this._bind;
            this.connection.onclose = this._unbind;
            this.connection.onmessage = function (event) {
                _this._message(event);
            };
        }
    }, {
        key: 'unbind',
        value: function unbind() {
            this.connection.close();
        }
    }, {
        key: '_bind',
        value: function _bind() {}
    }, {
        key: '_message',
        value: function _message(event) {
            var data = JSON.parse(event.data);
            if (_typeof(data.error) !== (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined))) {
                console.error('[RexJS] ' + data.error);
            } else {
                this.data = data;
                this._callback(this.data);
            }
        }
    }, {
        key: '_unbind',
        value: function _unbind() {
            console.debug('[RexJS] worker: ' + this.worker + ', module: ' + this.module + ' disconnected');
        }
    }]);
    return Module;
}();

var defaults = {
    env: "development"
};

var RexJS$1 = function () {
    function RexJS(opts) {
        classCallCheck(this, RexJS);

        this._options = _extends({}, defaults, opts);
        if ((typeof WebSocket === 'undefined' ? 'undefined' : _typeof(WebSocket)) == (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined))) {
            throw '[RexJS] WebSocket in not avaible in this browser!';
            return;
        }

        if (_typeof(this._options.websocketUrl) == (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined))) {
            throw '[RexJS] websocketUrl server url is not set in options!';
            return;
        }
    }

    createClass(RexJS, [{
        key: 'bindModule',
        value: function bindModule(worker, module, callback) {
            if ((typeof worker === 'undefined' ? 'undefined' : _typeof(worker)) == (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined))) {
                console.error('[RexJS] worker not presented!');
                return;
            }

            if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) == (typeof undefined === 'undefined' ? 'undefined' : _typeof(undefined))) {
                console.error('[RexJS] module not presented!');
                return;
            }

            return new Module(this, worker, module, callback);
        }
    }]);
    return RexJS;
}();

RexJS$1.version = '1.0.0';

return RexJS$1;

})));
