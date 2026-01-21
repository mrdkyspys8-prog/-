
import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon, Mic, StopCircle, Share2, Copy, Volume2, Trash2, Plus, MessageSquare } from 'lucide-react';
import { getChatResponseStream, getTTS } from '../services/geminiService';
import { Message, ChatSession, UserProfile } from '../types';

const decode = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface Props {
  sessions: ChatSession[];
  setSessions: React.Dispatch<React.SetStateAction<ChatSession[]>>;
  user: UserProfile;
}

const Dashboard: React.FC<Props> = ({ sessions, setSessions, user }) => {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentSession = sessions.find(s => s.id === currentSessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages, isThinking]);

  const startNewChat = () => {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'שיחה חדשה',
      messages: [],
      createdAt: Date.now()
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isThinking) return;

    let sessionId = currentSessionId;
    if (!sessionId) {
      const newSession: ChatSession = {
        id: Date.now().toString(),
        title: input.trim().slice(0, 30) || 'ניתוח תמונה',
        messages: [],
        createdAt: Date.now()
      };
      setSessions(prev => [newSession, ...prev]);
      sessionId = newSession.id;
      setCurrentSessionId(sessionId);
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
      image: selectedImage || undefined
    };

    const historyBeforeUpdate = currentSession?.messages || [];

    setSessions(prev => prev.map(s => 
      s.id === sessionId ? { ...s, messages: [...s.messages, userMessage] } : s
    ));

    const currentInput = input;
    const currentImg = selectedImage;
    setInput('');
    setSelectedImage(null);
    setIsThinking(true);

    try {
      const stream = await getChatResponseStream(currentInput, historyBeforeUpdate, currentImg || undefined);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: '',
        timestamp: Date.now()
      };

      setSessions(prev => prev.map(s => 
        s.id === sessionId ? { ...s, messages: [...s.messages, assistantMessage] } : s
      ));

      let fullText = '';
      for await (const chunk of stream) {
        const text = chunk.text;
        fullText += text;
        setSessions(prev => prev.map(s => 
          s.id === sessionId ? {
            ...s,
            messages: s.messages.map(m => 
              m.id === assistantMessage.id ? { ...m, text: fullText } : m
            )
          } : s
        ));
      }
    } catch (error) {
      console.error(error);
      alert("נכשלנו בקבלת תגובה. אנא בדוק את החיבור שלך.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleTTS = async (text: string) => {
    try {
      const audioData = await getTTS(text);
      if (audioData) {
        const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
        const audioBuffer = await decodeAudioData(
          decode(audioData),
          outputAudioContext,
          24000,
          1,
        );
        const source = outputAudioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(outputAudioContext.destination);
        source.start();
      }
    } catch (e) {
      console.error(e);
      alert("השמעת השמע נכשלה.");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <header className="p-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3 space-x-reverse">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">G</div>
          <h2 className="font-semibold text-gray-800 dark:text-white">AI Studio</h2>
        </div>
        <button 
          onClick={startNewChat}
          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
        >
          <Plus size={24} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-32">
        {!currentSession?.messages.length && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <MessageSquare size={40} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 dark:text-gray-300">התחל שיחה חדשה</h3>
            <p className="max-w-[240px] mt-2">שאל את Gemini כל דבר, העלה תמונה או השתמש בקול שלך.</p>
          </div>
        )}

        {currentSession?.messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-start' : 'items-end'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tl-none' 
                : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tr-none'
            }`}>
              {msg.image && <img src={msg.image} className="w-full h-auto rounded-lg mb-2 border border-black/10" />}
              <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base text-right">{msg.text}</p>
              
              {msg.role === 'model' && (
                <div className="mt-3 flex items-center space-x-4 space-x-reverse border-t border-gray-100 dark:border-gray-700 pt-2 text-gray-400">
                  <button onClick={() => navigator.clipboard.writeText(msg.text)} className="hover:text-blue-600"><Copy size={16} /></button>
                  <button onClick={() => handleTTS(msg.text)} className="hover:text-blue-600"><Volume2 size={16} /></button>
                  <button className="hover:text-blue-600"><Share2 size={16} /></button>
                </div>
              )}
            </div>
            <span className="text-[10px] text-gray-400 mt-1 px-1">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}

        {isThinking && (
          <div className="flex items-start space-x-2 space-x-reverse">
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 rounded-2xl rounded-tr-none flex items-center space-x-2 space-x-reverse">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></div>
              <span className="text-xs text-gray-400 font-medium mr-2 uppercase tracking-widest">חושב...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto p-4 z-40">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-2 overflow-hidden">
          {selectedImage && (
            <div className="relative w-16 h-16 mr-2 mb-2">
              <img src={selectedImage} className="w-full h-full object-cover rounded-lg border" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -left-2 bg-red-500 text-white rounded-full p-0.5"
              >
                <Trash2 size={12} />
              </button>
            </div>
          )}
          <div className="flex items-center">
            <label className="p-3 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors">
              <ImageIcon size={22} />
              <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="שלח הודעה ל-Gemini..."
              rows={1}
              className="flex-1 bg-transparent py-3 px-2 text-sm outline-none resize-none max-h-32 text-right dark:text-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
            />
            <button
              onClick={() => setIsListening(!isListening)}
              className={`p-3 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-blue-600'}`}
            >
              <Mic size={22} />
            </button>
            <button
              onClick={handleSend}
              disabled={(!input.trim() && !selectedImage) || isThinking}
              className={`p-3 rounded-2xl transition-all ${
                input.trim() || selectedImage ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
              }`}
            >
              <Send size={20} className="transform rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
