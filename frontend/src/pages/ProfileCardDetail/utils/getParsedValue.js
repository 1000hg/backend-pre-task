import moment from 'moment';

const parseValueByType = (type, value) => {
  switch (type) {
    case 'date':
      return moment(value);
    default:
      return value;
  }
};

export default (value, valueStructures) => {
  if (!value) return {};
  if (!valueStructures) return {};

  return Object.entries(value)
    .reduce((acc, crr) => {

      const [targetKey, value] = crr;
      if (!targetKey) return acc;

      const matchedStructure = valueStructures.find(({ dataKey }) => dataKey === targetKey);
      if (!matchedStructure) return acc;
      return {
        ...acc,
        [targetKey]: parseValueByType(matchedStructure.type, value),
      };
    }, {});
}