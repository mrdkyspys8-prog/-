
import { GoogleGenAI, GenerateContentResponse, Modality } from "@google/genai";
import { Message } from "../types";

// Always use process.env.API_KEY directly as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getChatResponseStream = async (
  prompt: string,
  history: Message[],
  image?: string
) => {
  const model = 'gemini-3-flash-preview';
  
  // Convert our history format to Gemini's format
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const parts: any[] = [{ text: prompt }];
  
  if (image) {
    const base64Data = image.split(',')[1];
    const mimeType = image.split(';')[0].split(':')[1];
    parts.push({
      inlineData: {
        data: base64Data,
        mimeType: mimeType
      }
    });
  }

  return await ai.models.generateContentStream({
    model,
    contents: [
      ...contents,
      { role: 'user', parts }
    ],
    config: {
      systemInstruction: "You are a helpful and professional AI assistant in the Google AI Studio Mobile app. The user is currently using the app in Hebrew. Provide clear, concise, and helpful answers in Hebrew by default unless requested otherwise.",
      temperature: 0.7,
    }
  });
};

export const getTTS = async (text: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-preview-tts',
    contents: [{ parts: [{ text }] }],
    config: {
      // Use Modality enum from @google/genai
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  return base64Audio;
};
