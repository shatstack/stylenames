/**
 * Convert Object to CSS style String.
 *
 *   Example:
 *      {
 *          height: "20px",
 *          width: {
 *              "20px": false,
 *              "30px": true,
 *              "40px": true
 *          },
 *      }
 *      returns: '"height:20px;width:30px;"'
 *
 * @param {object|Array} styles - style rules
 * @returns {string}
 */
export default function styleNames(styles) {
  if (!styles || typeof styles !== 'object') {
    return '';
  }

  if (Array.isArray(styles)) {
    return styles.join(';') + ';';
  }

  let styleNames = '';
  for (const key of Object.keys(styles)) {
    const value = styles[key];
    if (typeof value === 'string') {
      styleNames += `${key}:${value};`;
      continue;
    }

    if (typeof value === 'boolean') {
      styleNames += key;
      continue;
    }

    if (typeof value !== 'object' || value.length === 0) {
      continue;
    }

    const conditions = styles[key];

    for (const value of Object.keys(conditions)) {
      if (
        (typeof conditions[value] !== 'function' && conditions[value]) ||
        (typeof conditions[value] === 'function' && conditions[value]())
      ) {
        styleNames += `${key}:${value};`;
        break;
      }
    }
  }

  return `${styleNames}`;
}

if (window) {
  window.styleNames = styleNames;
}
