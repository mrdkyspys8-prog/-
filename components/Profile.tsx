
import React from 'react';
import { UserProfile, ChatSession } from '../types';
import { MessageSquare, History, Shield, ChevronLeft } from 'lucide-react';

interface Props {
  user: UserProfile;
  sessions: ChatSession[];
  setSessions: React.Dispatch<React.SetStateAction<ChatSession[]>>;
}

const Profile: React.FC<Props> = ({ user, sessions, setSessions }) => {
  const clearHistory = () => {
    if (confirm("האם אתה בטוח שברצונך למחוק את כל ההיסטוריה?")) {
      setSessions([]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="p-8 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 flex flex-col items-center text-center">
        <div className="relative">
          <img src={user.avatar} className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-xl" alt="Avatar" />
          <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
        <button className="mt-4 px-6 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-semibold shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-gray-200">
          ערוך פרופיל
        </button>
      </div>

      <div className="px-6 py-4 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center space-x-2 space-x-reverse dark:text-white">
              <History className="text-blue-600" size={20} />
              <span>שיחות אחרונות</span>
            </h3>
            <button onClick={clearHistory} className="text-xs text-red-500 font-bold uppercase tracking-wider">מחק הכל</button>
          </div>
          
          <div className="space-y-3">
            {sessions.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4 bg-gray-50 dark:bg-gray-800 rounded-xl">אין היסטוריה עדיין</p>
            ) : (
              sessions.map(session => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
                  <div className="flex items-center space-x-3 space-x-reverse overflow-hidden">
                    <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
                      <MessageSquare size={18} />
                    </div>
                    <div className="overflow-hidden text-right">
                      <h4 className="font-semibold text-sm truncate dark:text-gray-200">{session.title}</h4>
                      <p className="text-[10px] text-gray-400">{new Date(session.createdAt).toLocaleDateString('he-IL')}</p>
                    </div>
                  </div>
                  <ChevronLeft size={18} className="text-gray-300 group-hover:text-blue-600" />
                </div>
              ))
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-lg font-bold dark:text-white">פרטיות ואבטחה</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <div className="flex items-center space-x-3 space-x-reverse">
                <Shield className="text-gray-400" size={20} />
                <span className="text-sm font-medium dark:text-gray-200">ניהול הרשאות</span>
              </div>
              <ChevronLeft size={18} className="text-gray-300" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
