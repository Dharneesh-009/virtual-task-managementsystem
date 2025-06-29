import React from 'react';

const AuthFormWrapper = ({ title, children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default AuthFormWrapper;
