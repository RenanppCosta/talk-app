import { prisma } from "./prisma";

const main = async () => {

    await prisma.message.deleteMany();
    await prisma.conversation.deleteMany();
    await prisma.user.deleteMany();

    const user1 = await prisma.user.create({
        data: {
          username: "Usuario 1 Teste",
          email: "usertest1@example.com",
          password: "hashed_password",
        },
      });
    
    
    const user2 = await prisma.user.create({
        data: {
          username: "Usuario 2 Teste",
          email: "usertest2@example.com",
          password: "hashed_password",
        },
    });

    const conversation = await prisma.conversation.create({
        data:{
            users: {connect:[{id: user1.id}, {id: user2.id}]},
            messages: {
                create: [
                    {
                        content: "Olá bom dia!!",
                        senderId: user1.id
                    },
                    {
                        content: "Bom dia para você também.",
                        senderId: user2.id
                    }
                ]
            }
        }
    })

    const conversationWithMessages = await prisma.conversation.findUnique({
        where: { id: conversation.id },
        include: {
          messages: true,  
        },
      });

    console.log("Seed Created.", {user1, user2, conversation: conversationWithMessages});
}

main().finally(() =>{
    prisma.$disconnect();
})