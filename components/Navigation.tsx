
import React from 'react';
import { Screen } from '../types';
import { User, Settings, MessageSquarePlus, MessageSquare } from 'lucide-react';

interface Props {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const Navigation: React.FC<Props> = ({ currentScreen, onNavigate }) => {
  const navItems = [
    { id: Screen.DASHBOARD, icon: MessageSquare, label: 'צ\'אט' },
    { id: Screen.PROFILE, icon: User, label: 'פרופיל' },
    { id: Screen.SETTINGS, icon: Settings, label: 'הגדרות' },
    { id: Screen.FEEDBACK, icon: MessageSquarePlus, label: 'משוב' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 px-6 py-3 flex justify-between items-center z-50 safe-area-bottom">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`flex flex-col items-center space-y-1 transition-colors ${
            currentScreen === item.id ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <item.icon size={24} strokeWidth={currentScreen === item.id ? 2.5 : 2} />
          <span className="text-xs font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
