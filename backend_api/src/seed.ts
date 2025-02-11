const {PrismaClient} = require('@prisma/client');


const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
});

async function main() {
    const users = await prisma.user.findMany();
    const takenUsernames = new Set<string>();

    for (const user of users) {
        let baseUsername = user.email.split('@')[0];
        let uniqueUsername = baseUsername;

        let counter = 1;
        while(takenUsernames.has(uniqueUsername)) {
            uniqueUsername = `${baseUsername}${counter}`;
            counter++;
        }

        takenUsernames.add(uniqueUsername)
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                username: uniqueUsername
            }
        });
    }
}

main()
    .catch((e) => console.log(e))
    .finally(async () => {
        await prisma.$disconnect();
    });