import yaml from 'js-yaml';

export default (data, format) => {
  switch (format) {
    case '.json': {
      return JSON.parse(data);
    }
    case '.yml' || '.yaml': {
      return yaml.load(data);
    }
    default:
      throw Error('Invalid format');
  }
};
