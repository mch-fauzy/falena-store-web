import {prismaClient} from '@/configs/prisma-client';
import type {FalenaUser} from '@prisma/client';

const getUserByEmail = async (
  props: Pick<FalenaUser, 'email'>,
): Promise<FalenaUser | null> => {
  const {email} = props;

  const user = await prismaClient.falenaUser.findFirst({
    where: {email},
  });

  return user;
};

export {getUserByEmail};
