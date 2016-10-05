## React String to Tag

To replace 'http://~' and '\n' in the string to each tags for React.js.

### Install

```
$ npm install @ufotsuboi/react-string2tag
```


### Usage

```
import React from 'react';
import string2tag from '@ufotsuboi/react-string2tag';

const testString = 'foo\nhttps://github.com/ufotsuboi/react-string2tag\nbar';

const Show = ({ text }) => {
  return (
    <div>
      {string2tag(text)}
    </div>
  );
};
```

```
string2tag(text, {
  link: {
    className: 'hoge',
    targetBlank: false,
    ellipsisi: 25,
  },
});
```

### Options

- link
    - className: Add class attribute to 'a' tags.
    - targetBlank: Default true.
    - ellipsis: Omitted if url is longer than it. Default false.
    
