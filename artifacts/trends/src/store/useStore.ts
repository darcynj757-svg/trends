import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  name: string;
  handle: string;
  balance: number;
  streak: number;
  avatar: string;
  verified: boolean;
  following: number;
  followers: number;
  likes: number;
  bio: string;
}

export interface Transaction {
  id: string;
  amount: number;
  reason: string;
  date: string;
  type: 'earn' | 'spend';
}

export interface Video {
  id: string;
  url: string;
  author: string;
  authorAvatar: string;
  handle: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  bookmarks: number;
  tags: string[];
  gradient: string;
}

interface AppState {
  user: User;
  transactions: Transaction[];
  videos: Video[];
  hasSeenOnboarding: boolean;
  hasSeenDailyCheckin: boolean;
  
  setHasSeenOnboarding: (val: boolean) => void;
  setHasSeenDailyCheckin: (val: boolean) => void;
  addTokens: (amount: number, reason: string) => void;
  updateProfile: (updates: Partial<User>) => void;
}

const mockVideos: Video[] = [
  {
    id: 'v1',
    url: '',
    author: 'Crypto Ninja',
    authorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=crypto',
    handle: 'cryptoninja',
    description: 'Новый дроп от TON! Разбираем, как получить аллокацию 🔥',
    likes: 12400,
    comments: 342,
    shares: 1205,
    bookmarks: 843,
    tags: ['крипто', 'ton', 'airdrop'],
    gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
  },
  {
    id: 'v2',
    url: '',
    author: 'Auto Hub',
    authorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=auto',
    handle: 'autohub',
    description: 'Новая BMW M5 2024 на треке. Звук просто космос!',
    likes: 45200,
    comments: 1120,
    shares: 8900,
    bookmarks: 2300,
    tags: ['bmw', 'авто', 'скорость'],
    gradient: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
  },
  {
    id: 'v3',
    url: '',
    author: 'Юмор RU',
    authorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=humor',
    handle: 'humor_ru',
    description: 'Когда сказал маме, что заработал на крипте 100 рублей',
    likes: 89000,
    comments: 4500,
    shares: 12400,
    bookmarks: 450,
    tags: ['юмор', 'жиза', 'мемы'],
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
  },
];

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      user: {
        name: 'Миша Зевс',
        handle: 'misha_zeus',
        balance: 9000,
        streak: 9,
        avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=misha',
        verified: true,
        following: 142,
        followers: 12500,
        likes: 184000,
        bio: 'Делаю красиво. Web3 & Design.',
      },
      transactions: [
        { id: 't1', amount: 150, reason: 'Ежедневный стрик 🔥', date: new Date().toISOString(), type: 'earn' },
        { id: 't2', amount: 12, reason: 'Просмотр видео', date: new Date(Date.now() - 3600000).toISOString(), type: 'earn' },
        { id: 't3', amount: 25, reason: 'Просмотр видео', date: new Date(Date.now() - 7200000).toISOString(), type: 'earn' },
        { id: 't4', amount: -500, reason: 'Защита серии 🛡', date: new Date(Date.now() - 86400000).toISOString(), type: 'spend' },
        { id: 't5', amount: 1000, reason: 'Верификация', date: new Date(Date.now() - 172800000).toISOString(), type: 'earn' },
      ],
      videos: mockVideos,
      hasSeenOnboarding: false,
      hasSeenDailyCheckin: false,

      setHasSeenOnboarding: (val) => set({ hasSeenOnboarding: val }),
      setHasSeenDailyCheckin: (val) => set({ hasSeenDailyCheckin: val }),
      
      addTokens: (amount, reason) => set((state) => ({
        user: { ...state.user, balance: state.user.balance + amount },
        transactions: [
          {
            id: Math.random().toString(36).substring(7),
            amount,
            reason,
            date: new Date().toISOString(),
            type: (amount > 0 ? 'earn' : 'spend') as 'earn' | 'spend'
          },
          ...state.transactions
        ].slice(0, 50)
      })),
      
      updateProfile: (updates) => set((state) => ({
        user: { ...state.user, ...updates }
      })),
    }),
    {
      name: 'trends-storage',
    }
  )
);