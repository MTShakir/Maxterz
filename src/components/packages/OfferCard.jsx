import React from 'react';
import { Tag } from 'lucide-react';

const OfferCard = ({ title, body, label }) => {
  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#1044ff]/30 transition-all duration-300 flex flex-col items-start group">
      {label && (
        <span className="inline-flex items-center gap-1.5 bg-orange-50 text-[#eb7444] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-orange-100">
          <Tag size={12} /> {label}
        </span>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1044ff] transition-colors">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
    </div>
  );
};

export default OfferCard;