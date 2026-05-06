import React from 'react';
import Signin from '../../../Component/Account/signin';

function Account() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[#1a1c2e] overflow-hidden w-full">
      <Signin />
    </div>
  );
}

export default Account;