## @shat/stylenames

A simple JavaScript utility for conditionally joining inline styles together.

> This is a fork of the unmaintained [stylenames](https://github.com/kmathmann/stylenames) package

#### What does stylenames do?

In one short sentence: "stylenames" converts an object to a css style string."

Think [classNames](https://www.npmjs.com/package/classnames) but for inline styles.

## Install

**From CDN:** Add the following script to the end of your `<head>` section.
```html
<script src="https://cdn.jsdelivr.net/npm/@shat/stylenames@v1.x.x/lib/index.umd.js"></script>
```

That's it. It will initialize itself.

**From NPM:** Install the package from NPM.
```js
npm install @shat/stylenames
```

Include it in your script.

```javascript
import styleNames from '@shat/stylenames';
```


## Quick Start

```javascript
styleNames({
    backgroundColor: 'red',
    width: '120px',
    
    'height':{
        // If the condition is false the style does not becomes used.
        '200px': false,
        // Only the first value with true condition becomes used.
        '300px': true,
        '400px': true
    },
});
```

## Examples

### Without conditions

```javascript
let styles1 = styleNames({
    height: '120px',
    width: '100px'
});
console.log(styles1); //--> 'height:120px;width:100px;'
```
       
### With one condition using a boolean toggle

```javascript
let styles1 = styleNames({
    height: '120px',
    width: {
        '200px': false
    }
});
console.log(styles1); //--> 'height:120px '

let styles2 = styleNames({
    height: '120px',
    width: {
        '200px': true
    }
});
console.log(styles2); //--> 'height:120px;width:200px;'
```

### With multiple rules with 1 boolean toggle

```js
const styles = styleNames({
    'height:120px;width:100px;': true
});
console.log(styles); //--> 'height:120px;width:100px;'
```

### With camelcased rules

```js
const styles = styleNames({backgroundColor: 'red'});
console.log(styles); //--> 'background-color:red;'
```

### With array input

```js
const styles = styleNames(['height:120px', 'width:100px']);
console.log(styles); //--> 'height:120px;width:100px;'
```

### With more than one condition using a function toggle

```javascript
let itemCount = 0;

let styleNamesConfig = {
    display: {
        'none': () => itemCount === 0
    },
    height: '120px',
    width: {
        '100px': () => itemCount <= 1,
        '200px': () => itemCount <= 2,
        '400px': () => itemCount <= 4,
        '100%': () => itemCount > 4
    }
};

console.log(styleNames(styleNamesConfig)); //--> 'display:none;height:120px;width:100px;'

itemCount++; //1
console.log(styleNames(styleNamesConfig)); //--> 'height:120px;width:100px;'

itemCount++; //2
console.log(styleNames(styleNamesConfig)); //--> 'height:120px;width:200px;'

itemCount++; //3
console.log(styleNames(styleNamesConfig)); //--> 'height:120px;width:400px;'

itemCount += 12; //15
console.log(styleNames(styleNamesConfig)); //--> 'height:120px;width:100%;'
```

## Contributing

### Requirements

- Node 10
- Yarn 1.x or npm

### Setup

1. Clone the repository
2. Run `yarn` or `npm install` installs all required dependencies.

### npm scripts

> Equivalent `npm run <script>` should also work

- `yarn build` will bundle/transpile JavaScript for all targets using microbundle.
- `yarn test` will run tests using Jest.
- `yarn lint` will lint all of the files with [xo](https://github.com/xojs/xo)
- `yarn format` will run lint with `--fix` option on all the examples files (and tests).

## LICENSE

Code is licensed under the [MIT License](./LICENSE).

## Acknowledgments

Kevin Mathmann for building [stylenames](https://github.com/kmathmann/stylenames) which this is a fork of.