"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Contents;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _ProductList = _interopRequireDefault(require("./ProductList.jsx"));

var _ProductReport = _interopRequireDefault(require("./ProductReport.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = function NotFound() {
  return _react.default.createElement("h1", null, "Page Not Found");
};

function Contents() {
  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Redirect, {
    exact: true,
    from: "/",
    to: "/products"
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/products",
    component: _ProductList.default
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/report",
    component: _ProductReport.default
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: NotFound
  }));
}