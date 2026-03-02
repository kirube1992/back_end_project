import { PrismaClient } from "@prisma/client/extension";

const prisma = PrismaClient({
  log:
    process.env.NODEA_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

const connetDB = async () => {
  try {
    await prisma.$connect();
    console.log("DB is connected via Prisma");
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit();
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { prisma, connetDB, disconnectDB };
