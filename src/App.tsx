import React, { useState, useEffect } from 'react';
import { Settings, Gift } from 'lucide-react';
import Wheel from './components/Wheel';
import ResultModal from './components/ResultModal';
import SettingsModal from './components/SettingsModal';
import useLocalStorage from './hooks/useLocalStorage';
import { Postcard, defaultCards } from './data/defaultCards';

function App() {
  const [cards, setCards] = useLocalStorage<Postcard[]>('postcard-config', defaultCards);
  const [selectedCard, setSelectedCard] = useState<Postcard | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  useEffect(() => {
    // Initialize with default cards if localStorage is empty
    if (!cards || cards.length === 0) {
      setCards(defaultCards);
    }
  }, []);

  const handleSpinComplete = (card: Postcard) => {
    setSelectedCard(card);
    setIsResultModalOpen(true);
  };

  const handleSpinAgain = () => {
    setIsResultModalOpen(false);
    setSelectedCard(null);
  };

  const handleSaveCards = (newCards: Postcard[]) => {
    setCards(newCards);
  };

  const cards5 = (cards ?? []).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex flex-col items-center justify-center p-4">
      <div className="app-container w-full">
        {/* Header */}
        <div className="w-full max-w-md mb-8 relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Gift className="w-8 h-8 text-[#FFD748]" />
            <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Source Han Sans CN, sans-serif' }}>明信片抽卡</h1>
          </div>
          <p className="text-center text-gray-600" style={{ fontSize: '16px' }}>点击GO按钮，抽取你的幸运明信片！</p>
          
          {/* Settings Button */}
          <button
            onClick={() => setIsSettingsModalOpen(true)}
            className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* Wheel Component */}
        <div className="w-full max-w-sm">
          <Wheel 
            cards={cards5} 
            onSpinComplete={handleSpinComplete} 
          />
        </div>

        {/* Result Modal */}
        <ResultModal
          card={selectedCard}
          isOpen={isResultModalOpen}
          onClose={() => setIsResultModalOpen(false)}
          onSpinAgain={handleSpinAgain}
        />

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          cards={cards5}
          onSave={handleSaveCards}
        />

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>完全离线使用 • 数据仅存储在本地 • 仅显示前5项</p>
        </div>
      </div>
    </div>
  );
}

export default App;
