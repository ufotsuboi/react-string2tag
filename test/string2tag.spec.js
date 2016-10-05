const assert = require('power-assert');

const string2tag = require('../index');

describe('react-string2tag', () => {
  describe('replace to newline', () => {
    it('replace "\\n" to tag', done => {
      const string = 'foobar\nhoge\nfuga';
      const result = string2tag(string);

      assert(result[0] === 'foobar');
      assert(result[1].type === 'br');
      assert(result[2] === 'hoge');
      assert(result[3].type === 'br');
      assert(result[4] === 'fuga');
      done();
    });
  });

  describe('replace to link', () => {
    it('replace "http://~" to tag', done => {
      const url = 'https://90123456789012345678901234567890'
      const string = `foobar\n${url}\nfuga`;
      const result = string2tag(string);

      assert(result[2].type === 'a');
      assert(result[2].props.target === '_blank');
      assert(result[2].props.rel === 'noopener noreferrer');
      assert(result[2].props.children === url);
      done();
    });

    it('omitted if url is longer than ellipsis', done => {
      const url = 'https://90123456789012345678901234567890'
      const string = `foobar\n${url}\nfuga`;
      const result = string2tag(string, { link: { ellipsis: 30 } });

      assert(result[2].type === 'a');
      assert(result[2].props.children === 'https://9012345678901234567890...');
      done();
    });

    it('not target _blank if targetBlank option is false', done => {
      const url = 'https://901234567890'
      const string = `foobar\n${url}\nfuga`;
      const result = string2tag(string, { link: { targetBlank: false } });

      assert(result[2].type === 'a');
      assert(result[2].props.target === undefined);
      assert(result[2].props.rel === undefined);
      done();
    });

    it('add className', done => {
      const url = 'https://901234567890'
      const string = `foobar\n${url}\nfuga`;
      const className = 'TEST_CLASS';
      const result = string2tag(string, { link: { className: className } });

      assert(result[2].type === 'a');
      assert(result[2].props.className === className);
      done();
    });
  });
});
