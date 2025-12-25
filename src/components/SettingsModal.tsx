import React, { useState, useEffect } from 'react';
import { Postcard, defaultCards } from '../data/defaultCards';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: Postcard[];
  onSave: (cards: Postcard[]) => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, cards, onSave }) => {
  const [localCards, setLocalCards] = useState<Postcard[]>(cards);

  useEffect(() => {
    if (isOpen) {
      setLocalCards(cards);
    }
  }, [isOpen, cards]);

  const updateCard = (index: number, field: 'title' | 'content', value: string) => {
    const updatedCards = [...localCards];
    updatedCards[index] = { ...updatedCards[index], [field]: value };
    setLocalCards(updatedCards);
  };

  const updateImage = (index: number, dataUrl: string) => {
    const updatedCards = [...localCards];
    updatedCards[index] = { ...updatedCards[index], image: dataUrl };
    setLocalCards(updatedCards);
  };

  const handleSave = () => {
    const limited = localCards.slice(0, 5);
    onSave(limited);
    onClose();
  };

  const resetToDefault = () => {
    setLocalCards(defaultCards);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">设置明信片</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        
        {/* Cards Editor */}
        <p className="text-sm text-gray-500 mb-3">仅编辑并使用前5项（路演转盘为5格）。</p>
        <div className="space-y-4 mb-6">
          {localCards.slice(0, 5).map((card, index) => (
            <div key={card.id} className="border rounded-lg p-4 bg-gray-50">
              <h3 className="font-medium text-gray-700 mb-3">明信片 {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    标题
                  </label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => updateCard(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD748]"
                    placeholder="输入明信片标题"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    内容
                  </label>
                  <textarea
                    value={card.content}
                    onChange={(e) => updateCard(index, 'content', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD748] resize-none"
                    placeholder="输入明信片内容"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 mb-1">图片</label>
                  <div className="flex items-center gap-4">
                    <img src={card.image} alt={card.title} className="w-20 h-20 object-cover rounded-lg border" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = () => {
                          const result = reader.result as string;
                          updateImage(index, result);
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <button
                      onClick={() => updateImage(index, '')}
                      className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      清除图片
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">支持 JPG/PNG/SVG，建议尺寸约 512×512，上传后将保存到本地浏览器。</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={resetToDefault}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
          >
            重置为默认
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#FFD748] text-white rounded-lg font-medium hover:bg-yellow-400 transition-colors"
          >
            保存到本地
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
