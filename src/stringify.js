import _ from 'lodash';

const stringify = (value, depth = 1) => {
    if (!_.isObject(value)) {
      return value;
    }

    const spacesCount = 4;
    const indent = ' '.repeat(depth * spacesCount);
    const entries = Object
      .entries(value)
      .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`)
      .join('\n');

    return `{\n${entries}\n${' '.repeat((depth - 1) * spacesCount)}}`;
  };

  export default stringify;