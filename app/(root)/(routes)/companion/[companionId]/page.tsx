import React from 'react';

import { getCategories, getCompanion } from '@/services/db';

import CompanionForm from './components/companion-form';

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({ params }: CompanionIdPageProps) => {
  //TODO: check subscriptions
  const companion = await getCompanion(params.companionId);
  const categories = await getCategories();

  return <CompanionForm initialData={companion} categories={categories} />;
};

export default CompanionIdPage;
