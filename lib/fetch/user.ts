import {prismaClient} from '@/configs/prisma-client';
import type {User} from '@/types/user';

const getUserByEmail = async (
  props: Pick<User, 'email'>,
): Promise<User | null> => {
  const {email} = props;

  const user = await prismaClient.falenaUser.findFirst({
    where: {email},
  });

  return user;
};

export {getUserByEmail};
