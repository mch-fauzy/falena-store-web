import 'dotenv/config';
import {defineConfig, env} from 'prisma/config';

export default defineConfig({
  schema: 'infrastructures/database/schema.prisma',
  migrations: {
    path: 'infrastructures/database/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
