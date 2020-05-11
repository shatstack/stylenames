## @shat/stylenames

> This is a fork of the unmaintained stylenames package

#### What does stylenames do?

In one short sentence: "stylenames" converts an object to a css style string."

Think [classNames](https://www.npmjs.com/package/classnames) but for inline styles.

#### Install

Install with npm, or Yarn:

npm:

```sh
npm install classnames --save
```

Yarn (note that yarn add automatically saves the package to the dependencies in package.json):

```
yarn add classnames
```

#### Import

```javascript
import styleNames from 'stylenames';
```


#### stylenames object

```javascript
styleNames({
    'style-key':'style-value',
    
    // If the condition is false the style does not becomes used.
    'style-key':{
        'style-value': condition
    },
                
    // Only the first value with true condition becomes used.
    'style-key':{
        'style-value1': condition,
        'style-value2': condition,
        'style-value3': condition,
            ...
    }
});
```

### Examples

##### Without conditions

```javascript
let styles1 = styleNames({
    height: '120px',
    width: '100px'
});
console.log(styles1); //--> ' height:120px;width:100px; '
```
       
##### With one condition using a boolean toggle

```javascript
let styles1 = styleNames({
    height: '120px',
    width: {
        '200px': false
    }
});
console.log(styles1); //--> ' height:120px '

let styles2 = styleNames({
    height: '120px',
    width: {
        '200px': true
    }
});
console.log(styles2); //--> ' height:120px;width:200px; '
```
##### With more than one condition using a function toggle

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

console.log(styleNames(styleNamesConfig)); //--> ' display:none;height:120px;width:100px; '

itemCount++; //1
console.log(styleNames(styleNamesConfig)); //--> ' height:120px;width:100px; '

itemCount++; //2
console.log(styleNames(styleNamesConfig)); //--> ' height:120px;width:200px; '

itemCount++; //3
console.log(styleNames(styleNamesConfig)); //--> ' height:120px;width:400px; '

itemCount += 12; //15
console.log(styleNames(styleNamesConfig)); //--> ' height:120px;width:100%; '
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

Kevin Mathmann for building stylenames which this is a fork of.