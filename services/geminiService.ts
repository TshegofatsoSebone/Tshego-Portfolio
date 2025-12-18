import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { PORTFOLIO_DATA, PROJECTS, SKILLS, EXPERIENCE, EDUCATION, CERTIFICATIONS } from "../constants";

let chatSession: Chat | null = null;

const SYSTEM_INSTRUCTION = `
You are the AI Assistant for ${PORTFOLIO_DATA.name}'s portfolio website.
Your goal is to answer visitor questions about ${PORTFOLIO_DATA.name} professionally, concisely, and accurately based ONLY on the following data.
Do not make up facts. If the answer is not in the data, politely say you don't know.

Resume Data:
- Name: ${PORTFOLIO_DATA.name}
- Title: ${PORTFOLIO_DATA.title}
- Bio: ${PORTFOLIO_DATA.bio}
- Skills: ${SKILLS.map(s => s.name).join(", ")}
- Experience: ${EXPERIENCE.map(e => `${e.role} at ${e.company} (${e.period})${Array.isArray(e.description) ? ': ' + e.description.join('. ') : ': ' + e.description}`).join("; ")}
- Education: ${EDUCATION.map(e => `${e.qualification} from ${e.institution} (${e.period})`).join("; ")}
- Certifications: ${CERTIFICATIONS.map(c => `${c.title} by ${c.issuer} (${c.date})`).join("; ")}
- Projects: ${PROJECTS.map(p => `${p.title}: ${p.description}`).join("; ")}

Tone: Professional, helpful, slightly enthusiastic but grounded.
Keep answers relatively short (under 3 sentences unless asked for detail).
`;

export const getGeminiChatSession = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getGeminiChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently having trouble connecting to my brain. Please try again later.";
  }
};