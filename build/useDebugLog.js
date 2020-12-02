"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDebugLog = void 0;

var _hooks = require("preact/hooks");

var _Context = require("./Context");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useDebugLog = function useDebugLog(componentName, isEnabled) {
  if (!componentName || typeof componentName !== 'string') {
    throw new Error('A componentName must be provided');
  }

  var _useContext = (0, _hooks.useContext)(_Context.DebugLogContext),
      dev = _useContext.dev;

  var flagged = typeof isEnabled === 'boolean';

  var _useState = (0, _hooks.useState)(flagged ? isEnabled : dev),
      _useState2 = _slicedToArray(_useState, 2),
      enable = _useState2[0],
      setEnable = _useState2[1];

  (0, _hooks.useEffect)(function () {
    window.useDebugLog = window.useDebugLog || {};
    window.useDebugLog = _objectSpread(_objectSpread({}, window.useDebugLog), {}, _defineProperty({}, componentName, function () {
      var makeEnable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      setEnable(makeEnable);
    }));
  }, []);
  (0, _hooks.useEffect)(function () {
    if (typeof isEnabled === 'boolean') {
      setEnable(isEnabled);
    } else {
      if (dev !== enable) setEnable(dev);
    }
  }, [isEnabled]);

  var log = function log() {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    enable && (_console = console).log.apply(_console, ["%c[".concat(componentName, "]"), 'background-color: blue'].concat(args));
  };

  var table = function table() {
    var _console2;

    enable && console.log("%c[".concat(componentName, "]"), 'background-color: blue', 'console.table:');
    enable && (_console2 = console).table.apply(_console2, arguments);
  };

  var info = function info() {
    var _console3;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    enable && (_console3 = console).info.apply(_console3, ["%c[".concat(componentName, "]"), 'background-color: blue'].concat(args));
  };

  var error = function error() {
    var _console4;

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    enable && (_console4 = console).error.apply(_console4, ["%c[".concat(componentName, "]"), 'background-color: blue'].concat(args));
  };

  var warn = function warn() {
    var _console5;

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    enable && (_console5 = console).warn.apply(_console5, ["%c[".concat(componentName, "]"), 'background-color: blue'].concat(args));
  };

  var trace = function trace() {
    enable && console.log("%c[".concat(componentName, "]"), 'background-color: blue', 'console.trace:');
    enable && console.trace();
  };

  enable ? console.log("%c[useDebugLog]%c Debug for %c".concat(componentName, " %cenabled"), 'background-color: green;', 'color: inherit;', 'font-weight: bold', 'color: green;') : console.log("%c[useDebugLog]%c Debug for %c".concat(componentName, " %cdisabled"), 'background-color: green;', 'color: inherit;', 'font-weight: bold', 'color: orange;');
  return {
    log: log,
    table: table,
    info: info,
    error: error,
    warn: warn,
    trace: trace
  };
};

exports.useDebugLog = useDebugLog;