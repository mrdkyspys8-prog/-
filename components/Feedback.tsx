
import React, { useState } from 'react';
import { Send, Camera, CheckCircle2 } from 'lucide-react';

const Feedback: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setText('');
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-right">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">שלח משוב</h2>
        <p className="text-sm text-gray-500 mt-1">עזור לנו לשפר את חווית ה-AI שלך.</p>
      </div>

      <div className="p-6">
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 mb-6">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">תודה רבה!</h3>
            <p className="text-gray-500 mt-2 max-w-[200px] mx-auto">המשוב שלך נשלח לצוות Google AI Studio.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-8 text-blue-600 font-bold"
            >
              שלח משוב נוסף
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">ההודעה שלך</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="מה נוכל לשפר? מצאת באג?"
                className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-800 dark:text-white rounded-2xl border-none outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all text-sm resize-none text-right"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block">קבצים מצורפים</label>
              <button type="button" className="w-full p-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl flex items-center justify-center space-x-2 space-x-reverse text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Camera size={20} />
                <span className="text-sm font-medium">הוסף צילום מסך</span>
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center space-x-2 space-x-reverse"
            >
              <Send size={20} className="transform rotate-180" />
              <span>שלח משוב</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Feedback;
