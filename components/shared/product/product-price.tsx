/*
  cn for dynamic class name
  so we can set default tailwind style and also can accept user defined style
  className={cn('text-2xl', className)}
*/
import {cn} from '@/lib/utils';
import {formatToIdr} from '@/lib/format-currency';

interface ProductPriceProps {
  value: string;
  className?: string;
}

const ProductPrice = (props: ProductPriceProps) => {
  const {value, className} = props;

  return (
    <p className={cn('text-base items-center', className)}>
      <span>IDR</span>
      {formatToIdr(Number(value))}
    </p>
  );
};

export {ProductPrice};
