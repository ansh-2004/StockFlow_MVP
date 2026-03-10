import { PrismaClient } from "@prisma/client";
import 'dotenv/config';
console.log(process.env.DATABASE_URL)
const prisma = new PrismaClient()

export default prisma
