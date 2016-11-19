import 'es6-symbol/implement';

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
 *          }
 *      }
 *      returns: ' "height:20px;width:30px;" '
 *
 * @param styles
 * @returns {string}
 */
export default function styleNames(styles) {
    if(!styles || typeof styles !== 'object'){
        return '""';
    }

    let styleNames = '';

    for (let key of Object.keys(styles)) {
        if (typeof styles[key] === 'string') {
            styleNames += `${key}:${styles[key]};`;
            continue;
        }

        if (typeof styles[key] !== 'object' || styles[key].length === 0) {
            continue;
        }

        let conditions = styles[key];

        for (let value of Object.keys(conditions)) {
            if ((typeof conditions[value] !== 'function' && conditions[value]) || (typeof conditions[value] === 'function' && conditions[value]())) {
                styleNames += `${key}:${value};`;
                break;
            }
        }
    }

    return `${styleNames}`;
}
