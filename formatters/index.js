import stylish from './stylish.js';
import plain from './plain.js';
import json from './jsonFormatter.js';

const formatter = {
  stylish,
  plain,
  json,
};

export default (format = 'stylish') => formatter[format];
