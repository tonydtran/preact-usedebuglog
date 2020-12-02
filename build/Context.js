"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.DebugLogContext = void 0;

var _preact = require("preact");

var DebugLogContext = (0, _preact.createContext)();
exports.DebugLogContext = DebugLogContext;

var DebugLogProvider = function DebugLogProvider(_ref) {
  var _ref$dev = _ref.dev,
      dev = _ref$dev === void 0 ? false : _ref$dev,
      children = _ref.children;
  return (0, _preact.h)(DebugLogContext.Provider, {
    value: {
      dev: dev
    }
  }, children);
};

var _default = DebugLogProvider;
exports["default"] = _default;