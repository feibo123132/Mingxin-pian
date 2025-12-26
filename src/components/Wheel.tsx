import React, { useState, useRef, useEffect } from 'react';
import { Postcard } from '../data/defaultCards';
import { useAudioBus } from '../store/audioBus';

interface WheelProps {
  cards: Postcard[];
  onSpinComplete: (card: Postcard) => void;
}

const Wheel: React.FC<WheelProps> = ({ cards, onSpinComplete }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const selectionAudiosRef = useRef<HTMLAudioElement[]>([]);
  const audioUnlockedRef = useRef(false);
  const lastSelectedIndexRef = useRef<number>(0);

  useEffect(() => {
    const base = import.meta.env.BASE_URL || '/';
    const prefix = base.endsWith('/') ? base : base + '/';
    const audio = new Audio(`${prefix}audio/spin.mp3`);
    audio.preload = 'auto';
    audio.loop = true;
    audioRef.current = audio;
    selectionAudiosRef.current = cards.map((c, i) => {
      const p = (c.sound || `audio/card${i + 1}.mp3`).replace(/^\/+/, '');
      const a = new Audio(`${prefix}${p}`);
      a.preload = 'auto';
      a.loop = false;
      return a;
    });
  }, []);

  const spin = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    if (!audioUnlockedRef.current) {
      selectionAudiosRef.current.forEach(a => {
        try {
          a.muted = true;
          a.play().then(() => a.pause()).catch(() => {});
          a.muted = false;
        } catch {}
      });
      audioUnlockedRef.current = true;
    }
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.9;
        audioRef.current.play().catch(() => {});
        try { useAudioBus.getState().startEffect() } catch {}
        audioRef.current.onended = () => {
          try { useAudioBus.getState().endEffect() } catch {}
          audioRef.current && (audioRef.current.onended = null)
        }
      }
    } catch {}
    
    // Generate random angle for 3-5 seconds of spinning (1800-3000 degrees)
    const minRotation = 1800; // 5 full rotations minimum
    const maxRotation = 3000; // 8.33 full rotations maximum
    const randomRotation = Math.floor(Math.random() * (maxRotation - minRotation + 1)) + minRotation;
    
    const finalRotation = rotation + randomRotation;
    setRotation(finalRotation);
    
    // Calculate which card was selected
    const segmentAngle = 360 / cards.length;
    const normalizedAngle = (360 - (finalRotation % 360)) % 360;
    const selectedIndex = Math.floor(normalizedAngle / segmentAngle);
    const selectedCard = cards[selectedIndex];
    lastSelectedIndexRef.current = selectedIndex;
    
    // Wait for animation to complete (3-5 seconds)
    const endHandler = () => {
      setIsSpinning(false);
      if (audioRef.current) {
        audioRef.current.loop = false;
        audioRef.current.onended = () => {
          try { useAudioBus.getState().endEffect() } catch {}
          audioRef.current && (audioRef.current.onended = null)
        };
      }
      const a = selectionAudiosRef.current[lastSelectedIndexRef.current];
      if (a) {
        try {
          a.currentTime = 0;
          a.play().catch(() => {});
          try { useAudioBus.getState().startEffect() } catch {}
          a.onended = () => {
            try { useAudioBus.getState().endEffect() } catch {}
            a.onended = null
          }
        } catch {}
      }
      onSpinComplete(selectedCard);
    };
    if (wheelRef.current) {
      wheelRef.current.addEventListener('transitionend', endHandler, { once: true });
    }
  };

  const segmentAngle = 360 / cards.length;
  const colors = [
    '#FF6B6B', '#FFD748', '#7C90FF', '#4ECDC4', '#FF9F1C'
  ];

  const gradientStops = cards.map((_, i) => {
    const start = i * segmentAngle;
    const end = (i + 1) * segmentAngle;
    const color = colors[i % colors.length];
    return `${color} ${start}deg ${end}deg`;
  }).join(', ');

  return (
    <div className="relative flex flex-col items-center">
      {/* Wheel */}
      <div className="relative mb-8">
        <div 
          ref={wheelRef}
          className="relative w-80 h-80 rounded-full overflow-hidden shadow-2xl transition-transform duration-[4000ms] ease-out"
          style={{ 
            transform: `rotate(${rotation}deg)`,
            willChange: 'transform',
            background: `conic-gradient(from -90deg, ${gradientStops})`
          }}
        >
          {cards.map((card, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const midAngle = (startAngle + endAngle) / 2;

            const titleLen = card.title.length;
            const wheelSize = 320;
            const hub = 56;
            const margin = 10;
            const radiusPx = wheelSize / 2; // 160
            const safeMinPct = ((hub / 2 + margin) / radiusPx) * 50;
            const safeMaxPct = 50 - (margin / radiusPx) * 50;
            const desiredPct = 50 * 0.6; // 60% of wheel radius
            const rPct = Math.min(safeMaxPct, Math.max(safeMinPct, desiredPct));
            const rPx = radiusPx * (rPct / 50);
            const labelRotation = ((midAngle) % 360 + 360) % 360;
            const fs = titleLen >= 5 ? 14 : 16;

            return (
              <div key={card.id} className="absolute" style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) rotate(${labelRotation}deg) translate(0, -${rPx}px)`,
                transformOrigin: '50% 50%'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: `${fs}px`,
                  fontWeight: 'bold',
                  lineHeight: 1.2,
                  textShadow: '0 1px 2px rgba(0,0,0,0.35)',
                  writingMode: 'vertical-rl',
                  textOrientation: 'upright',
                  whiteSpace: 'nowrap',
                  padding: '2px'
                }}>
                  {card.title}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Center hub and internal pointer (match reference style) */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%)' }}>
            <div className="rounded-full bg-white shadow-md" style={{ width: '56px', height: '56px' }}></div>
          </div>
          <div className="absolute left-1/2 top-1/2" style={{ transform: 'translate(-50%, -50%) translateY(-36px)' }}>
            <svg width="26" height="18" viewBox="0 0 26 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 0 L3 18 L23 18 Z" fill="#ffffff" stroke="#e5e7eb" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* GO Button */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className={`
          rounded-full overflow-hidden shadow-lg animate-breath
          transition-transform duration-200 ease-in-out
          ${isSpinning ? 'opacity-70 cursor-not-allowed' : 'hover:scale-110 hover:brightness-110'}
        `}
        style={{
          width: '88px',
          height: '88px'
        }}
      >
        <img
          src={`${(import.meta.env.BASE_URL || '/').replace(/\/?$/, '/') }images/go-btn.png`}
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </button>
    </div>
  );
};

export default Wheel;
