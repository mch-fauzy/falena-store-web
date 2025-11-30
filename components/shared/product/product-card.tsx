import Link from 'next/link';
import Image from 'next/image';

import {Card, CardContent, CardHeader} from '@/components/ui/card';
import {ProductPrice} from './product-price';
import {Product} from '@/types/product';
import {CONSTANT} from '@/lib/constant';

interface ProductCardProps {
  data: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const {data} = props;

  return (
    <Card className="w-full">
      <CardHeader className="p-0 items-center">
        <Link href={`${CONSTANT.pathRoute.product}/${data.slug}`}>
          <Image
            src={data.images[0]}
            alt={data.name}
            height={300}
            width={300}
            className="w-full h-auto"
            priority
          />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col h-full p-4 gap-4">
        <div className="text-brand">{data.brand}</div>
        <Link href={`${CONSTANT.pathRoute.product}/${data.slug}`}>
          <h2 className="text-description font-medium">{data.name}</h2>
        </Link>
        {/*  flex-grow acts as a spacer to push the rating & price section to the bottom */}
        <div className="flex-grow" />
        <div className="flex-between gap-4">
          <p>{data.rating.toString()} Stars</p>
          {data.stock ? (
            <ProductPrice value={data.price.toString()} />
          ) : (
            <p className="text-destructive">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export {ProductCard};
