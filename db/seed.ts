import {prismaClient} from '../configs/prisma-client';
import {sampleData} from './sample-data';

const seedDatabase = async (): Promise<void> => {
  await prismaClient.falenaProduct.deleteMany();
  await prismaClient.falenaProduct.createMany({data: sampleData.products});
  console.log('Seeding complete');
};

/** void: Explicitly ignore the return result of a function */
void seedDatabase();
