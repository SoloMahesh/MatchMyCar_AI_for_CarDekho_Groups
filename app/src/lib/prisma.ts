import { PrismaClient } from "@prisma/client";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Vercel serverless functions have a unique execution environment.
// We need an absolute path to the SQLite file.
const getDbUrl = () => {
  if (process.env.DATABASE_URL && !process.env.VERCEL) {
    return process.env.DATABASE_URL;
  }
  
  // Construct absolute path for Vercel
  const dbPath = path.join(process.cwd(), "prisma/dev.db");
  return `file:${dbPath}`;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getDbUrl(),
    },
  },
});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
