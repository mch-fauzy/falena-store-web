const formatToIdr = (amount: number): string => {
  return new Intl.NumberFormat('id-ID').format(amount);
};

export {formatToIdr};
