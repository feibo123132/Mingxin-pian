import React from 'react';
import { Postcard } from '../data/defaultCards';

interface ResultModalProps {
  card: Postcard | null;
  isOpen: boolean;
  onClose: () => void;
  onSpinAgain: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ card, isOpen, onClose, onSpinAgain }) => {
  if (!isOpen || !card) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl">
        {/* Image */}
        <div className="flex justify-center mb-4">
          <img 
            src={card.image} 
            alt={card.title}
            className="w-60 h-60 object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-3">
          {card.title}
        </h2>
        
        {/* Content */}
        <p className="text-base text-center text-gray-600 mb-6 leading-relaxed">
          {card.content}
        </p>
        
        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            关闭
          </button>
          <button
            onClick={onSpinAgain}
            className="flex-1 py-3 px-4 bg-[#FFD748] text-white rounded-lg font-medium hover:bg-yellow-400 transition-colors"
          >
            再抽一次
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;