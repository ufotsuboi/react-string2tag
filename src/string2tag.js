import React from 'react';

const DEFAULT_OPTIONS = {
  link: {
    targetBlank: true,
    ellipsis: false,
    className: '',
    style: {},
  },
};

const createLinkElement = (to, key, options) => {
  const opt = Object.assign({}, DEFAULT_OPTIONS.link, options);
  const text = (opt.ellipsis && opt.ellipsis < to.length) ? `${to.substr(0, opt.ellipsis)}...` : to;

  const attributes = {
    href: to,
    key,
    className: opt.className,
    style: opt.style,
  };

  if (opt.targetBlank) {
    attributes.target = '_blank';
    attributes.rel = 'noopener noreferrer';
  }
  return React.createElement('a', attributes, text);
};

const string2tag = (string, options = {}) => {
  const lines = string
    .split(/((?:https?:\/\/[^\s\n]+)|(?:\n))/)
    .filter((line) => line !== '')
    .map((line, i) => {
      if (/^http/.test(line)) {
        return createLinkElement(line, i, options.link);
      } else if (/\n/.test(line)) {
        return React.createElement('br', { key: i });
      }
      return line;
    });
  return lines;
};

export default string2tag;
