const styleNames = require('../lib/index.umd');

test('quickstart example', () => {
  expect(
    styleNames({
      backgroundColor: 'red',
      width: '120px',

      height: {
        // If the condition is false the style does not becomes used.
        '200px': false,
        // Only the first value with true condition becomes used.
        '300px': true,
        '400px': true
      }
    })
  ).toBe('background-color:red;width:120px;height:300px;');
});

test('returns empty string when called with nothing', () => {
  expect(styleNames()).toBe('');
});

test('returns empty string when not called with an object', () => {
  expect(styleNames(123)).toBe('');
});

test('works with JS stylenames', () => {
  expect(styleNames({backgroundColor: 'red'})).toBe('background-color:red;');
});

test('works with string values', () => {
  expect(
    styleNames({
      height: '120px',
      width: '100px'
    })
  ).toBe('height:120px;width:100px;');
});

test('works with multiple rules under 1 toggle', () => {
  expect(
    styleNames({
      'height:120px;width:100px;': true
    })
  ).toBe('height:120px;width:100px;');
});

test('works with arrays', () => {
  expect(styleNames(['height:120px', 'width:100px'])).toBe(
    'height:120px;width:100px;'
  );
});

test('works with a single true condition', () => {
  expect(
    styleNames({
      height: '120px',
      width: {
        '200px': false
      }
    })
  ).toBe('height:120px;');
});

test('works with a single false condition', () => {
  expect(
    styleNames({
      height: '120px',
      width: {
        '200px': true
      }
    })
  ).toBe('height:120px;width:200px;');
});

test('works with more than one condition & with function conditionals', () => {
  let itemCount = 0;

  const styleNamesConfig = {
    display: {
      none: () => itemCount === 0
    },
    height: '120px',
    width: {
      '100px': () => itemCount <= 1,
      '200px': () => itemCount <= 2,
      '400px': () => itemCount <= 4,
      '100%': () => itemCount > 4
    }
  };

  expect(styleNames(styleNamesConfig)).toBe(
    'display:none;height:120px;width:100px;'
  );
  itemCount++; // 1
  expect(styleNames(styleNamesConfig)).toBe('height:120px;width:100px;');
  itemCount++; // 2
  expect(styleNames(styleNamesConfig)).toBe('height:120px;width:200px;');
  itemCount++; // 3
  expect(styleNames(styleNamesConfig)).toBe('height:120px;width:400px;');
  itemCount += 12; // 15
  expect(styleNames(styleNamesConfig)).toBe('height:120px;width:100%;');
});

test('respects whitespace in value', () => {
  expect(styleNames({ height: `calc( 100% - 90px )` })).toBe('height:calc( 100% - 90px );');
})
