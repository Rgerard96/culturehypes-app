"use client";

import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import VerifyForm from './components/VerifyForm';

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [showVerificationStep, setShowVerificationStep] = useState(false);

  return (
    <div className='min-h-screen flex p-5 md:p-0'>
      <div className='flex-1 flex items-center justify-center'>
        {
          showVerificationStep ?
            (
              <VerifyForm email={email} />
            ) :
            (
              <LoginForm onSuccess={(email) => {
                setEmail(email);
                setShowVerificationStep(true);
              }} />
            )
        }
      </div>
      <div className='bg-green-600 flex-1 hidden xl:flex items-center justify-center'>
      </div>
    </div>
  );
}
