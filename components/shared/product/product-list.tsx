import {Product} from '@/types/product';
import {ProductCard} from './product-card';

interface ProductListProps {
  data: Product[]; // temporary it should be type Product[]
  title?: string;
  limit?: number;
}

const ProductList = (props: ProductListProps) => {
  const {data, title, limit} = props;
  const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map(product => (
            <ProductCard key={product.slug} data={product} />
          ))}
        </div>
      ) : (
        <div>
          <p>No Products found</p>
        </div>
      )}
    </div>
  );
};

export {ProductList};
