'use client';

import React from 'react';
import { XCircle } from 'lucide-react';

const PainPointCard = ({ message }) => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-start gap-4">
      <div className="text-red-500 bg-red-50 p-3 rounded-full shrink-0">
        <XCircle size={24} />
      </div>
      <div>
        <p className="text-gray-800 font-semibold leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default PainPointCard;