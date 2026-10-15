import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL ?? "admin@aspro.mg";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "changeme123";

  const hashedPassword = await hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Administrateur AS PRO",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`Compte admin prêt : ${adminEmail} / ${adminPassword}`);
  console.log("⚠️  Change ce mot de passe après la première connexion.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
