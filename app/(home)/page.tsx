// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
import {ProductList} from '@/components/shared/product/product-list';
import {getProductsLatest} from '@/lib/fetch/product';

const Homepage = async () => {
  const latestProducts = await getProductsLatest();

  return (
    <>
      <ProductList data={latestProducts} title="Newest Arrival" />
    </>
  );
};

export default Homepage;
