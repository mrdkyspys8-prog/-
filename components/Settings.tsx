
import React from 'react';
import { UserProfile } from '../types';
import { Globe, Moon, Sun, Type, Bell, Info } from 'lucide-react';

interface Props {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const Settings: React.FC<Props> = ({ user, setUser }) => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold dark:text-white text-right">הגדרות</h2>
      </div>

      <div className="p-6 space-y-8">
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-right">תצוגה</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                {user.darkMode ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div className="text-right">
                <p className="text-sm font-bold dark:text-gray-200">מצב כהה</p>
                <p className="text-xs text-gray-400">הפחתת עומס על העיניים</p>
              </div>
            </div>
            <button 
              onClick={() => setUser(prev => ({ ...prev, darkMode: !prev.darkMode }))}
              className={`w-12 h-6 rounded-full transition-colors relative ${user.darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${user.darkMode ? 'right-7' : 'right-1'}`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                <Type size={20} />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold dark:text-gray-200">גודל טקסט</p>
                <p className="text-xs text-gray-400">נוכחי: {user.fontSize === 'small' ? 'קטן' : user.fontSize === 'large' ? 'גדול' : 'בינוני'}</p>
              </div>
            </div>
            <select 
              value={user.fontSize}
              onChange={(e: any) => setUser(prev => ({ ...prev, fontSize: e.target.value }))}
              className="bg-transparent text-sm font-bold text-blue-600 outline-none"
            >
              <option value="small">קטן</option>
              <option value="medium">בינוני</option>
              <option value="large">גדול</option>
            </select>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-right">העדפות אפליקציה</h3>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                <Globe size={20} />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold dark:text-gray-200">שפה</p>
                <p className="text-xs text-gray-400">שפת הממשק וה-AI</p>
              </div>
            </div>
            <select 
              value={user.language}
              onChange={(e: any) => setUser(prev => ({ ...prev, language: e.target.value }))}
              className="bg-transparent text-sm font-bold text-blue-600 outline-none"
            >
              <option value="en">English</option>
              <option value="he">עברית</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
                <Bell size={20} />
              </div>
              <div className="text-right">
                <p className="text-sm font-bold dark:text-gray-200">התראות</p>
                <p className="text-xs text-gray-400">עדכוני AI והתראות</p>
              </div>
            </div>
            <button className="w-12 h-6 bg-blue-600 rounded-full relative">
               <div className="absolute top-1 right-7 w-4 h-4 bg-white rounded-full"></div>
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-right">אודות</h3>
          <div className="flex items-center space-x-3 space-x-reverse p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
            <Info className="text-blue-600" size={24} />
            <div className="text-right">
              <p className="text-xs font-bold text-blue-900 dark:text-blue-200">Google AI Studio Mobile v1.0.4</p>
              <p className="text-[10px] text-blue-700/60 dark:text-blue-400/60 uppercase">מופעל על ידי Gemini 3 Flash</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
