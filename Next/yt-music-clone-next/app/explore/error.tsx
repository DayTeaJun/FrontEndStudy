// error 컴포넌트는 아래 "use client" 필수
'use client';
import ErrorMessage from '@/components/ErrorMessage';
import React from 'react';

function error() {
  return <ErrorMessage />;
}

export default error;
