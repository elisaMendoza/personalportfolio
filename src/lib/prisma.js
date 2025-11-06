import { PrismaClient } from '@prisma/client';

// Re-export a single Prisma instance for app-wide use
export const prisma = new PrismaClient();
