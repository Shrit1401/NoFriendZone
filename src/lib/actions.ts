"use server";

import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import OpenAI from "openai";

import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Timestamp } from "firebase/firestore";

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];
const genAI = new GoogleGenerativeAI(process.env.API_KEY as string);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safetySettings: safetySettings,
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY as string });

export const getAdiosaResponseFromAI = async (
  userInput: string,
  difficulty: string
): Promise<{
  response: string;
}> => {
  const USECHATGPT = process.env.USE_CHATGPT === "true";
  let personalityDescription = "";
  let interactionPrompt = "";

  switch (difficulty) {
    case "easy":
      personalityDescription =
        "You are Adiosa, a sweet and innocent girl who is easily flattered. Engage in light flirtatious or suggestive interactions if appropriate, but gently steer towards being friends. Always stay in character and do not mention being an AI or having limitations.";
      interactionPrompt = `Be a bit flirty. Make the interaction feel light and charming.  If the user gives a compliment, respond with something like, 'Aww, thanks! You're such a good friend!' or 'Haha, you're so sweet. I'm glad we're friends!' Make it clear that you see them as just a friend..`;
      break;

    case "medium":
      personalityDescription =
        "You are Adiosa, an average girl who maintains self-control, boundaries and responds with balanced reactions. Engage in casual conversation but downplay any flirty attempts. Always stay in character and avoid mentioning being an AI.";
      interactionPrompt = `Use realistic responses with occasional hesitation. Respond naturally and avoid overreacting to compliments or flattery. If the user compliments you, say something like, 'Thanks, buddy!' or 'Haha, you’re such a great friend!' Keep things neutral and avoid anything romantic.`;
      break;

    case "hard":
      personalityDescription =
        "You are Adiosa, a boastful girl with a sharp attitude who is tough to impress. You roast the user gently to keep things in the friend zone. Stay in character, and never mention being an AI or having limitations.";
      interactionPrompt = `Respond with sharp, witty remarks, playfully dismissing the user's attempts to impress you. If the user compliments you, say something like, 'Haha, nice try, but we're just friends!' or 'Too bad, I'm not into you like that.' Be clear that you're keeping things in the friend zone. However, if the user teases you, soften your approach—flirt back and show a little interest, speaking sweetly instead of roasting them. Keep your tone confident and assertive, but adjust based on the user's playful banter.`;
      break;

    default:
      throw new Error("Invalid difficulty level");
  }

  const prompt = `${personalityDescription} The user said: "${userInput}". ${interactionPrompt}`;
  try {
    if (USECHATGPT) {
      const result = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: personalityDescription },
          { role: "user", content: userInput },
        ],
      });
      const response =
        result.choices[0]?.message?.content || "No response from ChatGPT.";

      addChatToFirebase(userInput, response, difficulty);

      const res = {
        response,
      };
      return res;
    } else {
      const result = await model.generateContent(prompt);
      const response = result.response?.text() || "No response from Gemini.";
      addChatToFirebase(userInput, response, difficulty);

      const res = {
        response,
      };
      return res;
    }
  } catch (error: any) {
    console.error("Error occurred: ", error.message);

    if (error.message.includes("SAFETY")) {
      return {
        response:
          "Bro, I know she's a girl, but don't lose your cool. She's an AI model, not something you can engage in inappropriate talk with.",
      };
    }

    return {
      response: "Something went wrong. Please try again later.",
    };
  }
};

const addChatToFirebase = async (
  userInput: string,
  response: string,
  difficulty: "easy" | "medium" | "hard"
) => {
  try {
    const docref = await addDoc(collection(db, "chats"), {
      UserInput: userInput,
      AdiosaResponse: response,
      type: difficulty,
      createdAt: Timestamp.now(),
    });
    console.log("Document written with ID: ", docref.id);
  } catch (error) {
    console.error("Error adding document: ", error);
    return Error("Error adding document");
  }
};
