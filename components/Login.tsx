
import React, { useState } from 'react';

interface Props {
  onLogin: (userData: any) => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-8 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="mb-12 text-center">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-blue-600" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">AI Studio לנייד</h1>
        <p className="text-blue-200 mt-2">מעצימים יצירתיות עם Gemini</p>
      </div>

      <div className="w-full space-y-4">
        <button
          onClick={() => onLogin({ name: 'משתמש גוגל', email: 'user@google.com' })}
          className="w-full bg-white text-gray-900 py-3.5 rounded-xl font-semibold flex items-center justify-center space-x-3 space-x-reverse hover:bg-gray-50 active:scale-95 transition-all shadow-lg"
        >
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
          <span>המשך עם Google</span>
        </button>

        <div className="flex items-center space-x-2 space-x-reverse my-4">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-xs uppercase text-white/40 font-bold px-2">או</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>

        <div className="space-y-3">
          <input
            type="email"
            placeholder="כתובת אימייל"
            className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-400 text-white transition-all placeholder:text-white/40 text-right"
          />
          <input
            type="password"
            placeholder="סיסמה"
            className="w-full bg-white/10 border border-white/20 rounded-xl py-3 px-4 outline-none focus:ring-2 focus:ring-blue-400 text-white transition-all placeholder:text-white/40 text-right"
          />
          <button
            onClick={() => onLogin({ name: 'משתמש אפליקציה', email: 'user@example.com' })}
            className="w-full bg-blue-500 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-400 active:scale-95 transition-all shadow-lg shadow-blue-500/30"
          >
            {isLoginMode ? 'התחברות' : 'יצירת חשבון'}
          </button>
        </div>

        <div className="flex justify-between items-center pt-2 px-1">
          <button onClick={() => setIsLoginMode(!isLoginMode)} className="text-sm text-blue-300 font-medium">
            {isLoginMode ? 'חדש כאן? הצטרף' : 'יש לך חשבון? התחבר'}
          </button>
          <button className="text-sm text-white/60">שכחת סיסמה?</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
