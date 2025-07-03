import { googleAI } from '@genkit-ai/googleai';
import { genkit } from 'genkit';

// Validación de variables de entorno críticas
if (!process.env.GOOGLE_GENAI_API_KEY) {
  throw new Error('GOOGLE_GENAI_API_KEY is required. Please check your .env.local file.');
}

export const ai = genkit({
  plugins: [googleAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
  })],
  model: 'googleai/gemini-2.0-flash',
});
