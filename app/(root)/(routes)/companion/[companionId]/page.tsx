import React from 'react';

import { getCategories, getCompanion } from '@/services/db';
import { auth, redirectToSignIn } from '@clerk/nextjs';

import CompanionForm from './components/companion-form';

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  //TODO: check subscriptions
  const { userId } = auth();

  if (!userId) {
    redirectToSignIn();
  }

  const companion = await getCompanion({
    where: {
      id: params.companionId,
    },
  });
  const categories = await getCategories();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
