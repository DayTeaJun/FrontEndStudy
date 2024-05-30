import React from 'react';

// layout 다음 page 컴포넌트가 들어온다.
function layout({ children }) {
  return (
    <div>
      layout 먼저
      {children}
    </div>
  );
}

export default layout;
