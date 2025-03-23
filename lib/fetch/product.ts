import {notFound} from 'next/navigation';

import {prismaClient} from '@/configs/prisma-client';
import {CONSTANT} from '../constant';
import type {Product} from '@/types/product';

const getProductsLatest = async (): Promise<Product[]> => {
  const products = await prismaClient.falenaProduct.findMany({
    take: CONSTANT.PRODUCT.DEFAULT_LATEST_PRODUCT_LIMIT,
    orderBy: {createdAt: 'desc'},
  });

  return products;
};

const getProductBySlug = async (
  props: Pick<Product, 'slug'>,
): Promise<Product> => {
  const {slug} = props;

  const product = await prismaClient.falenaProduct.findFirst({
    where: {slug},
  });
  if (!product) notFound(); // Redirect to not found page if if product not found by slug

  return product;
};

export {getProductsLatest, getProductBySlug};
