// graphql/context.ts

import { PrismaClient } from '@prisma/client';
import { User, Team, Task } from '../models';

const prisma = new PrismaClient();

const context = {
    prisma,
    models: {
        User,
        Team,
        Task,
    },
};

export default context;
