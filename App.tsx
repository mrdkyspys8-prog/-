
import React, { useState, useEffect } from 'react';
import { Screen, UserProfile, ChatSession } from './types';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Settings from './components/Settings';
import Feedback from './components/Feedback';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.LOGIN);
  const [user, setUser] = useState<UserProfile>({
    name: 'משתמש אורח',
    email: 'guest@example.com',
    avatar: 'https://picsum.photos/seed/user/200',
    language: 'he',
    darkMode: false,
    fontSize: 'medium'
  });
  const [sessions, setSessions] = useState<ChatSession[]>([]);

  useEffect(() => {
    const savedSessions = localStorage.getItem('ai_studio_sessions');
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions));
    }
    const savedUser = localStorage.getItem('ai_studio_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ai_studio_sessions', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('ai_studio_user', JSON.stringify(user));
  }, [user]);

  const handleLogin = (userData: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...userData }));
    // Check if onboarding was already seen (optional refinement)
    const hasSeenOnboarding = localStorage.getItem('has_seen_onboarding');
    if (hasSeenOnboarding) {
      setCurrentScreen(Screen.DASHBOARD);
    } else {
      setCurrentScreen(Screen.ONBOARDING);
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('has_seen_onboarding', 'true');
    setCurrentScreen(Screen.DASHBOARD);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.LOGIN:
        return <Login onLogin={handleLogin} />;
      case Screen.ONBOARDING:
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case Screen.DASHBOARD:
        return <Dashboard sessions={sessions} setSessions={setSessions} user={user} />;
      case Screen.PROFILE:
        return <Profile user={user} sessions={sessions} setSessions={setSessions} />;
      case Screen.SETTINGS:
        return <Settings user={user} setUser={setUser} />;
      case Screen.FEEDBACK:
        return <Feedback />;
      default:
        return <Dashboard sessions={sessions} setSessions={setSessions} user={user} />;
    }
  };

  const hideNavigation = currentScreen === Screen.LOGIN || currentScreen === Screen.ONBOARDING;

  return (
    <div className={`min-h-screen flex flex-col max-w-md mx-auto relative bg-white shadow-xl ${user.darkMode ? 'dark bg-gray-900 text-white' : ''}`} dir={user.language === 'he' ? 'rtl' : 'ltr'}>
      <main className="flex-1 overflow-y-auto pb-20">
        {renderScreen()}
      </main>
      
      {!hideNavigation && (
        <Navigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  );
};

export default App;
