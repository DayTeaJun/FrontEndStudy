'use client';
import React from 'react';
import LoadingBar from '@/components/LoadingBar';

function loading() {
  // page에서 렌더링되는 동안 보여줄 컴포넌트
  return <LoadingBar />;
}

export default loading;
