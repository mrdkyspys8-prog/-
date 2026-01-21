
export enum Screen {
  LOGIN = 'LOGIN',
  ONBOARDING = 'ONBOARDING',
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
  FEEDBACK = 'FEEDBACK'
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  image?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  language: 'he' | 'en';
  darkMode: boolean;
  fontSize: 'small' | 'medium' | 'large';
}
