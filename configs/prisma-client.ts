import {neonConfig} from '@neondatabase/serverless';
import {PrismaNeon} from '@prisma/adapter-neon';
import {PrismaClient} from '@prisma/client';
import ws from 'ws';

import {CONFIG} from './config';

/* Sets up WebSocket connections, which enables Neon to use WebSocket communication. */
neonConfig.webSocketConstructor = ws;
const connectionString = `${CONFIG.database.url}`;

/* Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon. */
const adapter = new PrismaNeon({connectionString});

const prismaClient = new PrismaClient({adapter});

export {prismaClient};
