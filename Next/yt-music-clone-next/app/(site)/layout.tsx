import Header from '@/components/Header';
import React from 'react';

// layout 다음 page 컴포넌트가 들어온다.
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full">
      <Header>{children}</Header>
    </div>
  );
}

export default layout;
