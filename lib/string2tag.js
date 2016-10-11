'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = {
  link: {
    targetBlank: true,
    ellipsis: false,
    className: ''
  }
};

var createLinkElement = function createLinkElement(to, key, options) {
  var opt = Object.assign({}, DEFAULT_OPTIONS.link, options);
  var text = opt.ellipsis && opt.ellipsis < to.length ? to.substr(0, opt.ellipsis) + '...' : to;

  var attributes = {
    href: to,
    key: key,
    className: opt.className
  };

  if (opt.targetBlank) {
    attributes.target = '_blank';
    attributes.rel = 'noopener noreferrer';
  }
  return _react2.default.createElement('a', attributes, text);
};

var string2tag = function string2tag(string) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var lines = string.split(/((?:https?:\/\/[^\s\n]+)|(?:\n))/).filter(function (line) {
    return line !== '';
  }).map(function (line, i) {
    if (/^http/.test(line)) {
      return createLinkElement(line, i, options.link);
    } else if (/\n/.test(line)) {
      return _react2.default.createElement('br', { key: i });
    }
    return line;
  });
  return lines;
};

exports.default = string2tag;