import {notFound} from 'next/navigation';

import {prismaClient} from '@/configs/prisma-client';
import {CONSTANT} from '../constant';
import type {FalenaProduct} from '@prisma/client';

const getProductsLatest = async (): Promise<FalenaProduct[]> => {
  const products = await prismaClient.falenaProduct.findMany({
    take: CONSTANT.product.defaultLatestProductLimit,
    orderBy: {createdAt: 'desc'},
  });

  return products;
};

const getProductBySlug = async (
  props: Pick<FalenaProduct, 'slug'>,
): Promise<FalenaProduct> => {
  const {slug} = props;

  const product = await prismaClient.falenaProduct.findFirst({
    where: {slug},
  });
  if (!product) notFound(); // Redirect to not found page if if product not found by slug

  return product;
};

export {getProductsLatest, getProductBySlug};
