import { ChatbotStatus, CompanyRole, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { generateUniqueSlug } from '../src/common/utils';

const prisma = new PrismaClient();

async function main() {
  const email = 'demo@assistiq.com';
  const password = await bcrypt.hash('password123', 10);

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    console.log('Seed data already exists. Skipping.');
    return;
  }

  const slug = await generateUniqueSlug('Demo Company', async (s) => {
    const company = await prisma.company.findUnique({ where: { slug: s } });
    return !!company;
  });

  const user = await prisma.user.create({
    data: {
      fullName: 'Demo User',
      email,
      password,
    },
  });

  const company = await prisma.company.create({
    data: {
      name: 'Demo Company',
      slug,
      website: 'https://demo.assistiq.com',
      industry: 'Technology',
    },
  });

  await prisma.companyMember.create({
    data: {
      userId: user.id,
      companyId: company.id,
      role: CompanyRole.OWNER,
    },
  });

  const chatbot = await prisma.chatbot.create({
    data: {
      companyId: company.id,
      name: 'Demo Support Bot',
      welcomeMessage: 'Hi! I am the Assist IQ demo bot. How can I help?',
      tone: 'friendly',
      primaryColor: '#3B82F6',
      status: ChatbotStatus.ACTIVE,
    },
  });

  const conversation = await prisma.conversation.create({
    data: {
      chatbotId: chatbot.id,
      companyId: company.id,
      visitorName: 'Sample Visitor',
      visitorEmail: 'visitor@example.com',
    },
  });

  await prisma.message.createMany({
    data: [
      {
        conversationId: conversation.id,
        role: 'USER',
        content: 'What services do you offer?',
      },
      {
        conversationId: conversation.id,
        role: 'ASSISTANT',
        content:
          'I do not have enough information in the knowledge base to answer that question yet.',
        sources: [],
      },
    ],
  });

  console.log('Seed completed successfully.');
  console.log({ email, password: 'password123', companyId: company.id });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
