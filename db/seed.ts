import {prismaClient} from '../configs/prisma-client';
import {sampleData} from './sample-data';

const seedDatabase = async (): Promise<void> => {
  await prismaClient.falenaProduct.deleteMany();
  await prismaClient.falenaAccount.deleteMany();
  await prismaClient.falenaSession.deleteMany();
  await prismaClient.falenaVerificationToken.deleteMany();
  await prismaClient.falenaUser.deleteMany();

  await prismaClient.falenaProduct.createMany({data: sampleData.products});
  await prismaClient.falenaUser.createMany({data: sampleData.users});
  console.log('Seeding complete');
};

/** void: Explicitly ignore the return result of a function */
void seedDatabase();
