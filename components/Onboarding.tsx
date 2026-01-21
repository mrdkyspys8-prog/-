
import React, { useState, useRef } from 'react';
import { Play, Pause, SkipForward, CheckCircle2, MonitorPlay } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const features = [
    { title: "צ'אט חכם בזמן אמת", desc: "שיחות זורמות עם מודל Gemini 3 המתקדם" },
    { title: "ניתוח תמונות וויז'ואל", desc: "העלו תמונות וקבלו תובנות, תיאורים וניתוחים" },
    { title: "תמיכה קולית מלאה", desc: "דברו עם ה-AI וקבלו תשובות קוליות איכותיות" },
    { title: "ניהול היסטוריה חכם", desc: "כל השיחות שלכם שמורות ומאורגנות לגישה מהירה" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 overflow-y-auto">
      {/* Header Section */}
      <div className="p-8 pt-12 text-center space-y-3">
        <div className="inline-flex p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400 mb-2">
          <MonitorPlay size={32} />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
          ברוכים הבאים ל- <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-l from-blue-600 to-indigo-500">AI Studio Mobile</span>
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto text-sm leading-relaxed">
          גלו את העוצמה של Gemini במכשיר הנייד שלכם דרך מדריך קצר זה
        </p>
      </div>

      {/* Video Tutorial Section */}
      <div className="px-6 relative group">
        <div className="relative aspect-video bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 ring-1 ring-gray-200 dark:ring-gray-700">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            src="https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            poster="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000"
            playsInline
          />
          
          {/* Custom Controls Overlay */}
          <div 
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 cursor-pointer ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/40 shadow-2xl transform transition-transform group-hover:scale-110 active:scale-95">
              {isPlaying ? (
                <Pause className="text-white fill-current" size={28} />
              ) : (
                <Play className="text-white fill-current translate-x-1" size={28} />
              )}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20">
            <div 
              className="h-full bg-blue-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Features List */}
      <div className="p-8 space-y-4 flex-1">
        <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2 mr-2">מה חדש באפליקציה</h3>
        <div className="space-y-3">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="flex items-start space-x-4 space-x-reverse p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-gray-100 dark:border-gray-700/50 transition-all hover:border-blue-100 dark:hover:border-blue-900/30 group/item"
            >
              <div className="w-10 h-10 bg-white dark:bg-gray-700 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm flex-shrink-0 group-hover/item:scale-110 transition-transform">
                <CheckCircle2 size={20} />
              </div>
              <div className="text-right">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{feature.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-8 pb-12 space-y-4 bg-gradient-to-t from-white dark:from-gray-900 via-white/80 dark:via-gray-900/80 to-transparent sticky bottom-0">
        <button
          onClick={onComplete}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-600/30 active:scale-[0.98] transition-all flex items-center justify-center space-x-2 space-x-reverse"
        >
          <span>בואו נתחיל בעבודה!</span>
        </button>
        <button
          onClick={onComplete}
          className="w-full py-2 text-gray-400 dark:text-gray-500 font-medium text-sm flex items-center justify-center space-x-1 space-x-reverse hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <SkipForward size={16} />
          <span>דלג על המדריך</span>
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
