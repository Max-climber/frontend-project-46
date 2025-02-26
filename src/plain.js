import _ from 'lodash';

const plain = (value) => {
    if (_.isObject(value)) {
        return `[complex value]`;
      }
    if (typeof(value) === 'string') {
        return  `'${value}'`
    }
    return String(value)
};

export default plain;