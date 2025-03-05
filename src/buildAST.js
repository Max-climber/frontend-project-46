import _ from 'lodash';

const buildAST = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  return keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return { type: 'deleted', key, value: obj1[key] };
    }

    if (!Object.hasOwn(obj1, key)) {
      return { type: 'added', key, value: obj2[key] };
    }

    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        type: 'nested',
        key,
        children: buildAST(obj1[key], obj2[key]),
      };
    }

    if (obj1[key] === obj2[key]) {
      return { type: 'unchanged', key, value: obj1[key] };
    }
    return {
      type: 'changed',
      key,
      oldValue: obj1[key],
      newValue: obj2[key],
    };
  });
};
export default buildAST;
