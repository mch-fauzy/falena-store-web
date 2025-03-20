interface ParseDecimalProps {
  value: number;
  decimalPlaces: number;
}

const parseDecimal = (
  props: ParseDecimalProps,
): {intValue: string; floatValue: string} => {
  const {value, decimalPlaces} = props;

  const stringValue = value.toFixed(decimalPlaces);
  const [intValue, floatValue] = stringValue.split('.');

  return {intValue, floatValue};
};

export {parseDecimal};
