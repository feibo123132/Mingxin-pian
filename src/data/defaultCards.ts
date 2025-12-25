export interface Postcard {
  id: string;
  title: string;
  content: string;
  image: string;
  sound: string;
}

import card1 from '../assets/postcards/card1.png';
import card2 from '../assets/postcards/card2.png';
import card3 from '../assets/postcards/card3.png';
import card4 from '../assets/postcards/card4.png';
import card5 from '../assets/postcards/card5.png';

export const defaultCards: Postcard[] = [
  {
    id: '1',
    title: '所愿皆所得',
    content: '新年新气象，所愿皆所得！',
    image: card1,
    sound: '/audio/card1.mp3'
  },
  {
    id: '2',
    title: '更好的自己',
    content: '新的一年，遇见更好的自己！',
    image: card2,
    sound: '/audio/card2.mp3'
  },
  {
    id: '3',
    title: '事事皆顺遂',
    content: '新年新气象，事事皆顺遂！',
    image: card3,
    sound: '/audio/card3.mp3'
  },
  {
    id: '4',
    title: '生活多点甜',
    content: '希望你的生活多点甜🍬',
    image: card4,
    sound: '/audio/card4.mp3'
  },
  {
    id: '5',
    title: '平安喜乐',
    content: '🍎平安喜乐，逢考必过！',
    image: card5,
    sound: '/audio/card5.mp3'
  }
];
