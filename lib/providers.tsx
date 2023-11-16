import React from 'react';
import ProgressBar from '@/components/ProgressBar';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar/>
    </>
  );
};

export default Providers;