import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import type {Metadata} from 'next';
import {unstable_cache} from 'next/cache';

import {getProductBySlug} from '@/lib/fetch/product';
import {ProductPrice} from '@/components/shared/product/product-price';
import {ProductImages} from '@/components/shared/product/product-images';

/*
  - Next.js requires params because it extracts route parameters automatically from the file-based routing system.
  - You can’t use { slug: string } directly because Next.js always wraps route params inside params.
  - To use { slug: string }, you must manually extract it from params before passing it to your component.
*/
interface ProductDetailsPageProps {
  params: Promise<{slug: string}>;
}

const getProductBySlugCached = unstable_cache(getProductBySlug, [
  'product-by-slug',
]);

export const generateMetadata = async (
  props: ProductDetailsPageProps,
): Promise<Metadata> => {
  const {slug} = await props.params;
  const product = await getProductBySlugCached({slug});

  return {
    title: product.name,
    description: product.description,
  };
};

const ProductDetailsPage = async (props: ProductDetailsPageProps) => {
  const {slug} = await props.params;
  const product = await getProductBySlugCached({slug});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {/* Image Column */}
      <div className="col-span-1">
        <ProductImages images={product.images} name={product.name} />
      </div>
      {/* Details Column */}
      <div className="col-span-1 lg:col-span-2 p-5">
        <div className="flex flex-col gap-6">
          <p>
            {product.brand} {product.category}
          </p>
          <h1 className="h3-bold">{product.name}</h1>
          <p>
            {product.rating.toString()} of {product.numReviews} Reviews
          </p>
          <div>
            <ProductPrice
              value={product.price.toString()}
              className="w-fit rounded-full bg-green-100 text-green-700 px-5 py-2"
            ></ProductPrice>
          </div>
        </div>
        <div className="mt-10">
          <p className="font-semibold">Description</p>
          <p>{product.description}</p>
        </div>
      </div>
      {/* Action Column */}
      <div className="col-span-1">
        <Card>
          <CardContent className="p-4">
            <div className="mb-2 flex justify-between">
              <p>Price</p>
              <div>
                <ProductPrice value={product.price.toString()}></ProductPrice>
              </div>
            </div>
            <div className="mb-2 flex justify-between">
              <p>Status</p>
              {product.stock ? (
                <Badge className="text-sm" variant="outline">
                  In Stock
                </Badge>
              ) : (
                <Badge className="text-sm" variant="destructive">
                  Out of Stock
                </Badge>
              )}
            </div>
            {product.stock > 0 && (
              <div className="flex-center">
                <Button className="w-full">Add to Cart</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
