// import dotenv from 'dotenv'
import OpenAI from 'openai'

// dotenv.config()

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true 
});

export async function sendMsgToOpeanAI(message) {
    const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model: 'gpt-3.5-turbo',
    });

   return chatCompletion.choices[0].message.content
}
